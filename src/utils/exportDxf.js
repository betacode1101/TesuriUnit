import { DxfWriter, point3d } from '@tarikjabiri/dxf';

export const exportToDxf = (dl, dr, height, type) => {
  const dxf = new DxfWriter();
  
  // Set up standard CAD layers for clarity
  dxf.addLayer('STRUCTURE', 3, 'CONTINUOUS'); // Cột, ray chính (Green)
  dxf.addLayer('DETAILS', 2, 'CONTINUOUS');   // Song dọc (Yellow)
  dxf.addLayer('GLASS', 4, 'CONTINUOUS');     // Kính (Cyan)
  dxf.addLayer('DIM', 1, 'CONTINUOUS');       // Kích thước thật (Red)
  dxf.addLayer('TEXT', 7, 'CONTINUOUS');      // Ghi chú (White)

  const POST = 60;
  const T = 40;
  const BT = 20; // Baluster thickness
  const GAP = 120;

  // Scale up the entire dimension style globally so it's readable at 1:1 scale of 1000mm
  // We will inject $DIMSCALE and $DIMTXT via string replacement before exporting the blob.

  // Helprs
  const addLine = (x1, y1, x2, y2, layerName) => {
    dxf.addLine(point3d(x1, y1), point3d(x2, y2), { layerName });
  };

  const addRect = (x, y, w, h, layerName) => {
    addLine(x, y, x + w, y, layerName);
    addLine(x + w, y, x + w, y + h, layerName);
    addLine(x + w, y + h, x, y + h, layerName);
    addLine(x, y + h, x, y, layerName);
  };

  const addDim = (x1, y1, x2, y2, offset, layerName = 'DIM') => {
    // addAlignedDim sinh ra chuẩn Dimension tự động nhảy số theo phương CAD
    dxf.addAlignedDim(point3d(x1, y1), point3d(x2, y2), offset, { layerName });
  };

  const addText = (text, x, y, size, layerName) => {
    dxf.addText(point3d(x, y), size, text, { layerName });
  };

  // ==========================================
  // VIEW 1: TOP-DOWN PLAN (MẶT BẰNG)
  // Origin offset: (0, 0)
  // ==========================================
  addText("TOP-DOWN PLAN (MAT BANG)", -dl, 200, 30, "TEXT");
  
  // Corner post: (0,0) to (60,60)
  addRect(0, 0, POST, POST, "STRUCTURE");
  
  // Left Arm (DL)
  const leftX = -dl + POST;
  const railY = (POST - T) / 2;
  addRect(leftX, railY, dl - POST, T, "STRUCTURE");
  
  // Right Arm (DR)
  const railX = (POST - T) / 2;
  addRect(railX, POST, T, dr - POST, "STRUCTURE");

  if (type === 'balusters') {
    // Balusters L
    for (let x = -GAP; x > -dl + POST; x -= GAP) {
      addRect(x, (POST - BT) / 2, BT, BT, "DETAILS");
    }
    // Balusters R
    for (let y = POST + GAP; y < dr; y += GAP) {
      addRect((POST - BT) / 2, y, BT, BT, "DETAILS");
    }
  } else {
    // Glass line indicator
    addLine(leftX, POST/2, 0, POST/2, "GLASS");
    addLine(POST/2, POST, POST/2, dr, "GLASS");
  }

  // Real Dimensions for Plan
  addDim(0, POST, 0, dr, -60, "DIM"); // DR Dim
  addDim(-dl + POST, 0, POST, 0, 60, "DIM");  // DL Dim


  // ==========================================
  // VIEW 2: FRONT ELEVATION L (MẶT ĐỨNG L)
  // Origin offset: (-dl, -height - 300)
  // ==========================================
  const vy2 = -height - 300;
  addText("FRONT ELEVATION - L", -dl, vy2 + height + 100, 30, "TEXT");

  // Post L
  addRect(-POST, vy2, POST, height, "STRUCTURE");
  
  // Handrail & Bottom Rail
  addRect(-dl, vy2 + height - 40, dl - POST, 40, "STRUCTURE");
  addRect(-dl, vy2 + 50, dl - POST, T, "STRUCTURE");

  if (type === 'balusters') {
    for (let x = -POST - GAP; x > -dl; x -= GAP) {
      addRect(x, vy2 + 50 + T, BT, height - 90 - T, "DETAILS");
    }
  } else {
    addLine(-dl, vy2 + 50 + T, -POST, vy2 + height - 40, "GLASS");
    addLine(-dl, vy2 + height - 40, -POST, vy2 + 50 + T, "GLASS");
    addRect(-dl, vy2 + 50 + T, dl - POST, height - 90 - T, "GLASS");
  }

  // Real Dims for Front L
  addDim(-dl, vy2, 0, vy2, 60, "DIM"); // Bottom DL
  addDim(-dl, vy2, -dl, vy2 + height, 60, "DIM"); // Height


  // ==========================================
  // VIEW 3: FRONT ELEVATION R (MẶT ĐỨNG R)
  // Origin offset: (150, -height - 300)
  // ==========================================
  const vx3 = 150;
  addText("FRONT ELEVATION - R", vx3, vy2 + height + 100, 30, "TEXT");

  addRect(vx3, vy2, POST, height, "STRUCTURE");
  
  addRect(vx3 + POST, vy2 + height - 40, dr - POST, 40, "STRUCTURE");
  addRect(vx3 + POST, vy2 + 50, dr - POST, T, "STRUCTURE");

  if (type === 'balusters') {
    for (let x = vx3 + POST + GAP; x < vx3 + dr; x += GAP) {
      addRect(x, vy2 + 50 + T, BT, height - 90 - T, "DETAILS");
    }
  } else {
    addLine(vx3 + POST, vy2 + 50 + T, vx3 + dr, vy2 + height - 40, "GLASS");
    addLine(vx3 + POST, vy2 + height - 40, vx3 + dr, vy2 + 50 + T, "GLASS");
    addRect(vx3 + POST, vy2 + 50 + T, dr - POST, height - 90 - T, "GLASS");
  }

  // Real Dims for Front R
  addDim(vx3, vy2, vx3 + dr, vy2, -60, "DIM"); // Bottom DR
  addDim(vx3 + dr, vy2, vx3 + dr, vy2 + height, -60, "DIM"); // Height

  // Generate File natively in Browser memory
  let dxfData = dxf.stringify();
  
  // Inject explicit DimScale and DimTxt to the DXF Header
  dxfData = dxfData.replace(
    /^\s*0\nSECTION\n\s*2\nHEADER\n/m,
    `  0\nSECTION\n  2\nHEADER\n  9\n$DIMSCALE\n 40\n20\n  9\n$DIMTXT\n 40\n3\n`
  );

  const blob = new Blob([dxfData], { type: 'application/dxf' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `balcony_full_drawings_${type}_H${height}.dxf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

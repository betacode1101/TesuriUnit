const { DxfWriter, point3d } = require('@tarikjabiri/dxf');
const dxf = new DxfWriter();
dxf.addAlignedDim(point3d(0,0), point3d(100,0), 20);
console.log(dxf.stringify().substring(0, 100));

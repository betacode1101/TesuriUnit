import React, { useState } from 'react';
import Scene from './components/Scene';
import { exportToDxf } from './utils/exportDxf';
import { Download, Settings2, AlertTriangle, Mail, Home } from 'lucide-react';

function App() {
  const [dl, setDl] = useState(180);
  const [dr, setDr] = useState(180);
  const [height, setHeight] = useState(1100);
  const [type, setType] = useState('balusters');

  const isOutOfStandard = dl < 150 || dl > 350 || dr < 150 || dr > 350 || height < 300 || height > 1200;

  const handleEmailRequest = async () => {
    const text = `Gửi email tới: baronvn7197@gmail.com\nTiêu đề: Yêu cầu xác nhận kỹ thuật Lan can góc\n\nXin chào bộ phận kỹ thuật,\n\nTôi muốn yêu cầu xác nhận kỹ thuật cho kích thước sản phẩm nằm ngoài tiêu chuẩn:\n- DL (Cạnh trái): ${dl} mm\n- DR (Cạnh phải): ${dr} mm\n- Chiều cao (H): ${height} mm\n- Loại vật liệu: ${type === 'glass' ? 'Kính Cường Lực' : 'Thanh dọc nhôm'}\n\nVui lòng kiểm tra và phản hồi.\n\nXin cảm ơn.`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Đã COPY nội dung yêu cầu vào khay nhớ tạm (Clipboard)!\n\nBạn chưa cài đặt ứng dụng Email mặc định trên máy. Hãy tự mở Gmail/Outlook của bạn và Dán (Ctrl+V hoặc chuột phải -> Paste) nội dung này để gửi đi nhé.');
    } catch (err) {
      alert('Lỗi copy, vui lòng copy tay các thông số của bạn để gửi mail.');
    }
  };

  const handleExport = () => {
    exportToDxf(dl, dr, height, type);
  };

  return (
    <div className="app-container">
      <button className="home-btn" onClick={() => window.dispatchEvent(new Event('reset-camera'))}>
        <Home size={18} />
        Góc nhìn chuẩn
      </button>

      <div className="canvas-container">
        <Scene dl={dl} dr={dr} height={height} type={type} />
      </div>

      <div className="sidebar">
        <div className="sidebar-header">
          <Settings2 className="icon-header" />
          <h2>Parameters</h2>
        </div>
        
        <div className="control-group">
          <label htmlFor="dl-input">
            <span className="label-text">DL (Left Length)</span>
            <input
              type="number"
              value={dl}
              onChange={(e) => setDl(Number(e.target.value))}
              className="number-input"
            />
          </label>
          <input
            id="dl-input"
            type="range"
            min="150"
            max="350"
            value={dl}
            onChange={(e) => setDl(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label htmlFor="dr-input">
            <span className="label-text">DR (Right Length)</span>
            <input
              type="number"
              value={dr}
              onChange={(e) => setDr(Number(e.target.value))}
              className="number-input"
            />
          </label>
          <input
            id="dr-input"
            type="range"
            min="150"
            max="350"
            value={dr}
            onChange={(e) => setDr(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label htmlFor="height-input">
            <span className="label-text">H (Height)</span>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="number-input"
            />
          </label>
          <input
            id="height-input"
            type="range"
            min="300"
            max="1200"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label htmlFor="type-select">
            <span className="label-text">Loại vật liệu (Type)</span>
          </label>
          <select 
            id="type-select" 
            className="styled-select" 
            value={type} 
            onChange={(e) => setType(e.target.value)}
          >
            <option value="balusters">Song dọc nhôm (Balusters)</option>
            <option value="glass">Kính Cường Lực (Glass Panels)</option>
          </select>
        </div>

        <div className="divider"></div>

        {isOutOfStandard && (
          <div className="warning-banner">
            <div className="warning-text">
              <AlertTriangle size={20} />
              <span>Sản phẩm ngoài tiêu chuẩn (150-350mm). Cần xác nhận kỹ thuật!</span>
            </div>
            <button className="email-btn" onClick={handleEmailRequest}>
              <Mail size={16} />
              Gửi Yêu Cầu Kỹ Thuật
            </button>
          </div>
        )}

        <div className="sidebar-info">
          <p><strong>Standard Dimensions:</strong> 180x180x1100 mm</p>
          <p>Interact with the 3D view to rotate and inspect the balcony corner model.</p>
        </div>

        <button className="export-btn" onClick={handleExport}>
          <Download className="icon-btn" size={18} />
          <span>Export DXF Plan View</span>
        </button>
      </div>
    </div>
  );
}

export default App;

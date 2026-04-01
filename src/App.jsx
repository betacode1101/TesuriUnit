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
    const text = `送信先: baronvn7197@gmail.com\n件名: コーナーバルコニー技術確認依頼\n\n技術担当者様、\n\n以下の特注寸法・仕様について、製作可否の技術確認をお願いいたします:\n- DL (左側長さ): ${dl} mm\n- DR (右側長さ): ${dr} mm\n- 高さ (H): ${height} mm\n- 仕様: ${type === 'glass' ? 'Pタイプ (ガラス)' : 'Kタイプ (縦格子)'}\n\nご確認のほどよろしくお願いいたします。`;
    try {
      await navigator.clipboard.writeText(text);
      alert('メールの本文がクリップボードにコピーされました！\n\nお使いのPCでデフォルトのメールアプリが開かない場合は、お手数ですが手動でGmailやOutlookを開き、内容を貼り付けて（Ctrl+V）送信してください。');
    } catch (err) {
      alert('コピーに失敗しました。お手数ですが、パラメータを手動で控えてメールを送信してください。');
    }
  };

  const handleExport = () => {
    exportToDxf(dl, dr, height, type);
  };

  return (
    <div className="app-container">
      <button className="home-btn" onClick={() => window.dispatchEvent(new Event('reset-camera'))}>
        <Home size={18} />
        標準ビューに戻る
      </button>

      <div className="canvas-container">
        <Scene dl={dl} dr={dr} height={height} type={type} />
      </div>

      <div className="sidebar">
        <div className="sidebar-header">
          <Settings2 className="icon-header" />
          <h2>パラメータ</h2>
        </div>
        
        <div className="control-group">
          <label htmlFor="dl-input">
            <span className="label-text">DL (左側の長さ)</span>
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
            <span className="label-text">DR (右側の長さ)</span>
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
            <span className="label-text">H (高さ)</span>
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
            <span className="label-text">仕様 (Type)</span>
          </label>
          <select 
            id="type-select" 
            className="styled-select" 
            value={type} 
            onChange={(e) => setType(e.target.value)}
          >
            <option value="balusters">Kタイプ (縦格子)</option>
            <option value="glass">Pタイプ (ガラス)</option>
          </select>
        </div>

        <div className="divider"></div>

        {isOutOfStandard && (
          <div className="warning-banner">
            <div className="warning-text">
              <AlertTriangle size={20} />
              <span>規格外寸法（150-350mm）。技術確認が必要です！</span>
            </div>
            <button className="email-btn" onClick={handleEmailRequest}>
              <Mail size={16} />
              技術確認メールを送信
            </button>
          </div>
        )}

        <div className="sidebar-info">
          <p><strong>標準寸法:</strong> 180x180x1100 mm</p>
          <p>3Dビューをドラッグして回転させ、モデルを確認できます。</p>
        </div>

        <button className="export-btn" onClick={handleExport}>
          <Download className="icon-btn" size={18} />
          <span>DXF平面図を出力</span>
        </button>
      </div>
    </div>
  );
}

export default App;

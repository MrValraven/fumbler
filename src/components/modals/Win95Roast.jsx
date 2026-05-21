import { useState } from 'react';
import { pickRoast } from '../../data/roasts.js';

export function Win95Roast({ name, intensity, onClose }) {
  const [expanded, setExpanded] = useState(true);
  const roasts = [
    pickRoast(intensity, Date.now()),
    pickRoast(intensity, Date.now() + 1),
    pickRoast(intensity, Date.now() + 2),
  ];
  const stamp = name ? name : 'PLAYER 1';
  const errorCode = `0xFUMBLE_${String(intensity * 17).padStart(4, '0')}`;

  return (
    <div className="w95r-overlay" onClick={onClose}>
      <div className="w95r-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="w95r-titlebar">
          <span className="w95r-tb-icon">!</span>
          <span className="w95r-tb-text">FumbleError.exe — Critical Failure</span>
          <div className="w95r-tb-btns">
            <button className="w95r-tbtn">_</button>
            <button className="w95r-tbtn">▢</button>
            <button className="w95r-tbtn" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="w95r-body">
          <div className="w95r-icon">
            <div className="w95r-icon-x">×</div>
          </div>
          <div className="w95r-body-text">
            <div className="w95r-msg">
              The application <b>BADDIE.exe</b> is not responding.
            </div>
            <div className="w95r-sub">
              {stamp}, this operation has failed catastrophically.<br />
              Error code: <span className="w95r-code">{errorCode}</span>
            </div>

            <button className="w95r-details-btn" onClick={() => setExpanded(!expanded)}>
              {expanded ? '▼' : '▶'} Details
            </button>

            {expanded ? (
              <div className="w95r-details">
                <div className="w95r-details-h">› stack trace</div>
                <ul className="w95r-details-list">
                  {roasts.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
                <div className="w95r-stat-row"><span>severity:</span><span>{'★'.repeat(intensity)}{'☆'.repeat(5 - intensity)}</span></div>
                <div className="w95r-stat-row"><span>recoverable:</span><span className="w95r-no">FALSE</span></div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="w95r-actions">
          <button className="w95-btn" onClick={onClose}>Abort</button>
          <button className="w95-btn" onClick={onClose}>Retry</button>
          <button className="w95-btn w95-btn-primary" onClick={onClose}>Fail</button>
        </div>
      </div>
    </div>
  );
}

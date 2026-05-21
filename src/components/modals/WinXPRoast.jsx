import { pickRoast } from '../../data/roasts.js';

export function WinXPRoast({ name, intensity, onClose }) {
  const roasts = [
    pickRoast(intensity, Date.now()),
    pickRoast(intensity, Date.now() + 1),
    pickRoast(intensity, Date.now() + 2),
  ];
  const stamp = name ? name : 'User';
  const errorCode = `0xFUMBLE_${String(intensity * 23).padStart(4, '0')}`;

  return (
    <div className="xpr-overlay" onClick={onClose}>
      <div className="xpr-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="xpr-titlebar">
          <div className="xp-tb-left">
            <span className="xp-tb-icon">!</span>
            <span className="xp-tb-text">FumbleAlert — A serious problem occurred</span>
          </div>
          <div className="xp-tb-btns">
            <button className="xp-tbtn xp-tbtn-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="xpr-body">
          <div className="xpr-icon">
            <div className="xpr-icon-inner">×</div>
          </div>
          <div className="xpr-body-text">
            <div className="xpr-msg">
              <b>BADDIE.exe</b> has encountered a problem and needs to leave.
            </div>
            <div className="xpr-sub">
              {stamp}, this fumble has been reported to your friends' group chat.
              We are sorry for the inconvenience.
            </div>

            <details className="xpr-details" open>
              <summary>Click here to view the stack trace</summary>
              <ul className="xpr-list">
                {roasts.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
              <div className="xpr-row"><span>severity:</span><span>{'★'.repeat(intensity)}{'☆'.repeat(5 - intensity)}</span></div>
              <div className="xpr-row"><span>error code:</span><span className="xpr-mono">{errorCode}</span></div>
              <div className="xpr-row"><span>recoverable:</span><span className="xpr-red">FALSE</span></div>
            </details>
          </div>
        </div>

        <div className="xpr-actions">
          <label className="xpr-check">
            <input type="checkbox" defaultChecked /> Send error report to your mom
          </label>
          <div className="xpr-actions-btns">
            <button className="xp-btn xp-btn-primary" onClick={onClose}>Send Error Report</button>
            <button className="xp-btn" onClick={onClose}>Don't Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

export function Win95Receipt({ name, intensity, onClose }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 900) * 100);
      setProgress(p);
      if (p >= 100) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, []);

  const stamp = name ? name : 'User';
  const installedAt = new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });

  return (
    <div className="w95rc-overlay" onClick={onClose}>
      <div className="w95rc-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="w95rc-titlebar">
          <span className="w95rc-tb-icon">✓</span>
          <span className="w95rc-tb-text">DateScheduler 95 — Setup Complete</span>
          <div className="w95-titlebar-btns">
            <button className="w95-tbtn">_</button>
            <button className="w95-tbtn">▢</button>
            <button className="w95-tbtn" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="w95rc-body">
          <div className="w95rc-banner">
            <div className="w95rc-banner-graphic">
              <div className="w95rc-cd">CD</div>
              <div className="w95rc-arrow">→</div>
              <div className="w95rc-disk">💾</div>
            </div>
            <div className="w95rc-banner-text">
              <div className="w95rc-h1">DateScheduler 95</div>
              <div className="w95rc-h2">Setup is complete.</div>
            </div>
          </div>

          <div className="w95rc-content">
            <div className="w95rc-msg">
              {stamp}, the following components have been installed successfully:
            </div>

            <ul className="w95rc-checklist">
              <li><span className="w95rc-check">☑</span> RizzCore.dll</li>
              <li><span className="w95rc-check">☑</span> EgoRestore.exe</li>
              <li><span className="w95rc-check">☑</span> BaddieRetention.sys</li>
              <li><span className="w95rc-check">☑</span> CalendarEntry.bin</li>
              <li><span className="w95rc-check">☑</span> Future.dat</li>
            </ul>

            <div className="w95rc-progress">
              <div className="w95rc-progress-label">Progress</div>
              <div className="w95rc-progress-bar">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="w95rc-progress-cell"
                    style={{ opacity: (i / 24) * 100 < progress ? 1 : 0.15 }}
                  />
                ))}
              </div>
              <div className="w95rc-progress-pct">{Math.round(progress)}%</div>
            </div>

            <div className="w95rc-summary">
              <div className="w95rc-row"><span>Installed at:</span><span className="w95-mono">{installedAt}</span></div>
              <div className="w95rc-row"><span>Severity rating:</span><span>{'★'.repeat(intensity)}{'☆'.repeat(5 - intensity)}</span></div>
              <div className="w95rc-row"><span>Outcome:</span><span><b>FUMBLE AVERTED</b></span></div>
            </div>

            <div className="w95rc-hint">Click <b>Finish</b> to celebrate.</div>
          </div>
        </div>

        <div className="w95rc-actions">
          <button className="w95-btn" disabled style={{ opacity: 0.5 }}>{'< Back'}</button>
          <button className="w95-btn w95-btn-primary" onClick={onClose}>Finish</button>
          <button className="w95-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

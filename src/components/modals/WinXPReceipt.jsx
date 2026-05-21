import { useEffect, useState } from 'react';

export function WinXPReceipt({ name, intensity, onClose }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 1000) * 100);
      setProgress(p);
      if (p >= 100) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, []);

  const stamp = name ? name : 'User';
  const installedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  return (
    <div className="xprc-overlay" onClick={onClose}>
      <div className="xprc-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="xprc-titlebar">
          <div className="xp-tb-left">
            <span className="xprc-tb-icon">✓</span>
            <span className="xp-tb-text">DateScheduler XP — InstallShield Wizard</span>
          </div>
          <div className="xp-tb-btns">
            <button className="xp-tbtn xp-tbtn-min">_</button>
            <button className="xp-tbtn xp-tbtn-max">▢</button>
            <button className="xp-tbtn xp-tbtn-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="xprc-body">
          <div className="xprc-side">
            <div className="xprc-side-graphic">
              <div className="xprc-side-emoji">💾</div>
              <div className="xprc-side-arrow">→</div>
              <div className="xprc-side-heart">♥</div>
            </div>
            <div className="xprc-side-brand">DateScheduler XP</div>
            <div className="xprc-side-sub">Service Pack 7</div>
          </div>

          <div className="xprc-content">
            <h2 className="xprc-h1">Setup Complete</h2>
            <p className="xprc-p">
              The InstallShield Wizard has successfully installed <b>DateScheduler XP</b>.{' '}
              {stamp}, please be sure to read the following components before continuing.
            </p>

            <ul className="xprc-checklist">
              <li><span className="xprc-check">☑</span> Activated <b>RizzCore.dll</b></li>
              <li><span className="xprc-check">☑</span> Restored <b>EgoRestore.exe</b></li>
              <li><span className="xprc-check">☑</span> Retained <b>BaddieRetention.sys</b></li>
              <li><span className="xprc-check">☑</span> Saved <b>CalendarEntry.bin</b></li>
              <li><span className="xprc-check">☑</span> Updated <b>Future.dat</b></li>
            </ul>

            <div className="xprc-progress">
              <div className="xprc-progress-row">
                <span>Finalizing setup…</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="xprc-progress-bar">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className="xprc-progress-cell"
                    style={{ opacity: (i / 28) * 100 < progress ? 1 : 0.15 }}
                  />
                ))}
              </div>
            </div>

            <div className="xprc-summary">
              <div className="xprc-row"><span>Installed at:</span><span className="xprc-mono">{installedAt}</span></div>
              <div className="xprc-row"><span>Severity rating:</span><span>{'★'.repeat(intensity)}{'☆'.repeat(5 - intensity)}</span></div>
              <div className="xprc-row"><span>Outcome:</span><span><b>FUMBLE AVERTED</b></span></div>
            </div>

            <div className="xprc-hint">
              Click <b>Finish</b> to exit the wizard and start dating successfully.
            </div>
          </div>
        </div>

        <div className="xprc-actions">
          <button className="xp-btn" disabled style={{ opacity: 0.5 }}>{'< Back'}</button>
          <button className="xp-btn xp-btn-primary" onClick={onClose}>Finish</button>
          <button className="xp-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

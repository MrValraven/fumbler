import { useEffect, useState } from 'react';
import { CRTOverlay } from '../CRTOverlay.jsx';
import { pickRoast } from '../../data/roasts.js';
import { sfxBlip } from '../../audio/audioEngine.js';

export function ArcadeRoast({ name, intensity, onClose }) {
  const [shake, setShake] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShake(false), 600);
    return () => clearTimeout(t);
  }, []);

  const roasts = [
    pickRoast(intensity, Date.now()),
    pickRoast(intensity, Date.now() + 1),
    pickRoast(intensity, Date.now() + 2),
  ];
  const stamp = name ? name.toUpperCase() : 'PLAYER 1';

  return (
    <div className={`roast-overlay ${shake ? 'roast-shake' : ''}`} onClick={onClose}>
      <div className="roast-card" onClick={(e) => e.stopPropagation()}>
        <div className="roast-stamp">FUMBLED</div>
        <h2 className="roast-title" data-text="L + RATIO">L + RATIO</h2>
        <div className="roast-sub">— OFFICIAL FUMBLE REPORT —</div>

        <div className="roast-line"><span>SUBJECT:</span><b>{stamp}</b></div>
        <div className="roast-line"><span>VERDICT:</span><b className="roast-verdict">BADDIE LOST</b></div>
        <div className="roast-line"><span>SEVERITY:</span><b>{'★'.repeat(intensity)}{'☆'.repeat(5 - intensity)}</b></div>

        <ul className="roast-list">
          {roasts.map((r, i) => <li key={i}>› {r}</li>)}
        </ul>

        <div className="roast-marquee">
          <div className="roast-marquee-track">
            you fumbled it. you fumbled it. you fumbled it. you fumbled it. you fumbled it.
            you fumbled it. you fumbled it. you fumbled it. you fumbled it. you fumbled it.
          </div>
        </div>

        <button
          className="roast-close"
          onClick={(e) => {
            e.stopPropagation();
            sfxBlip();
            onClose();
          }}
        >
          [ continue spiraling ]
        </button>
      </div>
      <CRTOverlay intensity={1.3} />
    </div>
  );
}

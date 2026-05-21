import { useEffect, useRef, useState } from 'react';
import { PixelArt } from './PixelArt.jsx';
import { CRTOverlay } from './CRTOverlay.jsx';
import { SAD_GAMER, SAD_GAMER_PALETTE, BADDIE, BADDIE_PALETTE } from '../data/sprites.js';
import { sfxCoin, sfxFanfare } from '../audio/audioEngine.js';

export function BootScreen({ onStart }) {
  const [coinDropping, setCoinDropping] = useState(false);
  const [exiting, setExiting] = useState(false);
  const armed = useRef(false);

  const start = () => {
    if (armed.current) return;
    armed.current = true;
    sfxCoin();
    setCoinDropping(true);
    setTimeout(() => sfxFanfare(), 320);
    setTimeout(() => setExiting(true), 900);
    setTimeout(() => onStart && onStart(), 1500);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (armed.current) return;
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        start();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`boot ${exiting ? 'boot-exit' : ''}`}
      onClick={start}
      role="button"
      aria-label="Press start"
    >
      <div className="boot-bezel">
        <div className="boot-marquee">★ FUMBLE-A-BADDIE ★</div>
        <div className="boot-sub">— THE ARCADE EXPERIENCE —</div>

        <div className="boot-art">
          <PixelArt data={SAD_GAMER} palette={SAD_GAMER_PALETTE} scale={6} />
          <div className="boot-vs">vs</div>
          <PixelArt data={BADDIE} palette={BADDIE_PALETTE} scale={6} />
        </div>

        <div className="boot-press">PRESS START</div>

        <div className="boot-coin-area">
          <div className="boot-coin-slot">
            <div className="boot-coin-slot-mouth" />
            <div className="boot-coin-slot-text">INSERT COIN</div>
          </div>
          {coinDropping ? <div className="boot-coin-falling">◉</div> : null}
        </div>

        <div className="boot-hi">
          <div className="boot-hi-title">HIGH SCORES</div>
          <div className="boot-hi-row"><span>1.</span><span>CARTER</span><span>014</span></div>
          <div className="boot-hi-row"><span>2.</span><span>DYLAN</span><span>009</span></div>
          <div className="boot-hi-row"><span>3.</span><span>TYLER</span><span>007</span></div>
          <div className="boot-hi-row boot-hi-you"><span>4.</span><span>YOU</span><span>???</span></div>
        </div>

        <div className="boot-credits">© 1989 FUMBLE INC. · 1 CREDIT</div>
      </div>

      <CRTOverlay intensity={1.2} />
    </div>
  );
}

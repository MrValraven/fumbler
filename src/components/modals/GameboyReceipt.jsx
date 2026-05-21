import { useEffect, useState } from 'react';
import { PixelArt } from '../PixelArt.jsx';
import { SAD_GAMER, BADDIE } from '../../data/sprites.js';

const GB_GAMER_PAL = {
  k: '#0f380f', s: '#306230', S: '#0f380f', h: '#0f380f', H: '#0f380f',
  j: '#8bac0f', J: '#306230', n: '#0f380f', e: '#9bbc0f', p: '#0f380f',
  m: '#0f380f', b: '#0f380f', B: '#0f380f',
};

const GB_BADDIE_PAL = {
  k: '#0f380f', h: '#0f380f', H: '#306230', s: '#306230',
  p: '#0f380f', P: '#0f380f', d: '#306230', D: '#0f380f', g: '#0f380f', l: '#0f380f',
};

export function GameboyReceipt({ name, intensity, onClose }) {
  const [revealed, setRevealed] = useState(0);
  const playerName = (name || 'YOU').toUpperCase().slice(0, 7);

  const lines = [
    `${playerName} locked in!`,
    'BADDIE was charmed.',
    `${playerName} gained ${intensity * 30} EXP!`,
    'RIZZ went up by 1!',
    'Press A to brag…',
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setRevealed((r) => {
        if (r >= lines.length) { clearInterval(id); return r; }
        return r + 1;
      });
    }, 900);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="gbrc-overlay" onClick={onClose}>
      <div className="gbrc-screen" onClick={(e) => e.stopPropagation()}>
        <div className="gbrc-title">★ VICTORY ★</div>
        <div className="gbrc-subtitle">DATE LOCKED IN</div>

        <div className="gbrc-sprite-row">
          <div className="gbrc-sprite gbrc-bounce">
            <PixelArt data={SAD_GAMER} palette={GB_GAMER_PAL} scale={5} />
          </div>
          <div className="gbrc-heart">♥</div>
          <div className="gbrc-sprite gbrc-bounce gbrc-bounce-2">
            <PixelArt data={BADDIE} palette={GB_BADDIE_PAL} scale={5} />
          </div>
        </div>

        <div className="gbrc-stats">
          <div className="gbrc-stat">
            <span>EXP</span>
            <div className="gb-hpbar-track"><div className="gb-hpbar-fill" style={{ width: '100%' }} /></div>
            <span>+{intensity * 30}</span>
          </div>
          <div className="gbrc-stat">
            <span>RIZZ</span>
            <div className="gb-hpbar-track"><div className="gb-hpbar-fill" style={{ width: '78%' }} /></div>
            <span>+1</span>
          </div>
          <div className="gbrc-stat">
            <span>EGO</span>
            <div className="gb-hpbar-track"><div className="gb-hpbar-fill" style={{ width: '88%' }} /></div>
            <span>RESTORED</span>
          </div>
        </div>

        <div className="gbrc-dialog">
          {lines.slice(0, revealed).map((line, i) => (
            <div key={i} className="gbrc-line">{line}</div>
          ))}
          {revealed >= lines.length ? <span className="gb-cursor">▼</span> : null}
        </div>

        <button className="gbrc-continue" onClick={onClose}>▶ PRESS A</button>
      </div>
    </div>
  );
}

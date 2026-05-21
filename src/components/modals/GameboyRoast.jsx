import { useEffect, useState } from 'react';
import { PixelArt } from '../PixelArt.jsx';
import { SAD_GAMER, TEAR } from '../../data/sprites.js';
import { pickRoast } from '../../data/roasts.js';

const GB_GAMER_PAL = {
  k: '#0f380f', s: '#306230', S: '#0f380f', h: '#0f380f', H: '#0f380f',
  j: '#8bac0f', J: '#306230', n: '#0f380f', e: '#9bbc0f', p: '#0f380f',
  m: '#0f380f', b: '#0f380f', B: '#0f380f',
};

export function GameboyRoast({ name, intensity, onClose }) {
  const [revealed, setRevealed] = useState(0);
  const playerName = (name || 'YOU').toUpperCase().slice(0, 7);

  const lines = [
    `${playerName} fumbled the BADDIE!`,
    'BADDIE has fled.',
    `${playerName} took ${intensity * 47} damage to the ego.`,
    pickRoast(intensity, Date.now()),
    'Press A to continue spiraling…',
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setRevealed((r) => {
        if (r >= lines.length) { clearInterval(id); return r; }
        return r + 1;
      });
    }, 1200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="gbr-overlay" onClick={onClose}>
      <div className="gbr-screen" onClick={(e) => e.stopPropagation()}>
        <div className="gbr-title">★ GAME OVER ★</div>

        <div className="gbr-sprite-row">
          <div className="gbr-sprite">
            <PixelArt data={SAD_GAMER} palette={GB_GAMER_PAL} scale={5} />
            <PixelArt
              data={TEAR}
              palette={{ t: '#0f380f', T: '#306230' }}
              scale={5}
              style={{ position: 'absolute', top: '40%', left: '38%' }}
              className="ar-tear"
            />
          </div>
          <div className="gbr-baddie-leaving">
            <span className="gbr-bye">BADDIE fled →</span>
            <div className="gbr-baddie-arrow">→ → →</div>
          </div>
        </div>

        <div className="gbr-stats">
          <div className="gbr-stat">
            <span>EGO</span>
            <div className="gb-hpbar-track"><div className="gb-hpbar-fill" style={{ width: '5%' }} /></div>
            <span>5/200</span>
          </div>
          <div className="gbr-stat">
            <span>RIZZ</span>
            <div className="gb-hpbar-track"><div className="gb-hpbar-fill" style={{ width: '0%' }} /></div>
            <span>0/200</span>
          </div>
        </div>

        <div className="gbr-dialog">
          {lines.slice(0, revealed).map((line, i) => (
            <div key={i} className="gbr-line">{line}</div>
          ))}
          {revealed >= lines.length ? <span className="gb-cursor">▼</span> : null}
        </div>

        <button className="gbr-continue" onClick={onClose}>▶ PRESS A</button>
      </div>
    </div>
  );
}

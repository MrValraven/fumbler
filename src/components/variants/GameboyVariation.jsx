import { PixelArt } from '../PixelArt.jsx';
import { ModeChip } from '../ModeChip.jsx';
import { MuteChip } from '../MuteChip.jsx';
import { useCountdown } from '../../hooks/useCountdown.js';
import { useHPForCountdown } from '../../hooks/useHPForCountdown.js';
import { usePanicLevel } from '../../hooks/usePanicLevel.js';
import { getCopy } from '../../data/copy.js';
import { getGamer, getBaddie, ACCESSORIES } from '../../data/characters.js';
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

const GB_ACC_PAL = {
  k: '#0f380f', g: '#306230', j: '#0f380f', b: '#0f380f', h: '#0f380f', c: '#306230', s: '#306230',
};

export function GameboyVariation({
  name, targetISO,
  gamerKey, baddieKey, viewMode = 'him',
  streak = 0, rizzBoost = false,
  mode, onModeChange, modeLocked = false, muted, onMuteToggle,
  onLockIn, onLogOut,
}) {
  const c = useCountdown(targetISO);
  const hp = useHPForCountdown(targetISO);
  const panic = usePanicLevel(targetISO);
  const copy = getCopy(viewMode);

  const gamer = getGamer(gamerKey);
  const baddie = getBaddie(baddieKey);
  const playerName = (name || 'YOU').toUpperCase().slice(0, 7);

  return (
    <div className={`gb-shell ${rizzBoost ? 'rizz-boost' : ''} panic-${panic}`}>
      <div className="gb-bezel">
        <div className="gb-chrome-row">
          <ModeChip value={mode} onChange={onModeChange} theme="gameboy" disabled={modeLocked} />
          <MuteChip muted={muted} onToggle={onMuteToggle} theme="gameboy" />
        </div>
        <div className="gb-screen-frame">
          <div className="gb-screen">
            <div className="gb-power">●</div>
            <div className="gb-label">DOT MATRIX WITH STEREO SOUND</div>

            <div className="gb-battle">
              <div className="gb-enemy-info">
                <div className="gb-row"><span>{baddie.label}</span><span className="gb-lvl">:L99</span></div>
                <div className="gb-hpbar">
                  <span className="gb-hpbar-lbl">HP</span>
                  <div className="gb-hpbar-track"><div className="gb-hpbar-fill" style={{ width: '12%' }} /></div>
                </div>
                <div className="gb-row gb-row-small"><span>STATUS:</span><span className="gb-blink">LEAVING</span></div>
              </div>
              <div className="gb-enemy-platform">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <PixelArt data={BADDIE} palette={GB_BADDIE_PAL} scale={4} />
                  {baddie.accessory && ACCESSORIES[baddie.accessory] ? (
                    <PixelArt
                      data={ACCESSORIES[baddie.accessory].data}
                      palette={GB_ACC_PAL}
                      scale={4}
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                  ) : null}
                </div>
              </div>

              <div className="gb-player-platform">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <PixelArt data={SAD_GAMER} palette={GB_GAMER_PAL} scale={4} />
                  {gamer.accessory && ACCESSORIES[gamer.accessory] ? (
                    <PixelArt
                      data={ACCESSORIES[gamer.accessory].data}
                      palette={GB_ACC_PAL}
                      scale={4}
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                  ) : null}
                </div>
              </div>
              <div className="gb-player-info">
                <div className="gb-row"><span>{playerName}</span><span className="gb-lvl">:L{streak || 1}</span></div>
                <div className="gb-hpbar">
                  <span className="gb-hpbar-lbl">HP</span>
                  <div className="gb-hpbar-track">
                    <div className={`gb-hpbar-fill ${hp < 25 ? 'gb-low' : ''}`} style={{ width: `${hp}%` }} />
                  </div>
                </div>
                <div className="gb-row gb-row-small"><span>TIMER</span><span>{c.short}</span></div>
              </div>
            </div>

            <div className="gb-dialog">
              <div className="gb-dialog-text">
                {viewMode === 'her'
                  ? <>He thinks he's<br />fumbling you.</>
                  : <>A wild {baddie.label}<br />is fleeing!</>}
                <br />
                What will {playerName} do?<span className="gb-cursor">▼</span>
              </div>
              <div className="gb-menu">
                <button className="gb-menu-item gb-menu-item-active" onClick={onLockIn}>
                  <span className="gb-cursor-pointer">▶</span>{(copy.primary || 'LOCK IN').toUpperCase()}
                </button>
                <button className="gb-menu-item" onClick={onLogOut}>
                  &nbsp;{(copy.secondary || 'LOG OUT').toUpperCase()}
                </button>
                <div className="gb-menu-item">&nbsp;RUN</div>
              </div>
            </div>
          </div>
        </div>

        <div className="gb-controls">
          <div className="gb-dpad">
            <div className="gb-dpad-h" />
            <div className="gb-dpad-v" />
            <div className="gb-dpad-dot" />
          </div>
          <div className="gb-ab">
            <div className="gb-btn-circle">B</div>
            <div className="gb-btn-circle">A</div>
          </div>
        </div>
        <div className="gb-startsel">
          <div className="gb-pill">SELECT</div>
          <div className="gb-pill">START</div>
        </div>
        <div className="gb-speaker">
          <div /><div /><div /><div /><div /><div />
        </div>
        <div className="gb-brand">FUMBLEBOY <span>color</span></div>
        <div className="panic-overlay" />
      </div>
    </div>
  );
}

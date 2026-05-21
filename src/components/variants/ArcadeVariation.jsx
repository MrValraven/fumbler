import { PixelArt } from '../PixelArt.jsx';
import { ArchetypeSprite } from '../ArchetypeSprite.jsx';
import { CRTOverlay } from '../CRTOverlay.jsx';
import { ModeChip } from '../ModeChip.jsx';
import { MuteChip } from '../MuteChip.jsx';
import { useCountdown } from '../../hooks/useCountdown.js';
import { useCoinAtOneHour, useHPForCountdown } from '../../hooks/useHPForCountdown.js';
import { usePanicLevel } from '../../hooks/usePanicLevel.js';
import { getCopy } from '../../data/copy.js';
import { getGamer, getBaddie } from '../../data/characters.js';
import {
  SAD_GAMER, BADDIE, TEAR, TEAR_PALETTE,
  DEAD_HEART, HEART_PALETTE,
} from '../../data/sprites.js';
import { pickRoast } from '../../data/roasts.js';

export function ArcadeVariation({
  name, intensity, targetISO,
  gamerKey, baddieKey, viewMode = 'him',
  streak = 0, rizzBoost = false,
  mode, onModeChange, modeLocked = false, muted, onMuteToggle,
  onLockIn, onLogOut,
}) {
  const c = useCountdown(targetISO);
  const hp = useHPForCountdown(targetISO);
  const panic = usePanicLevel(targetISO);
  useCoinAtOneHour(targetISO);
  const copy = getCopy(viewMode);

  const gamer = getGamer(gamerKey);
  const baddie = getBaddie(baddieKey);

  const hpColor = hp < 25 ? '#ff2222' : hp < 50 ? '#ffd400' : '#00ff66';

  return (
    <div className={`ar-shell ${rizzBoost ? 'rizz-boost' : ''} panic-${panic}`}>
      <div className="ar-frame">
        <div className="ar-statusbar">
          <div className="ar-statusleft">
            <PixelArt data={DEAD_HEART} palette={HEART_PALETTE} scale={3} />
            <div className="ar-battery">
              <div className="ar-battery-cell" style={{ width: `${hp}%`, background: hpColor }} />
            </div>
            <span className="ar-statuslabel">HP·{hp}</span>
            <span className="ar-streak">STK·{streak}</span>
          </div>
          <div className="ar-statusright">
            <ModeChip value={mode} onChange={onModeChange} theme="arcade" disabled={modeLocked} />
            <MuteChip muted={muted} onToggle={onMuteToggle} theme="arcade" />
            <div className="ar-gameover">{copy.gameOver}</div>
          </div>
        </div>

        <div className="ar-headline-wrap">
          <h1 className="ar-headline" data-text="oh no!">oh no!</h1>
        </div>

        <div className="ar-subtitle">
          {viewMode === 'her' ? (
            <>{copy.subtitle.l1}<br />{copy.subtitle.l2}</>
          ) : (
            <>
              {name ? <>{name.toUpperCase()}, </> : null}
              {copy.subtitle.l1.toUpperCase()}<br />
              {copy.subtitle.l2.toUpperCase()}
            </>
          )}
        </div>

        <div className="ar-body">
          <div className="ar-char ar-char-left">
            <ArchetypeSprite
              base={SAD_GAMER}
              palette={gamer.palette}
              accessoryKey={gamer.accessory}
              scale={5}
            />
            <PixelArt
              data={TEAR}
              palette={TEAR_PALETTE}
              scale={5}
              style={{ position: 'absolute', top: '40%', left: '38%' }}
              className="ar-tear"
            />
            <div className="ar-char-label">{gamer.label}</div>
          </div>

          <div className="ar-notice">
            <div className="ar-notice-title">{copy.noticeTitle}</div>
            <div className="ar-notice-row">
              <span>{copy.fields.timer}</span>
              <span className="ar-notice-val ar-blink-red">{c.short}</span>
            </div>
            <div className="ar-notice-row">
              <span>{copy.fields.loc}</span>
              <span className="ar-notice-val">{copy.values.loc}</span>
            </div>
            <div className="ar-notice-row">
              <span>{copy.fields.time}</span>
              <span className="ar-notice-val">{copy.values.time}</span>
            </div>
            <div className="ar-notice-row ar-notice-stack">
              <span>{copy.fields.resched}</span>
              <span className="ar-notice-val">{copy.values.resched}</span>
            </div>
          </div>

          <div className="ar-char ar-char-right">
            <ArchetypeSprite
              base={BADDIE}
              palette={baddie.palette}
              accessoryKey={baddie.accessory}
              scale={5}
            />
            <div className="ar-char-label">{baddie.label}</div>
          </div>
        </div>

        <div className="ar-buttons">
          <button className="ar-btn ar-btn-red" onClick={onLockIn}>
            <span>{copy.primary}</span>
          </button>
          <button className="ar-btn ar-btn-blue" onClick={onLogOut}>
            <span>{copy.secondary}</span>
          </button>
        </div>

        <div className="ar-ticker">
          <div className="ar-ticker-track">
            ★ {pickRoast(intensity, 0)} &nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;
            {pickRoast(intensity, 1)} &nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;
            {pickRoast(intensity, 2)} &nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;
            ★ {pickRoast(intensity, 0)} &nbsp;&nbsp;&nbsp;
          </div>
        </div>

        <CRTOverlay />
        <div className="vhs-roll" />
        <div className="panic-overlay" />
      </div>
    </div>
  );
}

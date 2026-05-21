import { ArchetypeSprite } from '../ArchetypeSprite.jsx';
import { CRTOverlay } from '../CRTOverlay.jsx';
import { ModeChip } from '../ModeChip.jsx';
import { MuteChip } from '../MuteChip.jsx';
import { useCountdown } from '../../hooks/useCountdown.js';
import { useHPForCountdown } from '../../hooks/useHPForCountdown.js';
import { usePanicLevel } from '../../hooks/usePanicLevel.js';
import { getCopy } from '../../data/copy.js';
import { getGamer, getBaddie } from '../../data/characters.js';
import { SAD_GAMER, BADDIE } from '../../data/sprites.js';

export function WinXPVariation({
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
  const errorCode = '0xBADDIE_404';

  const gamer = getGamer(gamerKey);
  const baddie = getBaddie(baddieKey);

  return (
    <div className={`xp-shell ${rizzBoost ? 'rizz-boost' : ''} panic-${panic}`}>
      <div className="xp-desktop">
        <div className="xp-bliss">
          <div className="xp-sky" />
          <div className="xp-hill xp-hill-back" />
          <div className="xp-hill xp-hill-front" />
          <div className="xp-cloud xp-cloud-1" />
          <div className="xp-cloud xp-cloud-2" />
        </div>

        <div className="xp-icons">
          <div className="xp-icon"><div className="xp-icon-glyph">🗑</div><div className="xp-icon-label">Recycle Bin</div></div>
          <div className="xp-icon"><div className="xp-icon-glyph">📁</div><div className="xp-icon-label">My Plans</div></div>
          <div className="xp-icon"><div className="xp-icon-glyph">📧</div><div className="xp-icon-label">Unread Texts (47)</div></div>
        </div>

        <div className="xp-window xp-window-main">
          <div className="xp-titlebar">
            <div className="xp-tb-left">
              <span className="xp-tb-icon">!</span>
              <span className="xp-tb-text">FumbleAlert — Date Recovery Service</span>
            </div>
            <div className="xp-tb-btns">
              <button className="xp-tbtn xp-tbtn-min">_</button>
              <button className="xp-tbtn xp-tbtn-max">▢</button>
              <button className="xp-tbtn xp-tbtn-close">✕</button>
            </div>
          </div>

          <div className="xp-window-body">
            <div className="xp-warn">
              <div className="xp-warn-icon">
                <div className="xp-warn-icon-inner">!</div>
              </div>
              <div className="xp-warn-body">
                <div className="xp-warn-title">
                  {viewMode === 'her'
                    ? <>He thinks he's about to fumble you.</>
                    : <>{name ? <>{name}, </> : <>WARNING: </>}you're about to fumble a baddie!</>}
                </div>
                <div className="xp-warn-sub">
                  Windows has detected a low-rizz event in progress. Please choose how to proceed.
                </div>
                <table className="xp-warn-table"><tbody>
                  <tr><td>{copy.fields.timer}</td><td className="xp-mono xp-red">{c.short}</td></tr>
                  <tr><td>{copy.fields.loc}</td><td className="xp-mono">— {copy.values.loc} —</td></tr>
                  <tr><td>{copy.fields.time}</td><td className="xp-mono">— {copy.values.time} —</td></tr>
                  <tr><td>{copy.fields.resched}</td><td className="xp-mono">{copy.values.resched}</td></tr>
                  <tr><td>Error code:</td><td className="xp-mono xp-red">{errorCode}</td></tr>
                  <tr><td>HP / streak:</td><td className="xp-mono">{hp}% · streak {streak}</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>

          <div className="xp-actions">
            <button className="xp-btn xp-btn-primary" onClick={onLockIn}>
              {copy.primary === 'Y' ? 'Yes' : 'Lock In'}
            </button>
            <button className="xp-btn" onClick={onLogOut}>
              {copy.secondary === 'N' ? 'No' : 'Log Out'}
            </button>
          </div>
        </div>

        <div className="xp-window xp-window-gamer">
          <div className="xp-titlebar xp-titlebar-inactive">
            <div className="xp-tb-left">
              <span className="xp-tb-text">{gamer.label.toLowerCase()}.bmp</span>
            </div>
            <div className="xp-tb-btns">
              <button className="xp-tbtn xp-tbtn-close">✕</button>
            </div>
          </div>
          <div className="xp-portrait">
            <ArchetypeSprite
              base={SAD_GAMER}
              palette={gamer.palette}
              accessoryKey={gamer.accessory}
              scale={5}
            />
          </div>
        </div>

        <div className="xp-window xp-window-baddie">
          <div className="xp-titlebar xp-titlebar-inactive">
            <div className="xp-tb-left">
              <span className="xp-tb-text">{baddie.label.toLowerCase()}.bmp</span>
            </div>
            <div className="xp-tb-btns">
              <button className="xp-tbtn xp-tbtn-close">✕</button>
            </div>
          </div>
          <div className="xp-portrait">
            <ArchetypeSprite
              base={BADDIE}
              palette={baddie.palette}
              accessoryKey={baddie.accessory}
              scale={5}
            />
          </div>
        </div>

        <div className="xp-balloon">
          <div className="xp-balloon-body">
            <b>It looks like you're trying to fumble a baddie!</b><br />
            Would you like help?
          </div>
          <div className="xp-balloon-actions">
            <button className="xp-balloon-link" onClick={onLockIn}>Yes, lock in for me.</button>
            <button className="xp-balloon-link" onClick={onLogOut}>No, I want to suffer.</button>
            <button className="xp-balloon-link xp-balloon-link-mute" onClick={() => {}}>Don't show me this tip again.</button>
          </div>
          <div className="xp-balloon-tail" />
        </div>

        <div className="xp-taskbar">
          <button className="xp-start">
            <span className="xp-start-flag" />
            <span className="xp-start-text">start</span>
          </button>
          <div className="xp-tb-item xp-tb-item-active">
            <span>⚠</span> FumbleAlert
          </div>
          <div className="xp-tb-item">
            <span>♥</span> {gamer.label.toLowerCase()}.bmp
          </div>
          <div className="xp-tb-item">
            <span>♥</span> {baddie.label.toLowerCase()}.bmp
          </div>
          <div className="xp-tray">
            <ModeChip value={mode} onChange={onModeChange} theme="winxp" disabled={modeLocked} />
            <MuteChip muted={muted} onToggle={onMuteToggle} theme="winxp" />
            <span className="xp-tray-clock">
              {c.short.slice(-8)}<br />
              <small>Tue 5/21</small>
            </span>
          </div>
        </div>

        <CRTOverlay intensity={0.4} />
        <div className="vhs-roll" />
        <div className="panic-overlay" />
      </div>
    </div>
  );
}

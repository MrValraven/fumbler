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
import { pickRoast } from '../../data/roasts.js';

export function Win95Variation({
  name, intensity, targetISO,
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
    <div className={`w95-shell ${rizzBoost ? 'rizz-boost' : ''} panic-${panic}`}>
      <div className="w95-desktop">
        <div className="w95-bsod">
          <div className="w95-bsod-bar">Windows</div>
          <div className="w95-bsod-body">
            A fatal exception <b>0E</b> has occurred at <b>{errorCode}</b><br />
            in module <b>DATING.DLL</b>.<br /><br />
            The current application will be terminated.<br />
            <span className="w95-bsod-blink">_</span>
          </div>
        </div>

        <div className="w95-sign">
          <div className="w95-sign-text" data-text="oh no!">oh no!</div>
        </div>

        <div className="w95-dialog w95-dialog-main">
          <div className="w95-titlebar">
            <span className="w95-titlebar-icon">!</span>
            <span className="w95-titlebar-text">FumbleAlert.exe</span>
            <div className="w95-titlebar-btns">
              <button className="w95-tbtn">_</button>
              <button className="w95-tbtn">▢</button>
              <button className="w95-tbtn">✕</button>
            </div>
          </div>
          <div className="w95-dialog-body">
            <div className="w95-warn-icon">▲<span>!</span></div>
            <div className="w95-warn-body">
              <div className="w95-warn-title">
                {viewMode === 'her'
                  ? <>he thinks he's about to fumble you.</>
                  : <>{name ? <>{name}, </> : <>WARNING: </>}you're about to fumble a baddie!</>}
              </div>
              <div className="w95-warn-list">
                <div><b>{copy.noticeTitle}</b></div>
                <table><tbody>
                  <tr><td>{copy.fields.timer}</td><td className="w95-mono w95-red">{c.short}</td></tr>
                  <tr><td>{copy.fields.loc}</td><td className="w95-mono">— {copy.values.loc} —</td></tr>
                  <tr><td>{copy.fields.time}</td><td className="w95-mono">— {copy.values.time} —</td></tr>
                  <tr><td>{copy.fields.resched}</td><td className="w95-mono">{copy.values.resched}</td></tr>
                  <tr><td>HP:</td><td className="w95-mono">{hp}% · streak {streak}</td></tr>
                </tbody></table>
              </div>
              <div className="w95-warn-prompt">
                <input type="checkbox" id="w95-chk" defaultChecked />{' '}
                <label htmlFor="w95-chk">don't show me this again (lol you know you will)</label>
              </div>
            </div>
          </div>
          <div className="w95-dialog-actions">
            <button className="w95-btn w95-btn-primary" onClick={onLockIn}>{copy.primary === 'Y' ? 'Yes' : 'Lock In'}</button>
            <button className="w95-btn" onClick={onLogOut}>{copy.secondary === 'N' ? 'No' : 'Log Out'}</button>
          </div>
        </div>

        <div className="w95-dialog w95-dialog-gamer">
          <div className="w95-titlebar w95-titlebar-inactive">
            <span className="w95-titlebar-text">{gamer.label.toLowerCase()}.bmp</span>
            <div className="w95-titlebar-btns"><button className="w95-tbtn">✕</button></div>
          </div>
          <div className="w95-dialog-body w95-portrait">
            <ArchetypeSprite
              base={SAD_GAMER}
              palette={gamer.palette}
              accessoryKey={gamer.accessory}
              scale={5}
            />
          </div>
        </div>

        <div className="w95-dialog w95-dialog-baddie">
          <div className="w95-titlebar w95-titlebar-inactive">
            <span className="w95-titlebar-text">{baddie.label.toLowerCase()}.bmp</span>
            <div className="w95-titlebar-btns"><button className="w95-tbtn">✕</button></div>
          </div>
          <div className="w95-dialog-body w95-portrait">
            <ArchetypeSprite
              base={BADDIE}
              palette={baddie.palette}
              accessoryKey={baddie.accessory}
              scale={5}
            />
          </div>
        </div>

        <div className="w95-sticky">
          <div className="w95-sticky-h">readme.txt</div>
          <div className="w95-sticky-b">{pickRoast(intensity, 0)}</div>
        </div>

        <div className="w95-taskbar">
          <button className="w95-start"><span className="w95-start-flag">▦</span> Start</button>
          <div className="w95-taskbar-item w95-taskbar-active"><span>⚠</span> FumbleAlert.exe</div>
          <div className="w95-taskbar-item"><span>♥</span> {gamer.label.toLowerCase()}.bmp</div>
          <div className="w95-taskbar-item"><span>♥</span> {baddie.label.toLowerCase()}.bmp</div>
          <div className="w95-tray">
            <ModeChip value={mode} onChange={onModeChange} theme="win95" disabled={modeLocked} />
            <MuteChip muted={muted} onToggle={onMuteToggle} theme="win95" />
            <span className="w95-tray-clock">{c.short.slice(-8)}</span>
          </div>
        </div>

        <CRTOverlay intensity={0.6} />
        <div className="vhs-roll" />
        <div className="panic-overlay" />
      </div>
    </div>
  );
}

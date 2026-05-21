import { useCallback, useEffect, useMemo, useState } from "react";
import { useUrlTweaks } from "./hooks/useUrlTweaks.js";
import { ArcadeVariation } from "./components/variants/ArcadeVariation.jsx";
import { Win95Variation } from "./components/variants/Win95Variation.jsx";
import { WinXPVariation } from "./components/variants/WinXPVariation.jsx";
import { GameboyVariation } from "./components/variants/GameboyVariation.jsx";
import { RoastScreen } from "./components/modals/RoastScreen.jsx";
import { ReceiptScreen } from "./components/modals/ReceiptScreen.jsx";
import { BootScreen } from "./components/BootScreen.jsx";
import {
  TweaksPanel,
  TweakSection,
  TweakSlider,
  TweakToggle,
  TweakSelect,
  TweakText,
  TweakDateTime,
  TweakButton,
} from "./components/TweaksPanel.jsx";
import { useStreak } from "./hooks/useStreak.js";
import { useKonami } from "./hooks/useKonami.js";
import { GAMER_ARCHETYPES, BADDIE_ARCHETYPES } from "./data/characters.js";
import { getViewMode } from "./data/copy.js";
import {
  sfxBlip,
  sfxFanfare,
  sfxLockIn,
  sfxLogOut,
  setMuted,
  setTrack,
  setOverride,
  bindAutoStart,
} from "./audio/audioEngine.js";

const DEFAULT_TARGET = new Date(
  Date.now() + 1000 * 60 * 60 * 47 + 1000 * 59 * 60 + 57000,
).toISOString();

const TWEAK_DEFAULTS = {
  name: "",
  intensity: 3,
  targetDate: "",
  gamer: "jock",
  baddie: "alt",
  muted: false,
  mode: "arcade",
};

function App() {
  const [tweaks, setTweak] = useUrlTweaks(TWEAK_DEFAULTS);

  const [roastOpen, setRoastOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [rizzBoost, setRizzBoost] = useState(false);
  const [booted, setBooted] = useState(false);
  const [toast, setToast] = useState(null);
  const viewMode = useMemo(() => getViewMode(), []);
  const streakState = useStreak();

  const isShared = useMemo(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).has("shared");
  }, []);

  const handleShare = useCallback(async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("shared", "1");
    const text = url.toString();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setToast("Link copied — ready to share");
    } catch {
      setToast("Couldn't copy link — try again");
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  const mode =
    tweaks.mode === "win95" ||
    tweaks.mode === "winxp" ||
    tweaks.mode === "gameboy"
      ? tweaks.mode
      : "arcade";
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    bindAutoStart();
  }, []);

  useEffect(() => {
    setTrack(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMuted(tweaks.muted);
  }, [tweaks.muted]);

  const changeMode = useCallback(
    (next) => {
      if (isShared) return;
      if (next === mode) return;
      sfxBlip();
      setTrack(next);
      setTransitioning(true);
      setTimeout(() => {
        setTweak("mode", next);
        setTimeout(() => setTransitioning(false), 320);
      }, 280);
    },
    [isShared, mode, setTweak],
  );

  useKonami(
    useCallback(() => {
      setRizzBoost(true);
      sfxFanfare();
      setTimeout(() => setRizzBoost(false), 12000);
    }, []),
  );

  useEffect(() => {
    const handler = () => {
      sfxFanfare();
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
    window.addEventListener("click", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
  }, []);

  const targetISO = tweaks.targetDate || DEFAULT_TARGET;
  const lockInUrl =
    (typeof document !== "undefined" && document.body.dataset.lockInUrl) || "";

  const effectiveIntensity = rizzBoost
    ? Math.min(5, tweaks.intensity + 1)
    : tweaks.intensity;

  const handleLockIn = useCallback(() => {
    sfxLockIn();
    streakState.recordLockIn();
    setTimeout(() => {
      setReceiptOpen(true);
      setOverride(`${mode}-lockin`);
      if (
        lockInUrl &&
        lockInUrl.startsWith("http") &&
        lockInUrl.indexOf("your-link-here") === -1
      ) {
        window.open(lockInUrl, "_blank");
      }
    }, 400);
  }, [lockInUrl, streakState, mode]);

  const handleLogOut = useCallback(() => {
    sfxLogOut();
    streakState.recordFumble();
    setTimeout(() => {
      setRoastOpen(true);
      setOverride(`${mode}-logout`);
    }, 300);
  }, [streakState, mode]);

  const closeRoast = useCallback(() => {
    setRoastOpen(false);
    setOverride(null);
  }, []);

  const closeReceipt = useCallback(() => {
    setReceiptOpen(false);
    setOverride(null);
  }, []);

  const sharedProps = {
    name: tweaks.name,
    intensity: effectiveIntensity,
    targetISO,
    gamerKey: tweaks.gamer,
    baddieKey: tweaks.baddie,
    viewMode,
    streak: streakState.streak,
    rizzBoost,
    mode,
    onModeChange: changeMode,
    modeLocked: isShared,
    muted: tweaks.muted,
    onMuteToggle: () => setTweak("muted", !tweaks.muted),
    onLockIn: handleLockIn,
    onLogOut: handleLogOut,
  };

  const gamerOptions = Object.entries(GAMER_ARCHETYPES).map(([k, v]) => ({
    value: k,
    label: v.label,
  }));
  const baddieOptions = Object.entries(BADDIE_ARCHETYPES).map(([k, v]) => ({
    value: k,
    label: v.label,
  }));

  return (
    <>
      {!booted ? <BootScreen onStart={() => setBooted(true)} /> : null}

      <div
        className={`viewport ${transitioning ? "viewport-crt-off" : "viewport-crt-on"}`}
      >
        {mode === "arcade" ? (
          <ArcadeVariation {...sharedProps} />
        ) : mode === "win95" ? (
          <Win95Variation {...sharedProps} />
        ) : mode === "winxp" ? (
          <WinXPVariation {...sharedProps} />
        ) : (
          <GameboyVariation {...sharedProps} />
        )}
      </div>

      {!isShared ? (
        <TweaksPanel title="Tweaks">
          <TweakSection title="Share">
            <TweakButton label="Copy share link" onClick={handleShare} />
            <div
              style={{
                fontFamily: '"VT323", monospace',
                fontSize: 14,
                lineHeight: 1.3,
                padding: "4px 4px 2px",
                opacity: 0.65,
              }}
            >
              adds <b>?shared=1</b> so the receiver can't edit
            </div>
          </TweakSection>

          <TweakSection title="Personalize">
            <TweakText
              label="Their name"
              value={tweaks.name}
              onChange={(v) => setTweak("name", v)}
              placeholder="(leave blank for none)"
            />
            <TweakSlider
              label="Roast intensity"
              value={tweaks.intensity}
              min={1}
              max={5}
              step={1}
              onChange={(v) => setTweak("intensity", v)}
              format={(v) => `${"★".repeat(v)}${"☆".repeat(5 - v)}`}
            />
          </TweakSection>

          <TweakSection title="Characters">
            <TweakSelect
              label="Fumbler"
              value={tweaks.gamer}
              options={gamerOptions}
              onChange={(v) => setTweak("gamer", v)}
            />
            <TweakSelect
              label="Baddie"
              value={tweaks.baddie}
              options={baddieOptions}
              onChange={(v) => setTweak("baddie", v)}
            />
          </TweakSection>

          <TweakSection title="Audio">
            <TweakToggle
              label="Mute everything"
              value={tweaks.muted}
              onChange={(v) => setTweak("muted", v)}
            />
          </TweakSection>

          <TweakSection title="Date">
            <TweakDateTime
              label="Target date"
              value={tweaks.targetDate}
              onChange={(v) => setTweak("targetDate", v)}
            />
          </TweakSection>

          <TweakSection title="Streak">
            <div
              style={{
                fontFamily: '"VT323", monospace',
                fontSize: 16,
                lineHeight: 1.4,
                padding: "4px 8px",
              }}
            >
              <div>
                days: <b>{streakState.streak}</b>
              </div>
              <div>
                fumbles: <b>{streakState.fumbles}</b>
              </div>
              <div style={{ opacity: 0.6, fontSize: 13 }}>
                ↑↑↓↓←→←→BA → rizz boost
              </div>
            </div>
          </TweakSection>
        </TweaksPanel>
      ) : null}

      {toast ? <div className="twk-toast">{toast}</div> : null}

      {roastOpen ? (
        <RoastScreen
          name={tweaks.name}
          intensity={effectiveIntensity}
          mode={mode}
          onClose={closeRoast}
        />
      ) : null}

      {receiptOpen ? (
        <ReceiptScreen
          name={tweaks.name}
          intensity={effectiveIntensity}
          mode={mode}
          onClose={closeReceipt}
        />
      ) : null}

      {rizzBoost ? (
        <div className="rizz-banner">★ RIZZ BOOST ACTIVATED ★</div>
      ) : null}
    </>
  );
}

export default App;

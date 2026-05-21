import { sfxBlip } from '../audio/audioEngine.js';

export function MuteChip({ muted, onToggle, theme = 'arcade' }) {
  const handleClick = () => {
    if (!muted) sfxBlip();
    onToggle();
  };
  return (
    <button
      className={`chip chip-mute chip-${theme} ${muted ? 'is-muted' : 'is-on'}`}
      onClick={handleClick}
      aria-label={muted ? 'Music off — turn on' : 'Music on — turn off'}
      title={muted ? 'Music OFF — click to play' : 'Music ON — click to mute'}
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M4 9 L4 15 L8 15 L13 19 L13 5 L8 9 Z" fill="currentColor" />
        {muted ? (
          <>
            <line x1="17" y1="9" x2="22" y2="14" />
            <line x1="22" y1="9" x2="17" y2="14" />
          </>
        ) : (
          <>
            <path d="M16 9 Q18 12 16 15" />
            <path d="M19 7 Q22 12 19 17" />
          </>
        )}
      </svg>
      <span className="chip-label">{muted ? 'MUSIC·OFF' : 'MUSIC·ON'}</span>
    </button>
  );
}

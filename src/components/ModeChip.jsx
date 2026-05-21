const MODE_OPTIONS = [
  { v: 'arcade', label: '90s ARCADE' },
  { v: 'win95', label: 'WIN95' },
  { v: 'winxp', label: 'WINXP' },
  { v: 'gameboy', label: 'GAMEBOY' },
];

const MODE_OPTIONS_LONG = {
  arcade: '90s ARCADE',
  win95: 'WIN 95 / Y2K',
  winxp: 'WINDOWS XP',
  gameboy: '8-BIT GAMEBOY',
};

export function ModeChip({ value, onChange, theme = 'arcade', long = false, disabled = false }) {
  return (
    <div className={`chip chip-mode chip-${theme} ${disabled ? 'is-disabled' : ''}`}>
      <span className="chip-label">MODE</span>
      <div className="chip-select-wrap">
        <select
          className="chip-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Select mode"
          disabled={disabled}
          title={disabled ? 'Mode locked — sender chose this view' : undefined}
        >
          {MODE_OPTIONS.map((o) => (
            <option key={o.v} value={o.v}>
              {long ? MODE_OPTIONS_LONG[o.v] : o.label}
            </option>
          ))}
        </select>
        <span className="chip-caret">▾</span>
      </div>
    </div>
  );
}

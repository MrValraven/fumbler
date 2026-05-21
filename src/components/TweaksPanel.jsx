import { useState } from 'react';
import './tweaksPanel.css';

export function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        className="twk-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open tweaks"
      >
        ⚙ Tweaks
      </button>
    );
  }

  return (
    <div className="twk-panel" data-noncommentable="">
      <div className="twk-hd">
        <b>{title}</b>
        <button
          type="button"
          className="twk-x"
          aria-label="Close tweaks"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
      </div>
      <div className="twk-body">{children}</div>
    </div>
  );
}

export function TweakSection({ title, children }) {
  return (
    <>
      <div className="twk-sect">{title}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children }) {
  return (
    <div className="twk-row">
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

export function TweakSlider({ label, value, min = 0, max = 100, step = 1, format, onChange }) {
  const displayed = format ? format(value) : value;
  return (
    <TweakRow label={label} value={displayed}>
      <input
        type="range"
        className="twk-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </TweakRow>
  );
}

export function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button
        type="button"
        className="twk-toggle"
        data-on={value ? '1' : '0'}
        role="switch"
        aria-checked={!!value}
        onClick={() => onChange(!value)}
      >
        <i />
      </button>
    </div>
  );
}

export function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select
        className="twk-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

export function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input
        className="twk-field"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </TweakRow>
  );
}

export function TweakButton({ label, onClick }) {
  return (
    <button type="button" className="twk-btn" onClick={onClick}>
      {label}
    </button>
  );
}

export function TweakDateTime({ label, value, onChange }) {
  return (
    <TweakRow label={label}>
      <input
        className="twk-field"
        type="datetime-local"
        value={value || ''}
        step={60}
        onChange={(e) => onChange(e.target.value)}
      />
    </TweakRow>
  );
}

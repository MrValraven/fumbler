// Audio system — looping chiptune, mute toggle, fanfare, coin SFX.
// Singleton — initialized lazily on first use; safe to import everywhere.

const MASTER_GAIN = 0.18;
const FILTER_OPEN = 18000;
const FILTER_SHUT = 200;
const TRANSITION_OUT = 0.5;
const TRANSITION_IN = 0.5;

const NOTE = {
  'C2': 65.41, 'F2': 87.31, 'G2': 98.0, 'A2': 110.0,
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.0,
  'A3': 220.0, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.0,
  'A4': 440.0, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99,
  'A5': 880.0, 'B5': 987.77,
  'C6': 1046.5,
  '-': 0,
};

const TRACKS = {
  arcade: {
    bpm: 132,
    melody: [
      ['A4', '-', 'C5', 'E5', '-', 'C5', 'A4', '-'],
      ['F4', '-', 'A4', 'C5', '-', 'A4', 'F4', '-'],
      ['C4', '-', 'E4', 'G4', '-', 'E4', 'C4', '-'],
      ['G4', '-', 'B4', 'D5', '-', 'B4', 'G4', '-'],
    ],
    bass: [
      ['A2', '-', '-', '-', 'A3', '-', '-', '-'],
      ['F2', '-', '-', '-', 'F3', '-', '-', '-'],
      ['C2', '-', '-', '-', 'C3', '-', '-', '-'],
      ['G2', '-', '-', '-', 'G3', '-', '-', '-'],
    ],
    melodyInst: 'square', melodyGain: 0.18,
    bassInst: 'triangle', bassGain: 0.30,
  },
  win95: {
    bpm: 96,
    melody: [
      ['C5', '-', '-', 'E5', '-', '-', 'G5', '-'],
      ['A4', '-', '-', 'C5', '-', '-', 'E5', '-'],
      ['F4', '-', '-', 'A4', '-', '-', 'C5', '-'],
      ['G4', '-', '-', 'B4', '-', '-', 'D5', '-'],
    ],
    bass: [
      ['C3', '-', '-', '-', '-', '-', 'G3', '-'],
      ['A2', '-', '-', '-', '-', '-', 'E3', '-'],
      ['F2', '-', '-', '-', '-', '-', 'C3', '-'],
      ['G2', '-', '-', '-', '-', '-', 'D3', '-'],
    ],
    melodyInst: 'sine', melodyGain: 0.24,
    bassInst: 'triangle', bassGain: 0.18,
  },
  winxp: {
    bpm: 84,
    melody: [
      ['G4', '-', '-', '-', 'C5', '-', 'E5', '-'],
      ['F4', '-', '-', '-', 'A4', '-', 'C5', '-'],
      ['E4', '-', '-', '-', 'G4', '-', 'B4', '-'],
      ['G4', '-', '-', '-', 'D5', '-', 'G5', '-'],
    ],
    bass: [
      ['C3', '-', '-', '-', '-', '-', '-', '-'],
      ['F3', '-', '-', '-', '-', '-', '-', '-'],
      ['A3', '-', '-', '-', '-', '-', '-', '-'],
      ['G3', '-', '-', '-', '-', '-', '-', '-'],
    ],
    melodyInst: 'sine', melodyGain: 0.22,
    bassInst: 'sine', bassGain: 0.18,
  },
  gameboy: {
    bpm: 118,
    melody: [
      ['C5', 'E5', 'G5', 'C6', 'G5', 'E5', 'C5', 'E5'],
      ['G4', 'B4', 'D5', 'G5', 'D5', 'B4', 'G4', 'B4'],
      ['A4', 'C5', 'E5', 'A5', 'E5', 'C5', 'A4', 'C5'],
      ['F4', 'A4', 'C5', 'F5', 'C5', 'A4', 'F4', 'A4'],
    ],
    bass: [
      ['C3', '-', 'G3', '-', 'C3', '-', 'G3', '-'],
      ['G3', '-', 'D4', '-', 'G3', '-', 'D4', '-'],
      ['A3', '-', 'E4', '-', 'A3', '-', 'E4', '-'],
      ['F3', '-', 'C4', '-', 'F3', '-', 'C4', '-'],
    ],
    melodyInst: 'square', melodyGain: 0.14,
    bassInst: 'square', bassGain: 0.20,
  },
  'arcade-lockin': {
    bpm: 112,
    melody: [
      ['C5', 'E5', 'G5', 'C6', '-', 'G5', 'C6', '-'],
      ['C5', 'F5', 'A5', 'C6', '-', 'A5', 'C6', '-'],
      ['B4', 'D5', 'G5', 'B5', '-', 'G5', 'B5', '-'],
      ['C5', 'E5', 'G5', 'C6', 'C6', 'C6', '-', '-'],
    ],
    bass: [
      ['C3', '-', '-', '-', 'G3', '-', '-', '-'],
      ['F3', '-', '-', '-', 'C4', '-', '-', '-'],
      ['G3', '-', '-', '-', 'D4', '-', '-', '-'],
      ['C3', '-', 'C3', '-', 'C3', '-', '-', '-'],
    ],
    melodyInst: 'square', melodyGain: 0.22,
    bassInst: 'square', bassGain: 0.22,
  },
  'win95-lockin': {
    bpm: 84,
    melody: [
      ['C5', '-', 'E5', '-', 'G5', '-', 'C6', '-'],
      ['-', '-', 'G5', '-', '-', '-', 'C6', '-'],
      ['-', '-', 'E5', '-', '-', '-', 'G5', '-'],
      ['C5', '-', 'G5', '-', 'C6', '-', '-', '-'],
    ],
    bass: [
      ['C3', '-', '-', '-', '-', '-', '-', '-'],
      ['F3', '-', '-', '-', '-', '-', '-', '-'],
      ['G3', '-', '-', '-', '-', '-', '-', '-'],
      ['C3', '-', '-', '-', '-', '-', '-', '-'],
    ],
    melodyInst: 'sine', melodyGain: 0.30,
    bassInst: 'sine', bassGain: 0.16,
  },
  'winxp-lockin': {
    bpm: 100,
    melody: [
      ['C5', '-', 'E5', 'G5', 'C6', '-', '-', '-'],
      ['B4', '-', 'D5', 'G5', 'C6', '-', '-', '-'],
      ['G4', '-', 'C5', 'E5', 'G5', '-', '-', '-'],
      ['C5', '-', 'E5', 'G5', 'C6', 'C6', '-', '-'],
    ],
    bass: [
      ['C3', '-', '-', '-', 'G3', '-', '-', '-'],
      ['G3', '-', '-', '-', 'D4', '-', '-', '-'],
      ['C3', '-', '-', '-', 'G3', '-', '-', '-'],
      ['C3', '-', '-', '-', 'C3', '-', '-', '-'],
    ],
    melodyInst: 'sine', melodyGain: 0.28,
    bassInst: 'triangle', bassGain: 0.18,
  },
  'gameboy-lockin': {
    bpm: 118,
    melody: [
      ['C5', 'D5', 'E5', 'G5', 'C6', '-', 'G5', 'C6'],
      ['G4', 'A4', 'B4', 'D5', 'G5', '-', 'D5', 'G5'],
      ['A4', 'B4', 'C5', 'E5', 'A5', '-', 'E5', 'A5'],
      ['C5', 'E5', 'G5', 'C6', 'C6', '-', '-', '-'],
    ],
    bass: [
      ['C3', '-', 'G3', '-', 'C3', '-', 'G3', '-'],
      ['G3', '-', 'D4', '-', 'G3', '-', 'D4', '-'],
      ['A3', '-', 'E4', '-', 'A3', '-', 'E4', '-'],
      ['C3', '-', 'G3', '-', 'C3', '-', '-', '-'],
    ],
    melodyInst: 'square', melodyGain: 0.18,
    bassInst: 'square', bassGain: 0.22,
  },
  'arcade-logout': {
    bpm: 76,
    melody: [
      ['A4', '-', '-', '-', 'G4', '-', '-', '-'],
      ['F4', '-', '-', '-', 'E4', '-', '-', '-'],
      ['D4', '-', '-', '-', 'C4', '-', '-', '-'],
      ['A3', '-', '-', '-', '-', '-', '-', '-'],
    ],
    bass: [
      ['A2', '-', '-', '-', '-', '-', '-', '-'],
      ['F2', '-', '-', '-', '-', '-', '-', '-'],
      ['C2', '-', '-', '-', '-', '-', '-', '-'],
      ['A2', '-', '-', '-', '-', '-', '-', '-'],
    ],
    melodyInst: 'sawtooth', melodyGain: 0.18,
    bassInst: 'triangle', bassGain: 0.30,
  },
  'win95-logout': {
    bpm: 60,
    melody: [
      ['G4', '-', '-', '-', '-', '-', 'D4', '-'],
      ['A3', '-', '-', '-', '-', '-', 'D3', '-'],
      ['G3', '-', '-', '-', '-', '-', '-', '-'],
      ['D3', '-', '-', '-', '-', '-', '-', '-'],
    ],
    bass: [
      ['G2', '-', '-', '-', '-', '-', '-', '-'],
      ['F2', '-', '-', '-', '-', '-', '-', '-'],
      ['G2', '-', '-', '-', '-', '-', '-', '-'],
      ['C2', '-', '-', '-', '-', '-', '-', '-'],
    ],
    melodyInst: 'sawtooth', melodyGain: 0.20,
    bassInst: 'sine', bassGain: 0.22,
  },
  'winxp-logout': {
    bpm: 56,
    melody: [
      ['G4', '-', '-', '-', '-', '-', '-', '-'],
      ['E4', '-', '-', '-', '-', '-', '-', '-'],
      ['C4', '-', '-', '-', '-', '-', '-', '-'],
      ['G3', '-', '-', '-', '-', '-', '-', '-'],
    ],
    bass: [
      ['C3', '-', '-', '-', '-', '-', '-', '-'],
      ['A2', '-', '-', '-', '-', '-', '-', '-'],
      ['F2', '-', '-', '-', '-', '-', '-', '-'],
      ['C2', '-', '-', '-', '-', '-', '-', '-'],
    ],
    melodyInst: 'sine', melodyGain: 0.28,
    bassInst: 'sine', bassGain: 0.22,
  },
  'gameboy-logout': {
    bpm: 84,
    melody: [
      ['C5', '-', 'B4', '-', 'A4', '-', 'G4', '-'],
      ['F4', '-', 'E4', '-', 'D4', '-', 'C4', '-'],
      ['B3', '-', 'A3', '-', 'G3', '-', 'F3', '-'],
      ['E3', '-', '-', '-', '-', '-', '-', '-'],
    ],
    bass: [
      ['C3', '-', '-', '-', '-', '-', '-', '-'],
      ['F3', '-', '-', '-', '-', '-', '-', '-'],
      ['G3', '-', '-', '-', '-', '-', '-', '-'],
      ['C3', '-', '-', '-', '-', '-', '-', '-'],
    ],
    melodyInst: 'square', melodyGain: 0.16,
    bassInst: 'triangle', bassGain: 0.22,
  },
};

let _ctx = null;
let _master = null;
let _filter = null;
let _muted = (() => {
  try {
    const v = localStorage.getItem('fumble:muted');
    return v === null ? true : v === '1';
  } catch { return true; }
})();
let _trackKey = (() => {
  try { return localStorage.getItem('fumble:mode') || 'arcade'; }
  catch { return 'arcade'; }
})();
let _override = null;
let _scheduler = null;
let _nextBarTime = 0;
let _bar = 0;
let _started = false;
let _listenersBound = false;

function ctx() {
  if (typeof window === 'undefined') return null;
  if (!_ctx) {
    try { _ctx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch { return null; }
  }
  return _ctx;
}

function master() {
  if (_master) return _master;
  const c = ctx();
  if (!c) return null;
  _master = c.createGain();
  _filter = c.createBiquadFilter();
  _filter.type = 'lowpass';
  _filter.frequency.value = FILTER_OPEN;
  _filter.Q.value = 0.7;
  _master.connect(_filter).connect(c.destination);
  _master.gain.value = _muted ? 0 : MASTER_GAIN;
  return _master;
}

function currentTrack() {
  if (_override && TRACKS[_override]) return TRACKS[_override];
  return TRACKS[_trackKey] || TRACKS.arcade;
}

function playNote(when, freq, dur, { type = 'square', gain = 0.4 } = {}) {
  if (!freq) return;
  const c = ctx();
  if (!c) return;
  const m = master();
  if (!m) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, when);
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(gain, when + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  osc.connect(g).connect(m);
  osc.start(when);
  osc.stop(when + dur + 0.02);
}

function sixteenth() { return (60 / currentTrack().bpm) / 4; }
function barLen() { return sixteenth() * 8; }

function scheduleBar() {
  const trk = currentTrack();
  const sx = sixteenth();
  const t0 = _nextBarTime;
  const bar = _bar % trk.melody.length;
  const melodyRow = trk.melody[bar];
  const bassRow = trk.bass[bar];
  for (let i = 0; i < 8; i++) {
    const tn = t0 + i * sx;
    playNote(tn, NOTE[melodyRow[i]], sx * 1.5, { type: trk.melodyInst, gain: trk.melodyGain });
    playNote(tn, NOTE[bassRow[i]], sx * 1.5, { type: trk.bassInst, gain: trk.bassGain });
  }
  _nextBarTime += barLen();
  _bar += 1;
}

function tick() {
  const c = ctx();
  if (!c) return;
  while (_nextBarTime < c.currentTime + 0.3) scheduleBar();
}

function startMusic() {
  if (_muted) return;
  const c = ctx();
  if (!c || c.state === 'suspended') return;
  if (_started) return;
  _started = true;
  _nextBarTime = c.currentTime + 0.1;
  _bar = 0;
  if (_scheduler) clearInterval(_scheduler);
  _scheduler = setInterval(tick, 80);
}

function stopMusic() {
  _started = false;
  if (_scheduler) { clearInterval(_scheduler); _scheduler = null; }
}

function transition(swap) {
  const c = ctx();
  if (!c || c.state !== 'running' || !_started) {
    swap();
    return;
  }
  const t = c.currentTime;
  if (_master) {
    _master.gain.cancelScheduledValues(t);
    _master.gain.setValueAtTime(_master.gain.value || MASTER_GAIN, t);
    _master.gain.exponentialRampToValueAtTime(0.0001, t + TRANSITION_OUT);
  }
  if (_filter) {
    _filter.frequency.cancelScheduledValues(t);
    _filter.frequency.setValueAtTime(_filter.frequency.value, t);
    _filter.frequency.exponentialRampToValueAtTime(FILTER_SHUT, t + TRANSITION_OUT);
  }
  setTimeout(() => {
    stopMusic();
    swap();
    if (_muted) return;
    const c2 = ctx();
    if (!c2 || c2.state !== 'running') return;
    startMusic();
    const t2 = c2.currentTime;
    if (_master) {
      _master.gain.cancelScheduledValues(t2);
      _master.gain.setValueAtTime(0.0001, t2);
      _master.gain.exponentialRampToValueAtTime(MASTER_GAIN, t2 + TRANSITION_IN);
    }
    if (_filter) {
      _filter.frequency.cancelScheduledValues(t2);
      _filter.frequency.setValueAtTime(FILTER_SHUT, t2);
      _filter.frequency.exponentialRampToValueAtTime(FILTER_OPEN, t2 + TRANSITION_IN);
    }
  }, TRANSITION_OUT * 1000);
}

export function isMuted() { return _muted; }

export function setMuted(v) {
  _muted = !!v;
  try { localStorage.setItem('fumble:muted', _muted ? '1' : '0'); } catch {}
  if (_master) {
    const c = ctx();
    if (c) {
      const t = c.currentTime;
      _master.gain.cancelScheduledValues(t);
      _master.gain.setValueAtTime(_muted ? 0 : MASTER_GAIN, t);
    }
  }
  if (_muted) stopMusic(); else startMusic();
}

export function setTrack(key) {
  if (!TRACKS[key] || key === _trackKey) return;
  transition(() => {
    _trackKey = key;
    try { localStorage.setItem('fumble:track', key); } catch {}
  });
}

export function setOverride(key) {
  if (key && !TRACKS[key]) return;
  if (key === _override) return;
  transition(() => { _override = key; });
}

export function sfxLockIn() {
  if (_muted) return;
  const c = ctx(); if (!c) return;
  const t = c.currentTime;
  [523, 659, 784, 1047].forEach((f, i) => playNote(t + i * 0.07, f, 0.10, { gain: 0.35 }));
}

export function sfxLogOut() {
  if (_muted) return;
  const c = ctx(); if (!c) return;
  const t = c.currentTime;
  [392, 311, 220].forEach((f, i) => playNote(t + i * 0.11, f, 0.18, { gain: 0.35, type: 'sawtooth' }));
}

export function sfxBlip() {
  if (_muted) return;
  const c = ctx(); if (!c) return;
  playNote(c.currentTime, 880, 0.05, { gain: 0.30 });
}

export function sfxCoin() {
  if (_muted) return;
  const c = ctx(); if (!c) return;
  const t = c.currentTime;
  playNote(t, 988, 0.08, { gain: 0.35 });
  playNote(t + 0.09, 1319, 0.18, { gain: 0.35 });
}

export function sfxFanfare() {
  if (_muted) return;
  const c = ctx(); if (!c) return;
  const t = c.currentTime;
  [523, 659, 784, 1047, 880, 1047, 1319].forEach((f, i) => playNote(t + i * 0.09, f, 0.12, { gain: 0.32 }));
}

export function sfxSiren() {
  if (_muted) return;
  const c = ctx(); if (!c) return;
  const m = master();
  if (!m) return;
  const t0 = c.currentTime;
  const wail = (off) => {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, t0 + off);
    osc.frequency.exponentialRampToValueAtTime(880, t0 + off + 0.4);
    osc.frequency.exponentialRampToValueAtTime(440, t0 + off + 0.8);
    g.gain.setValueAtTime(0.0001, t0 + off);
    g.gain.exponentialRampToValueAtTime(0.25, t0 + off + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + off + 0.8);
    osc.connect(g).connect(m);
    osc.start(t0 + off);
    osc.stop(t0 + off + 0.85);
  };
  wail(0);
  wail(0.9);
}

function ensureStarted() {
  if (_muted) return;
  const c = ctx();
  if (!c) return;
  if (c.state === 'suspended') c.resume().then(() => startMusic());
  else startMusic();
}

export function bindAutoStart() {
  if (_listenersBound || typeof window === 'undefined') return;
  _listenersBound = true;
  ['click', 'keydown', 'touchstart'].forEach((ev) => {
    window.addEventListener(ev, ensureStarted, { passive: true });
  });
}

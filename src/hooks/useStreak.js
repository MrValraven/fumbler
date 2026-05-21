import { useCallback, useEffect, useState } from 'react';

function readStreak() {
  try {
    const raw = localStorage.getItem('fumble:streak');
    return raw ? JSON.parse(raw) : { lastSeen: null, streak: 0, fumbles: 0 };
  } catch {
    return { lastSeen: null, streak: 0, fumbles: 0 };
  }
}

function writeStreak(s) {
  try { localStorage.setItem('fumble:streak', JSON.stringify(s)); } catch {}
}

export function useStreak() {
  const [state, setState] = useState(readStreak);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const last = state.lastSeen ? state.lastSeen.slice(0, 10) : null;
    if (last !== today) {
      const next = { ...state, lastSeen: new Date().toISOString(), streak: state.streak + 1 };
      writeStreak(next);
      setState(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recordFumble = useCallback(() => {
    setState((s) => {
      const next = { ...s, streak: 0, fumbles: s.fumbles + 1, lastSeen: new Date().toISOString() };
      writeStreak(next);
      return next;
    });
  }, []);

  const recordLockIn = useCallback(() => {
    setState((s) => {
      const next = { ...s, streak: s.streak + 1, lastSeen: new Date().toISOString() };
      writeStreak(next);
      return next;
    });
  }, []);

  return { ...state, recordFumble, recordLockIn };
}

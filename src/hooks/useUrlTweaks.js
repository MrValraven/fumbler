import { useCallback, useEffect, useRef, useState } from 'react';

// Keys we own in the URL. Other params (e.g. ?as=her, which is read at mount
// by getViewMode) are preserved on every write.
function ownedKeys(defaults) {
  return Object.keys(defaults);
}

function coerce(raw, defaultValue) {
  if (typeof defaultValue === 'boolean') return raw === '1' || raw === 'true';
  if (typeof defaultValue === 'number') {
    const n = Number(raw);
    return Number.isFinite(n) ? n : defaultValue;
  }
  return raw;
}

function encode(value) {
  if (typeof value === 'boolean') return value ? '1' : '0';
  return String(value);
}

function readFromUrl(defaults) {
  if (typeof window === 'undefined') return defaults;
  const params = new URLSearchParams(window.location.search);
  const out = { ...defaults };
  for (const key of ownedKeys(defaults)) {
    if (params.has(key)) out[key] = coerce(params.get(key), defaults[key]);
  }
  return out;
}

function writeToUrl(values, defaults) {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  for (const key of ownedKeys(defaults)) {
    const v = values[key];
    // Drop keys that match the default (or are empty strings) so URLs stay short.
    const isDefault = v === defaults[key];
    const isEmptyString = typeof v === 'string' && v === '';
    if (isDefault || isEmptyString) {
      params.delete(key);
    } else {
      params.set(key, encode(v));
    }
  }
  const qs = params.toString();
  const next = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`;
  if (next !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    window.history.replaceState(null, '', next);
  }
}

export function useUrlTweaks(defaults) {
  const defaultsRef = useRef(defaults);
  const [values, setValues] = useState(() => readFromUrl(defaults));

  const setTweak = useCallback((keyOrEdits, val) => {
    const edits =
      typeof keyOrEdits === 'object' && keyOrEdits !== null
        ? keyOrEdits
        : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
  }, []);

  // Sync state → URL whenever values change. Keeping this in an effect (vs.
  // inside the setState updater) avoids React 19 StrictMode running the side
  // effect twice and keeps the updater pure.
  useEffect(() => {
    writeToUrl(values, defaultsRef.current);
  }, [values]);

  // Reflect back/forward navigation if the user changes the URL manually.
  useEffect(() => {
    const onPop = () => setValues(readFromUrl(defaultsRef.current));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return [values, setTweak];
}

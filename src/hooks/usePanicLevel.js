import { useEffect, useMemo, useRef, useState } from 'react';
import { sfxSiren } from '../audio/audioEngine.js';

// 0 = chill, 1 = soft panic (<24h), 2 = full panic (<1h), 3 = expired.
export function usePanicLevel(targetISO) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const diff = t - now;
  let level = 0;
  if (diff <= 0) level = 3;
  else if (diff < 60 * 60 * 1000) level = 2;
  else if (diff < 24 * 60 * 60 * 1000) level = 1;

  const lastLevel = useRef(level);
  useEffect(() => {
    if (level > lastLevel.current && level >= 2) sfxSiren();
    lastLevel.current = level;
  }, [level]);

  return level;
}

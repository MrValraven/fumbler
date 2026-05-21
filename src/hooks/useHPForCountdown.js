import { useEffect, useRef, useState } from 'react';
import { sfxCoin } from '../audio/audioEngine.js';

const HP_HORIZON_MS = 1000 * 60 * 60 * 24 * 3;

export function useHPForCountdown(targetISO) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = new Date(targetISO).getTime();
  const remaining = Math.max(0, t - now);
  return Math.max(0, Math.min(100, Math.round((remaining / HP_HORIZON_MS) * 100)));
}

export function useCoinAtOneHour(targetISO) {
  const firedRef = useRef(false);
  useEffect(() => {
    if (firedRef.current) return undefined;
    const check = () => {
      const remaining = new Date(targetISO).getTime() - Date.now();
      if (remaining > 0 && remaining < 60 * 60 * 1000 && !firedRef.current) {
        sfxCoin();
        firedRef.current = true;
      }
    };
    check();
    const id = setInterval(check, 5000);
    return () => clearInterval(id);
  }, [targetISO]);
}

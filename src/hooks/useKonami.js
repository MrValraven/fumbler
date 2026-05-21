import { useEffect } from 'react';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

export function useKonami(onUnlock) {
  useEffect(() => {
    const buf = [];
    const handler = (e) => {
      buf.push(e.code);
      if (buf.length > KONAMI.length) buf.shift();
      if (KONAMI.every((k, i) => buf[i] === k)) {
        buf.length = 0;
        onUnlock && onUnlock();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onUnlock]);
}

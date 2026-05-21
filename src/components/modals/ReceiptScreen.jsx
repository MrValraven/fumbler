import { ArcadeReceipt } from './ArcadeReceipt.jsx';
import { Win95Receipt } from './Win95Receipt.jsx';
import { WinXPReceipt } from './WinXPReceipt.jsx';
import { GameboyReceipt } from './GameboyReceipt.jsx';

export function ReceiptScreen({ name, intensity, mode = 'arcade', onClose }) {
  if (mode === 'win95') return <Win95Receipt name={name} intensity={intensity} onClose={onClose} />;
  if (mode === 'winxp') return <WinXPReceipt name={name} intensity={intensity} onClose={onClose} />;
  if (mode === 'gameboy') return <GameboyReceipt name={name} intensity={intensity} onClose={onClose} />;
  return <ArcadeReceipt name={name} intensity={intensity} onClose={onClose} />;
}

import { ArcadeRoast } from './ArcadeRoast.jsx';
import { Win95Roast } from './Win95Roast.jsx';
import { WinXPRoast } from './WinXPRoast.jsx';
import { GameboyRoast } from './GameboyRoast.jsx';

export function RoastScreen({ name, intensity, mode = 'arcade', onClose }) {
  if (mode === 'win95') return <Win95Roast name={name} intensity={intensity} onClose={onClose} />;
  if (mode === 'winxp') return <WinXPRoast name={name} intensity={intensity} onClose={onClose} />;
  if (mode === 'gameboy') return <GameboyRoast name={name} intensity={intensity} onClose={onClose} />;
  return <ArcadeRoast name={name} intensity={intensity} onClose={onClose} />;
}

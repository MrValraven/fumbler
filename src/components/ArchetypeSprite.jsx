import { PixelArt } from './PixelArt.jsx';
import { ACCESSORIES } from '../data/characters.js';

export function ArchetypeSprite({ base, palette, accessoryKey, scale = 5, style = {} }) {
  const accessory = accessoryKey ? ACCESSORIES[accessoryKey] : null;
  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }}>
      <PixelArt data={base} palette={palette} scale={scale} />
      {accessory ? (
        <PixelArt
          data={accessory.data}
          palette={accessory.palette}
          scale={scale}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      ) : null}
    </div>
  );
}

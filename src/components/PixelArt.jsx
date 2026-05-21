export function PixelArt({ data, palette, scale = 6, style = {}, className = '' }) {
  const w = data[0].length;
  const h = data.length;
  const cells = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const ch = data[y][x];
      const c = palette[ch];
      if (c) {
        cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={c} />);
      }
    }
  }
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      shapeRendering="crispEdges"
      style={{ display: 'block', imageRendering: 'pixelated', ...style }}
      className={className}
    >
      {cells}
    </svg>
  );
}

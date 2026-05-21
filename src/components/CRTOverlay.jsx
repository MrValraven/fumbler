export function CRTOverlay({ curvature = true, intensity = 1 }) {
  return (
    <>
      <div className="crt-scanlines" style={{ opacity: 0.35 * intensity }} />
      <div className="crt-rgb" style={{ opacity: 0.25 * intensity }} />
      <div className="crt-flicker" />
      {curvature ? <div className="crt-vignette" /> : null}
      <div className="crt-glitch" />
    </>
  );
}

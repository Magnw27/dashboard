import backgroundUrl from '../../assets/background.webp';

export function AnimatedBackground() {
  return (
    <div className="background-layer" aria-hidden="true">
      <img src={backgroundUrl} alt="" className="backdrop-image" />
      <div className="backdrop-shade" />
      <div className="backdrop-grid" />
      <div className="mesh-gradient mesh-a" />
      <div className="mesh-gradient mesh-b" />
      <div className="mesh-gradient mesh-c" />
      <div className="energy-beam beam-a" />
      <div className="energy-beam beam-b" />
      <div className="noise-layer" />
      <div className="pointer-glow" />
      <div className="vignette" />
    </div>
  );
}

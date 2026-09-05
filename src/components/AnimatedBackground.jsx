import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="background-layer" aria-hidden="true">
      <motion.img
        src="/assets/background.webp"
        alt=""
        className="backdrop-image"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1.04, opacity: 1 }}
        transition={{ opacity: { duration: 1 }, scale: { duration: 2.2, ease: [0.22, 1, 0.36, 1] } }}
      />
      <div className="backdrop-shade" />
      <div className="backdrop-grid" />
      <div className="mesh-gradient mesh-a" />
      <div className="mesh-gradient mesh-b" />
      <div className="mesh-gradient mesh-c" />
      <div className="noise-layer" />
      <div className="pointer-glow" />
    </div>
  );
}

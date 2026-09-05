import { motion } from 'framer-motion';
import backgroundUrl from '../../assets/background.webp';

export function AnimatedBackground() {
  return (
    <div className="background-layer" aria-hidden="true">
      <motion.img
        src={backgroundUrl}
        alt=""
        className="backdrop-image"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1.04, opacity: 1 }}
        transition={{ opacity: { duration: 1.1 }, scale: { duration: 2.4, ease: [0.22, 1, 0.36, 1] } }}
      />
      <div className="backdrop-shade" />
      <div className="backdrop-grid" />
      <div className="mesh-gradient mesh-a" />
      <div className="mesh-gradient mesh-b" />
      <div className="mesh-gradient mesh-c" />
      <motion.div className="energy-beam beam-a" animate={{ x: ['-8%', '10%', '-8%'], opacity: [0.08, 0.18, 0.08] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="energy-beam beam-b" animate={{ x: ['8%', '-8%', '8%'], opacity: [0.05, 0.13, 0.05] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="noise-layer" />
      <div className="pointer-glow" />
      <div className="vignette" />
    </div>
  );
}

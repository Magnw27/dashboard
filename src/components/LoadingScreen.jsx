import { AnimatePresence, motion } from 'framer-motion';

export function LoadingScreen({ visible, progress }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="loader-orb orb-one" />
          <div className="loader-orb orb-two" />
          <motion.div className="loader-core" initial={{ scale: 0.84, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.08, duration: 0.8 }}>
            <div className="loader-ring" />
            <div className="loader-mark">L<span>/</span>C</div>
            <div className="loader-label">INITIALIZING PORTFOLIO</div>
          </motion.div>
          <div className="loader-progress-wrap">
            <div className="loader-meta"><span>BOOT SEQUENCE</span><strong>{progress}%</strong></div>
            <div className="loader-track"><motion.div className="loader-fill" animate={{ width: `${progress}%` }} transition={{ ease: 'easeOut', duration: 0.2 }} /></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

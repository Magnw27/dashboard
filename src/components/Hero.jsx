import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export function Hero({ onNavigate }) {
  const lines = ['Muhammad', 'Arif', 'Wicaksono'];

  return (
    <section className="hero shell" id="about">
      <motion.div className="hero-copy" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } } }}>
        <motion.p className="eyebrow" variants={{ hidden: { opacity: 0, y: 20, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } } }}>
          <span /> OPEN SOURCE / PERSONAL WORKSPACE
        </motion.p>
        <h1 className="hero-title" aria-label="Muhammad Arif Wicaksono">
          {lines.map((line, index) => <motion.span key={line} className={`title-line ${index === 1 ? 'accent' : ''}`} variants={{ hidden: { opacity: 0, y: 42, filter: 'blur(12px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease } } }}>{line}</motion.span>)}
        </h1>
        <motion.p className="hero-description" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>
          A clean index of projects, experiments, and tools — built to be explored, reused, and improved.
        </motion.p>
        <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>
          <motion.button className="btn btn-primary" type="button" onClick={() => onNavigate('projects')} whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.985 }}>
            Explore projects <span>↓</span>
          </motion.button>
          <motion.a className="btn btn-ghost" href="https://github.com/Magnw27" target="_blank" rel="noreferrer" whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.985 }}>
            GitHub <span>↗</span>
          </motion.a>
        </motion.div>
      </motion.div>
      <motion.aside className="hero-aside" initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} transition={{ delay: 1.1, duration: 0.8, ease }}>
        <div className="aside-index">01 — 04</div>
        <p>Building interfaces and software with a preference for simple tools, strong fundamentals, and things that feel good to use.</p>
        <div className="aside-rule" />
        <div className="aside-meta"><span>Based in Indonesia</span><span>Open-source minded</span></div>
      </motion.aside>
    </section>
  );
}

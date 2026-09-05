import { motion } from 'framer-motion';

export function Navbar({ audioOn, onAudioToggle, scrolled }) {
  return (
    <motion.header className={`nav ${scrolled ? 'is-scrolled' : ''}`} initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
      <a href="#top" className="brand" aria-label="LIPZCODE home"><span className="brand-box">L</span><span className="brand-text">LIPZCODE</span></a>
      <nav className="nav-links" aria-label="Navigasi utama">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="https://github.com/Magnw27" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
      </nav>
      <motion.button className={`nav-tool ${audioOn ? 'is-on' : ''}`} type="button" onClick={onAudioToggle} aria-pressed={audioOn} whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <span className="audio-dot" /> {audioOn ? 'Sound on' : 'Sound'}
      </motion.button>
    </motion.header>
  );
}

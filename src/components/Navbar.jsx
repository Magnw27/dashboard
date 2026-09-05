import { motion } from 'framer-motion';

export function Navbar({ audioState, onAudioToggle, scrolled, onNavigate }) {
  const audioLabel = audioState === 'on'
    ? 'Sound on'
    : audioState === 'loading'
      ? 'Loading sound'
      : audioState === 'error'
        ? 'Sound unavailable'
        : 'Sound';

  const audioBusy = audioState === 'loading';

  return (
    <motion.header id="nav" className={`nav ${scrolled ? 'is-scrolled' : ''}`} initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
      <button className="brand nav-jump" type="button" onClick={() => onNavigate('top')} aria-label="LIPZCODE home">
        <span className="brand-box">L</span><span className="brand-text">LIPZCODE</span>
      </button>
      <nav className="nav-links" aria-label="Navigasi utama">
        <button type="button" onClick={() => onNavigate('about')}>About</button>
        <button type="button" onClick={() => onNavigate('projects')}>Projects</button>
        <a href="https://github.com/Magnw27" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
      </nav>
      <motion.button
        className={`nav-tool ${audioState === 'on' ? 'is-on' : ''} ${audioState === 'loading' ? 'is-loading' : ''} ${audioState === 'error' ? 'is-error' : ''}`}
        type="button"
        onClick={onAudioToggle}
        aria-pressed={audioState === 'on'}
        aria-busy={audioBusy}
        aria-label={audioLabel}
        disabled={audioBusy}
        whileHover={audioBusy ? undefined : { y: -2, scale: 1.02 }}
        whileTap={audioBusy ? undefined : { scale: 0.98 }}
      >
        <span className="audio-dot" /> {audioLabel}
      </motion.button>
    </motion.header>
  );
}

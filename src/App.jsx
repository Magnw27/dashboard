import { useEffect, useRef, useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutProfile } from './components/AboutProfile';
import { Stats } from './components/Stats';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { projects } from './data/projects';
import { usePointerScene } from './hooks/usePointerScene';
import './styles/app.css';
import './styles/premium.css';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [audioState, setAudioState] = useState('off');
  const [scrolled, setScrolled] = useState(false);
  const audioRef = useRef(null);
  usePointerScene();

  const scrollToId = id => {
    const target = document.getElementById(id);
    if (!target) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nav = document.getElementById('nav');
    const offset = Math.max((nav?.getBoundingClientRect().height || 64) + 24, 88);
    const top = Math.max(target.getBoundingClientRect().top + window.scrollY - offset, 0);
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let timeout = 0;
    const tick = now => {
      const next = Math.min(Math.round(((now - start) / 1100) * 100), 100);
      setProgress(next);
      if (next < 100) raf = requestAnimationFrame(tick);
      else timeout = window.setTimeout(() => setLoading(false), 420);
    };
    raf = requestAnimationFrame(tick);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); clearTimeout(timeout); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    const onKey = event => {
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        event.preventDefault();
        document.querySelector('.search-box input')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.62;
    const onError = () => setAudioState('error');
    const onPause = () => setAudioState(prev => prev === 'error' ? 'error' : 'off');
    const onPlay = () => setAudioState('on');
    audio.addEventListener('error', onError);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);
    return () => { audio.removeEventListener('error', onError); audio.removeEventListener('pause', onPause); audio.removeEventListener('play', onPlay); };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setAudioState('error');
    }
  };

  return (
    <>
      <LoadingScreen visible={loading} progress={progress} />
      <AnimatedBackground />
      <div className="scroll-progress"><span /></div>
      <Navbar audioState={audioState} onAudioToggle={toggleAudio} scrolled={scrolled} onNavigate={scrollToId} />
      <main id="top">
        <Hero onNavigate={scrollToId} />
        <AboutProfile onNavigate={scrollToId} />
        <Stats projects={projects} />
        <ProjectsSection projects={projects} />
      </main>
      <Footer />
      <audio ref={audioRef} preload="auto" loop src="/assets/suara.mp3" />
    </>
  );
}

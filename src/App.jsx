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

const AUDIO_SRC = '/assets/suara.mp3';
const AUDIO_STORAGE_KEY = 'lipzcode-sound-enabled';

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
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = event => {
      if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        event.preventDefault();
        document.querySelector('.search-box input')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    audio.volume = 0.62;
    audio.preload = 'auto';

    const onError = () => setAudioState('error');
    const onLoadStart = () => setAudioState(prev => prev === 'on' ? prev : 'loading');
    const onCanPlay = () => setAudioState(prev => prev === 'on' ? prev : 'off');
    const onPause = () => setAudioState(prev => prev === 'error' ? 'error' : 'off');
    const onPlay = () => setAudioState('on');
    const onEnded = () => {
      if (!audio.loop) setAudioState('off');
    };

    audio.addEventListener('error', onError);
    audio.addEventListener('loadstart', onLoadStart);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('ended', onEnded);
    audio.load();

    return () => {
      audio.removeEventListener('error', onError);
      audio.removeEventListener('loadstart', onLoadStart);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        setAudioState('loading');
        if (audio.error) {
          audio.src = AUDIO_SRC;
          audio.load();
        }
        await audio.play();
        localStorage.setItem(AUDIO_STORAGE_KEY, '1');
        setAudioState('on');
      } else {
        audio.pause();
        localStorage.setItem(AUDIO_STORAGE_KEY, '0');
        setAudioState('off');
      }
    } catch (error) {
      console.warn('Sound could not start:', error);
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
      <audio ref={audioRef} preload="auto" loop src={AUDIO_SRC} aria-hidden="true" />
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { projects } from './data/projects';
import { usePointerScene } from './hooks/usePointerScene';
import './styles/app.css';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [audioOn, setAudioOn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const audioRef = useRef(null);
  usePointerScene();

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = now => {
      const next = Math.min(Math.round(((now - start) / 1250) * 100), 100);
      setProgress(next);
      if (next < 100) raf = requestAnimationFrame(tick);
      else window.setTimeout(() => setLoading(false), 350);
    };
    raf = requestAnimationFrame(tick);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
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

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await audio.play();
        setAudioOn(true);
      } else {
        audio.pause();
        setAudioOn(false);
      }
    } catch {
      setAudioOn(false);
    }
  };

  return (
    <>
      <LoadingScreen visible={loading} progress={progress} />
      <AnimatedBackground />
      <div className="scroll-progress"><span /></div>
      <Navbar audioOn={audioOn} onAudioToggle={toggleAudio} scrolled={scrolled} />
      <main id="top">
        <Hero />
        <Stats projects={projects} />
        <ProjectsSection projects={projects} />
      </main>
      <Footer />
      <audio ref={audioRef} preload="none" loop src="/assets/suara.mp3" />
    </>
  );
}

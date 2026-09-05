import { useEffect } from 'react';

export function usePointerScene() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer:fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;

    if (reduced) {
      root.style.setProperty('--scroll-ratio', '0');
      return undefined;
    }

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const render = () => {
      frame = 0;
      root.style.setProperty('--pointer-x', pointerX.toFixed(4));
      root.style.setProperty('--pointer-y', pointerY.toFixed(4));
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty('--scroll-ratio', Math.min(window.scrollY / max, 1).toFixed(4));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointer = event => {
      if (!fine) return;
      pointerX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      pointerY = event.clientY / Math.max(window.innerHeight, 1) - 0.35;
      schedule();
    };

    root.style.setProperty('--pointer-x', '0');
    root.style.setProperty('--pointer-y', '0');
    render();
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

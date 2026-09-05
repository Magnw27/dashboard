import { useEffect } from 'react';

export function usePointerScene() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer:fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    if (reduced) return undefined;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let running = true;

    const tick = () => {
      frame = 0;
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      root.style.setProperty('--pointer-x', currentX.toFixed(4));
      root.style.setProperty('--pointer-y', currentY.toFixed(4));
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty('--scroll-ratio', Math.min(window.scrollY / max, 1).toFixed(4));
      if (running && (fine || Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001)) {
        frame = requestAnimationFrame(tick);
      }
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const onPointer = event => {
      if (!fine) return;
      targetX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      targetY = event.clientY / Math.max(window.innerHeight, 1) - 0.35;
      schedule();
    };

    root.style.setProperty('--pointer-x', '0');
    root.style.setProperty('--pointer-y', '0');
    root.style.setProperty('--scroll-ratio', '0');
    schedule();
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      running = false;
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

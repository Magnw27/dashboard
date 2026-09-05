import { useEffect } from 'react';

export function usePointerScene() {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer:fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return undefined;

    const root = document.documentElement;
    let frame = 0;
    let active = true;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollRatio = 0;

    const updateScrollRatio = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollRatio = Math.min(window.scrollY / max, 1);
    };

    const tick = () => {
      frame = 0;
      if (!active) return;

      const nextX = currentX + (targetX - currentX) * 0.12;
      const nextY = currentY + (targetY - currentY) * 0.12;
      const settledX = Math.abs(targetX - nextX) < 0.001;
      const settledY = Math.abs(targetY - nextY) < 0.001;

      currentX = settledX ? targetX : nextX;
      currentY = settledY ? targetY : nextY;

      root.style.setProperty('--pointer-x', currentX.toFixed(4));
      root.style.setProperty('--pointer-y', currentY.toFixed(4));
      root.style.setProperty('--scroll-ratio', scrollRatio.toFixed(4));

      if (!settledX || !settledY) frame = requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onPointerMove = event => {
      if (!finePointer.matches) return;
      targetX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      targetY = event.clientY / Math.max(window.innerHeight, 1) - 0.35;
      schedule();
    };

    const onScroll = () => {
      updateScrollRatio();
      schedule();
    };

    const onResize = () => {
      updateScrollRatio();
      schedule();
    };

    root.style.setProperty('--pointer-x', '0');
    root.style.setProperty('--pointer-y', '0');
    updateScrollRatio();
    root.style.setProperty('--scroll-ratio', scrollRatio.toFixed(4));

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      active = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

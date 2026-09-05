(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer:fine)').matches;
  if (reduced) return;

  const root = document.documentElement;
  let raf = 0;
  let pointerX = innerWidth * .5;
  let pointerY = innerHeight * .35;
  let scrollY = 0;

  const updateScene = () => {
    raf = 0;
    const sx = (pointerX / Math.max(innerWidth, 1) - .5);
    const sy = (pointerY / Math.max(innerHeight, 1) - .5);
    root.style.setProperty('--scene-x', `${sx.toFixed(4)}`);
    root.style.setProperty('--scene-y', `${sy.toFixed(4)}`);
    root.style.setProperty('--scroll-ratio', `${Math.min(scrollY / Math.max(document.documentElement.scrollHeight - innerHeight, 1), 1).toFixed(4)}`);

    const backdrop = $('.backdrop-image');
    const orbs = $$('.ambient-orbs i');
    if (backdrop) {
      backdrop.style.setProperty('--px', `${(sx * 10).toFixed(2)}px`);
      backdrop.style.setProperty('--py', `${(sy * 7 + Math.min(scrollY * .008, 18)).toFixed(2)}px`);
    }
    orbs.forEach((orb, i) => {
      const depth = (i + 1) * 2.2;
      orb.style.setProperty('--px', `${(sx * depth).toFixed(2)}px`);
      orb.style.setProperty('--py', `${(sy * depth).toFixed(2)}px`);
    });
  };

  const requestSceneUpdate = () => {
    if (!raf) raf = requestAnimationFrame(updateScene);
  };

  if (finePointer) {
    addEventListener('pointermove', e => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      requestSceneUpdate();
    }, { passive: true });
  }

  addEventListener('scroll', () => {
    scrollY = window.scrollY;
    requestSceneUpdate();
  }, { passive: true });

  addEventListener('resize', requestSceneUpdate, { passive: true });

  const magnetic = $$('.btn, .nav-tool, .filter');
  if (finePointer) {
    magnetic.forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - .5) * 5;
        const y = ((e.clientY - r.top) / r.height - .5) * 5;
        el.style.setProperty('--mag-x', `${x.toFixed(2)}px`);
        el.style.setProperty('--mag-y', `${y.toFixed(2)}px`);
      }, { passive: true });
      el.addEventListener('pointerleave', () => {
        el.style.setProperty('--mag-x', '0px');
        el.style.setProperty('--mag-y', '0px');
      }, { passive: true });
    });
  }

  const countUp = (el, target) => {
    const start = performance.now();
    const duration = 850;
    const step = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const startCounters = () => {
    [['#statTotal', Number($('#statTotal')?.textContent || 0)], ['#statLanguages', Number($('#statLanguages')?.textContent || 0)], ['#statOpen', Number($('#statOpen')?.textContent || 0)]].forEach(([selector, target]) => {
      const el = $(selector);
      if (el && target > 0) countUp(el, target);
    });
  };

  const initObserverRefresh = () => {
    if (!('IntersectionObserver' in window)) return;
    const section = $('#projectsContainer');
    if (!section) return;
    const observer = new MutationObserver(() => {
      requestAnimationFrame(() => {
        $$('#projectsContainer .project-card').forEach((card, i) => card.style.setProperty('--i', i));
      });
    });
    observer.observe(section, { childList: true });
  };

  document.addEventListener('DOMContentLoaded', () => {
    requestSceneUpdate();
    startCounters();
    initObserverRefresh();
    document.body.classList.add('motion-ready');
  });
})();

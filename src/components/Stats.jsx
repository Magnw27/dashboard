import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Counter({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = now => {
      const progress = Math.min((now - start) / 850, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return count;
}

export function Stats({ projects }) {
  const languages = new Set(projects.map(project => project.lang)).size;
  return (
    <motion.section className="summary shell" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
      <div className="summary-item"><span>Projects</span><strong><Counter value={projects.length} /></strong></div>
      <div className="summary-item"><span>Languages</span><strong><Counter value={languages} /></strong></div>
      <div className="summary-item"><span>Open source</span><strong><Counter value={projects.length} /></strong></div>
      <div className="summary-item summary-note"><span>Focus</span><strong>Useful things</strong></div>
    </motion.section>
  );
}

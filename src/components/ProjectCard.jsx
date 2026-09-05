import { motion } from 'framer-motion';

export function ProjectCard({ project, index }) {
  return (
    <motion.a
      className="project-card"
      href={project.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 34, scale: 0.97, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0)' }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.75, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, rotateX: -1.5, rotateY: index % 2 ? -1.5 : 1.5, scale: 1.008 }}
      whileTap={{ scale: 0.992 }}
      style={{ transformPerspective: 1200 }}
    >
      <span className="card-sheen" />
      <div className="card-top"><span className="card-index">{project.index}</span><span className="card-tag">{project.label}</span></div>
      <div className="card-main"><h3>{project.name}</h3><p>{project.desc}</p></div>
      <div className="card-bottom"><span className="lang">{project.lang}</span><motion.span className="card-arrow" whileHover={{ x: 3, y: -3 }}>↗</motion.span></div>
    </motion.a>
  );
}

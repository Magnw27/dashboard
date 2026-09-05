import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection({ projects }) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const languages = ['All', ...new Set(projects.map(project => project.lang))];

  const filtered = useMemo(() => projects.filter(project => {
    const languageMatch = filter === 'All' || project.lang === filter;
    const text = `${project.name} ${project.lang} ${project.desc} ${project.label}`.toLowerCase();
    return languageMatch && (!query.trim() || text.includes(query.trim().toLowerCase()));
  }), [filter, projects, query]);

  return (
    <section className="projects shell" id="projects">
      <motion.div className="section-head" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div><p className="eyebrow"><span /> SELECTED WORK</p><h2>Projects that ship.</h2></div>
        <p>Each card opens the repository directly on GitHub.</p>
      </motion.div>
      <motion.div className="project-tools" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.08, duration: 0.65 }}>
        <div className="filter-row" role="tablist" aria-label="Filter bahasa">
          {languages.map(language => <motion.button key={language} className={`filter ${filter === language ? 'is-active' : ''}`} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => setFilter(language)} role="tab" aria-selected={filter === language}>{language}<span>{language === 'All' ? projects.length : projects.filter(project => project.lang === language).length}</span></motion.button>)}
        </div>
        <label className="search-box"><span>⌕</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search projects" autoComplete="off" /><kbd>/</kbd></label>
      </motion.div>
      <motion.div className="project-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => <ProjectCard key={project.repo} project={project} index={index} />)}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && <motion.div className="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><strong>No projects found.</strong><button type="button" onClick={() => { setFilter('All'); setQuery(''); }}>Reset</button></motion.div>}
    </section>
  );
}

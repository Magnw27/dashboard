export const projects = [
  { name: 'dashboard', lang: 'HTML', desc: 'Personal dashboard project built for a lightweight web portfolio.', repo: 'dashboard', label: 'Web', index: '01' },
  { name: 'asset-video', lang: 'Media', desc: 'Public video asset repository used for web and app backgrounds.', repo: 'asset-video', label: 'Asset', index: '02' },
  { name: 'SlimeCustomizer', lang: 'Java', desc: 'English-version fork of SlimeCustomizer for the Slimefun ecosystem.', repo: 'SlimeCustomizer', label: 'Fork', index: '03' },
  { name: 'ntwexpan-celius', lang: 'Java', desc: 'Translated Networks Expansion XP project for a Minecraft plugin ecosystem.', repo: 'ntwexpan-celius', label: 'Fork', index: '04' },
  { name: 'DynaTech', lang: 'Java', desc: 'English version of the DynaTech project for Craftnesia.', repo: 'DynaTech', label: 'Fork', index: '05' },
  { name: 'SlimeRewardsDaily', lang: 'Java', desc: 'A learning-focused starter plugin project built around daily rewards.', repo: 'SlimeRewardsDaily', label: 'Plugin', index: '06' },
  { name: 'FluffyMachines', lang: 'Java', desc: 'English-version fork of FluffyMachines for the Slimefun ecosystem.', repo: 'FluffyMachines', label: 'Fork', index: '07' },
  { name: 'Supreme', lang: 'Java', desc: 'Kediri-focused fork of Supreme for the Slimefun ecosystem.', repo: 'Supreme', label: 'Fork', index: '08' },
  { name: 'rivo-downloader', lang: 'TypeScript', desc: 'Video and audio downloader project built around URL-based media workflows.', repo: 'rivo-downloader', label: 'Tool', index: '09' },
  { name: 'Magnw27', lang: 'Mixed', desc: 'Profile repository and personal developer space.', repo: 'Magnw27', label: 'Profile', index: '10' },
  { name: 'library-manager', lang: 'Python', desc: 'Simple CLI-based library management application and early Python project.', repo: 'library-manager', label: 'CLI', index: '11' },
  { name: 'lips-ai', lang: 'Mixed', desc: 'AI-focused personal project published from the same GitHub workspace.', repo: 'lips-ai', label: 'AI', index: '12' },
  { name: 'JustEnoughGuide', lang: 'Java', desc: 'Improved Slimefun addon guide project based on JustEnoughGuide.', repo: 'JustEnoughGuide', label: 'Addon', index: '13' },
  { name: 'ripgacor', lang: 'HTML', desc: 'Experiment build v1.0 — a lightweight web project.', repo: 'ripgacor', label: 'Web', index: '14' }
].map(project => ({ ...project, url: `https://github.com/Magnw27/${encodeURIComponent(project.repo)}` }));

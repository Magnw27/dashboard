const projects = [
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
].map(p => ({ ...p, url: `https://github.com/Magnw27/${encodeURIComponent(p.repo)}` }));

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const container = $('#projectsContainer');
const emptyState = $('#emptyState');
const searchInput = $('#searchInput');
const audio = $('#bgAudio');
const audioToggle = $('#audioToggle');
const audioText = $('#audioText');
const toast = $('#toast');
let activeFilter = 'All';
let motionEnabled = true;

function languages() {
  return ['All', ...new Set(projects.map(p => p.lang))];
}

function renderFilters() {
  $('#filters').innerHTML = languages().map((lang, i) => `
    <button class="filter ${i === 0 ? 'is-active' : ''}" role="tab" aria-selected="${i === 0}" data-lang="${lang}">
      ${lang}<span>${lang === 'All' ? projects.length : projects.filter(p => p.lang === lang).length}</span>
    </button>
  `).join('');

  $$('#filters .filter').forEach(btn => btn.addEventListener('click', () => {
    activeFilter = btn.dataset.lang;
    $$('#filters .filter').forEach(b => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', active);
    });
    renderProjects();
  }));
}

function getVisibleProjects() {
  const q = searchInput.value.trim().toLowerCase();
  return projects.filter(p => {
    const matchLang = activeFilter === 'All' || p.lang === activeFilter;
    const matchSearch = !q || `${p.name} ${p.lang} ${p.desc} ${p.label}`.toLowerCase().includes(q);
    return matchLang && matchSearch;
  });
}

function cardTemplate(p, i) {
  return `
    <a class="project-card reveal-card" href="${p.url}" target="_blank" rel="noopener noreferrer" style="--i:${i}">
      <span class="card-sheen"></span>
      <div class="card-top">
        <span class="card-index">${p.index}</span>
        <span class="card-tag">${p.label}</span>
      </div>
      <div class="card-main">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
      </div>
      <div class="card-bottom">
        <span class="lang">${p.lang}</span>
        <span class="card-arrow">↗</span>
      </div>
    </a>
  `;
}

function renderProjects() {
  const visible = getVisibleProjects();
  container.innerHTML = visible.map(cardTemplate).join('');
  emptyState.classList.toggle('hidden', visible.length !== 0);
  requestAnimationFrame(observeCards);
}

function updateStats() {
  $('#statTotal').textContent = projects.length;
  $('#statLanguages').textContent = new Set(projects.map(p => p.lang)).size;
  $('#statOpen').textContent = projects.length;
}

function observeCards() {
  if (!('IntersectionObserver' in window)) {
    $$('.reveal-card').forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -60px' });
  $$('.reveal-card').forEach(card => observer.observe(card));
}

function setupReveal() {
  if (!('IntersectionObserver' in window)) {
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  $$('.reveal').forEach(el => observer.observe(el));
}

function setupCardMotion() {
  const finePointer = matchMedia('(pointer:fine)').matches;
  if (!finePointer || !motionEnabled) return;
  document.addEventListener('pointermove', e => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.setProperty('--rx', `${(-y * 4).toFixed(2)}deg`);
    card.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`);
    card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
  });
  document.addEventListener('pointerout', e => {
    const card = e.target.closest('.project-card');
    if (card && !card.contains(e.relatedTarget)) {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    }
  });
}

function setupPointerGlow() {
  const glow = $('#pointerGlow');
  if (!glow || !matchMedia('(pointer:fine)').matches) return;
  document.addEventListener('pointermove', e => {
    glow.style.transform = `translate3d(${e.clientX - 180}px, ${e.clientY - 180}px, 0)`;
  }, { passive: true });
}

function setupScroll() {
  const progress = $('#scrollProgress');
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const value = max > 0 ? scrollY / max : 0;
    progress.style.transform = `scaleX(${value})`;
    $('#nav').classList.toggle('is-scrolled', scrollY > 24);
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

function setupKeyboard() {
  addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) searchInput.blur();
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove('show'), 2200);
}

async function toggleAudio() {
  if (!audio) return;
  try {
    if (audio.paused) {
      await audio.play();
      audioToggle.classList.add('is-on');
      audioToggle.setAttribute('aria-pressed', 'true');
      audioToggle.setAttribute('aria-label', 'Matikan suara');
      audioText.textContent = 'Sound on';
    } else {
      audio.pause();
      audioToggle.classList.remove('is-on');
      audioToggle.setAttribute('aria-pressed', 'false');
      audioToggle.setAttribute('aria-label', 'Aktifkan suara');
      audioText.textContent = 'Sound';
    }
  } catch {
    showToast('Tambahkan assets/suara.mp3 untuk mengaktifkan suara.');
  }
}

function setupSearch() {
  searchInput.addEventListener('input', renderProjects);
  $('#resetFilters').addEventListener('click', () => {
    activeFilter = 'All';
    searchInput.value = '';
    $$('#filters .filter').forEach((b, i) => {
      const active = i === 0;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', active);
    });
    renderProjects();
  });
}

function hideLoader() {
  const loader = $('#pageLoader');
  const bar = $('#loaderBar');
  let progress = 0;
  const timer = setInterval(() => {
    progress += Math.random() * 25 + 8;
    bar.style.width = `${Math.min(progress, 100)}%`;
    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => loader.classList.add('done'), 220);
    }
  }, 80);
}

document.addEventListener('DOMContentLoaded', () => {
  renderFilters();
  updateStats();
  renderProjects();
  setupReveal();
  setupCardMotion();
  setupPointerGlow();
  setupScroll();
  setupKeyboard();
  setupSearch();
  audioToggle.addEventListener('click', toggleAudio);
  hideLoader();
});

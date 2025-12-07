import './project-card.js';

const LOCAL_STORAGE_KEY = 'kc-projects-local-v1';
const REMOTE_ENDPOINT = 'https://my-json-server.typicode.com/kecohen575/resume-JSON-server/projects';
const grid = document.getElementById('projects-grid');
const statusEl = document.getElementById('projects-status');
const emptyEl = document.getElementById('projects-empty');
const loadLocalBtn = document.getElementById('load-local');
const loadRemoteBtn = document.getElementById('load-remote');

// Put images in assets/images/projects/{slug}/.
// Started with 800w WebP + JPEG; will add 1400w versions later for sharper desktops.
const coverFromSlug = (slug) => ({
  sources: [
    { srcset: `assets/images/projects/${slug}/${slug}-800w.webp 800w`, type: 'image/webp' },
    { srcset: `assets/images/projects/${slug}/${slug}-800w.jpg 800w`, type: 'image/jpeg' }
  ],
  fallback: `assets/images/projects/${slug}/${slug}-800w.jpg`
});

const slugify = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

// Check if a string is a URL (starts with http://, https://, or //)
const isUrl = (str) => /^(https?:)?\/\//i.test(str);

// Build cover object from URL or slug
const buildCover = (coverValue, fallbackSlug) => {
  if (coverValue && isUrl(coverValue)) {
    // Direct URL - use as-is for both sources and fallback
    return {
      sources: [],
      fallback: coverValue
    };
  }
  // Slug-based cover from local assets
  return coverFromSlug(coverValue || fallbackSlug);
};

const normalizeProject = (project = {}) => {
  const slug = project.slug || slugify(project.title || 'untitled');
  return {
    title: project.title || 'Untitled Project',
    description: project.description || 'No description provided.',
    status: project.status || 'Unknown',
    stars: Number.isFinite(project.stars) ? project.stars : 0,
    tags: Array.isArray(project.tags) ? project.tags : [],
    demo: project.demo || '#',
    code: project.code || '#',
    alt: project.alt || `${project.title || 'Project'} cover`,
    timeline: project.timeline || '',
    role: project.role || '',
    slug,
    cover: buildCover(project.cover, slug)
  };
};

const setStatus = (message) => {
  if (statusEl) statusEl.textContent = message;
};

const clearGrid = () => {
  if (grid) grid.innerHTML = '';
};

const renderProjects = (projects = []) => {
  clearGrid();
  if (!projects.length) {
    if (emptyEl) emptyEl.hidden = false;
    setStatus('No projects found for this source.');
    return;
  }

  if (emptyEl) emptyEl.hidden = true;

  projects.forEach(project => {
    const item = document.createElement('li');
    const card = document.createElement('project-card');
    card.project = normalizeProject(project);
    item.appendChild(card);
    grid?.appendChild(item);
  });
};

const seedLocalFromJson = async () => {
  try {
    const response = await fetch('assets/projects.json');
    if (!response.ok) throw new Error('Failed to seed local projects');
    const data = await response.json();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(error);
    setStatus('Unable to seed local projects.');
    return [];
  }
};

const loadLocalProjects = async () => {
  setStatus('Loading from localStorage...');
  let raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  let projects = [];

  if (!raw) {
    projects = await seedLocalFromJson();
  } else {
    try {
      projects = JSON.parse(raw);
    } catch (error) {
      console.error('Failed to parse local projects', error);
      projects = await seedLocalFromJson();
    }
  }

  renderProjects(projects);
  setStatus('Loaded projects from localStorage.');
};

const loadRemoteProjects = async () => {
  if (!REMOTE_ENDPOINT) {
    setStatus('Remote endpoint not configured.');
    return;
  }

  setStatus('Loading from remote...');
  try {
    const response = await fetch(REMOTE_ENDPOINT);
    if (!response.ok) throw new Error('Failed to load remote projects');
    const data = await response.json();
    renderProjects(data);
    setStatus('Loaded projects from remote source.');
  } catch (error) {
    console.error(error);
    setStatus('Unable to load remote projects.');
  }
};

if (loadLocalBtn) loadLocalBtn.addEventListener('click', loadLocalProjects);
if (loadRemoteBtn) loadRemoteBtn.addEventListener('click', loadRemoteProjects);

// Seed localStorage ONLY if empty, so "Load Local" works offline
// but doesn't overwrite user-created projects.
if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
  seedLocalFromJson();
}

import './project-card.js';

// Put images in assets/images/projects/{slug}/.
// Started with 800w WebP + JPEG; will add 1400w versions later for sharper desktops.
const coverFromSlug = (slug) => ({
  sources: [
    { srcset: `assets/images/projects/${slug}/${slug}-800w.webp 800w`, type: 'image/webp' },
    { srcset: `assets/images/projects/${slug}/${slug}-800w.jpg 800w`, type: 'image/jpeg' }
  ],
  fallback: `assets/images/projects/${slug}/${slug}-800w.jpg`
});

const grid = document.getElementById('projects-grid');

const renderProjects = (projects = []) => {
  projects.forEach(project => {
    const item = document.createElement('li');
    const card = document.createElement('project-card');
    card.project = {
      ...project,
      cover: coverFromSlug(project.cover)
    };
    item.appendChild(card);
    grid?.appendChild(item);
  });
};

const loadProjects = async () => {
  try {
    const response = await fetch('assets/projects.json');
    if (!response.ok) throw new Error('Failed to load project data');
    const data = await response.json();
    renderProjects(data);
  } catch (error) {
    console.error(error);
  }
};

loadProjects();

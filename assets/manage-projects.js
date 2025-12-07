// CRUD operations for localStorage projects
// Uses same key as projects.js for consistency

const LOCAL_STORAGE_KEY = 'kc-projects-local-v1';

const selectEl = document.getElementById('project-select');
const formEl = document.getElementById('project-form');
const deleteBtn = document.getElementById('delete-btn');
const submitBtn = document.getElementById('submit-btn');
const statusEl = document.getElementById('crud-status');
const formLegend = document.getElementById('form-legend');
const confirmationEl = document.getElementById('form-confirmation');

let currentIndex = -1; // -1 = new project, 0+ = editing existing

// ─── Helpers ───────────────────────────────────────────────────────────────

const getProjects = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const saveProjects = (projects) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
};

const setStatus = (message) => {
  if (statusEl) statusEl.textContent = message;
};

const showConfirmation = (message) => {
  if (confirmationEl) {
    confirmationEl.textContent = message;
    setTimeout(() => { confirmationEl.textContent = ''; }, 3000);
  }
};

// ─── Populate Select ───────────────────────────────────────────────────────

const populateSelect = () => {
  const projects = getProjects();
  selectEl.innerHTML = '<option value="">-- New Project --</option>';
  projects.forEach((p, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = p.title || `Project ${i + 1}`;
    selectEl.appendChild(opt);
  });
};

// ─── Form Population ───────────────────────────────────────────────────────

// Reset UI state without triggering form reset (avoids recursive loop)
const resetUIState = () => {
  currentIndex = -1;
  deleteBtn.disabled = true;
  submitBtn.textContent = 'Create Project';
  formLegend.textContent = 'Create New Project';
  selectEl.value = '';
};

// Full clear: reset form values AND UI state
const clearForm = () => {
  formEl.reset();
  resetUIState();
};

const loadProjectIntoForm = (project) => {
  formEl.title.value = project.title || '';
  formEl.description.value = project.description || '';
  formEl.status.value = project.status || 'In Progress';
  formEl.stars.value = project.stars ?? 0;
  formEl.tags.value = Array.isArray(project.tags) ? project.tags.join(', ') : '';
  formEl.cover.value = project.cover || '';
  formEl.alt.value = project.alt || '';
  formEl.demo.value = project.demo || '';
  formEl.code.value = project.code || '';
  formEl.timeline.value = project.timeline || '';
  formEl.role.value = project.role || '';
};

const getFormData = () => ({
  title: formEl.title.value.trim(),
  description: formEl.description.value.trim(),
  status: formEl.status.value,
  stars: parseInt(formEl.stars.value, 10) || 0,
  tags: formEl.tags.value.split(',').map(t => t.trim()).filter(Boolean),
  cover: formEl.cover.value.trim(),
  alt: formEl.alt.value.trim(),
  demo: formEl.demo.value.trim(),
  code: formEl.code.value.trim(),
  timeline: formEl.timeline.value.trim(),
  role: formEl.role.value.trim()
});

// ─── CRUD Operations ───────────────────────────────────────────────────────

const createProject = (data) => {
  const projects = getProjects();
  projects.push(data);
  saveProjects(projects);
  setStatus(`Created "${data.title}". Changes visible on next project load.`);
  showConfirmation('✓ Project created');
};

const updateProject = (index, data) => {
  const projects = getProjects();
  if (index >= 0 && index < projects.length) {
    projects[index] = data;
    saveProjects(projects);
    setStatus(`Updated "${data.title}". Changes visible on next project load.`);
    showConfirmation('✓ Project updated');
  }
};

const deleteProject = (index) => {
  const projects = getProjects();
  if (index >= 0 && index < projects.length) {
    const removed = projects.splice(index, 1)[0];
    saveProjects(projects);
    setStatus(`Deleted "${removed.title}". Changes visible on next project load.`);
    showConfirmation('✓ Project deleted');
    clearForm();
    populateSelect();
  }
};

// ─── Event Handlers ────────────────────────────────────────────────────────

selectEl.addEventListener('change', () => {
  const val = selectEl.value;
  if (val === '') {
    clearForm();
  } else {
    currentIndex = parseInt(val, 10);
    const projects = getProjects();
    loadProjectIntoForm(projects[currentIndex]);
    deleteBtn.disabled = false;
    submitBtn.textContent = 'Update Project';
    formLegend.textContent = 'Edit Project';
  }
});

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = getFormData();
  if (currentIndex === -1) {
    createProject(data);
  } else {
    updateProject(currentIndex, data);
  }
  clearForm();
  populateSelect();
});

formEl.addEventListener('reset', () => {
  // Only reset UI state; form values already cleared by native reset
  setTimeout(resetUIState, 0);
});

deleteBtn.addEventListener('click', () => {
  if (currentIndex >= 0 && confirm('Delete this project?')) {
    deleteProject(currentIndex);
  }
});

// ─── Init ──────────────────────────────────────────────────────────────────

populateSelect();


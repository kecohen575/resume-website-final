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

const projects = [
  {
    title: '2048 AI Player',
    description: 'Built an expectimax-based 2048 solver that learns tile heuristics and depth budgeting for responsive gameplay.',
    status: 'Complete',
    stars: 234,
    tags: ['Python', 'Expectimax', 'Heuristics'],
    demo: 'https://github.com/kecohen575?tab=repositories',
    code: 'https://github.com/kecohen575?tab=repositories',
    cover: coverFromSlug('2048-ai'),
    alt: 'AI bot solving the 2048 tile grid',
    timeline: 'Winter 2024',
    role: 'Solo Build'
  },
  {
    title: 'PokeCollect',
    description: 'Collection tracker for Pokémon cards with CSV import, price lookups, and trade-binder views that filter by set, rarity, and grade.',
    status: 'Complete',
    stars: 188,
    tags: ['HTML', 'CSS', 'JS', 'AGILE'],
    demo: 'https://github.com/kecohen575?tab=repositories',
    code: 'https://github.com/kecohen575?tab=repositories',
    cover: coverFromSlug('pokemon-binder'),
    alt: 'PokeCollect dashboard showing card counts, value charts, and set filters',
    timeline: 'Spring 2024',
    role: 'Full Stack'
  },
  {
    title: 'Open Your Eyes',
    description: 'First-person puzzle prototype where camera focus rewinds level states; built custom shaders for memory echoes.',
    status: 'In Progress',
    stars: 72,
    tags: ['Unity', 'C#', 'Shaders'],
    demo: 'https://github.com/kecohen575?tab=repositories',
    code: 'https://github.com/kecohen575?tab=repositories',
    cover: coverFromSlug('open-your-eyes'),
    alt: 'First-person puzzle view with visual echo mechanic',
    timeline: 'Spring 2024',
    role: 'Gameplay Engineer'
  },
  {
    title: 'Monte Carlo Blackjack',
    description: 'Simulated millions of blackjack hands to estimate EV by count state, then exported tables as a web-ready trainer.',
    status: 'Complete',
    stars: 312,
    tags: ['Python', 'Monte Carlo', 'Data Viz'],
    demo: 'https://github.com/kecohen575?tab=repositories',
    code: 'https://github.com/kecohen575?tab=repositories',
    cover: coverFromSlug('blackjack-ai'),
    alt: 'Blackjack table with simulation charts',
    timeline: 'Fall 2022',
    role: 'Simulation Lead'
  },
  {
    title: 'TeleSlack Bot',
    description: 'Bridged Telegram and Slack with a Rails bot that synced threads, reactions, and delivery receipts for hybrid clubs.',
    status: 'Complete',
    stars: 189,
    tags: ['Ruby on Rails', 'Slack API', 'Telegram Bot'],
    demo: 'https://github.com/kecohen575?tab=repositories',
    code: 'https://github.com/kecohen575?tab=repositories',
    cover: coverFromSlug('teleslack'),
    alt: 'Slack and Telegram chat integration bot interface (Need to get screenshot of project from old company',
    timeline: 'Summer 2023',
    role: 'Backend & Integrations'
  }
];

const grid = document.getElementById('projects-grid');

projects.forEach(project => {
  const item = document.createElement('li');
  const card = document.createElement('project-card');
  card.project = project;
  item.appendChild(card);
  grid?.appendChild(item);
});

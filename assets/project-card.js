class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._project = null;
  }

  set project(details) {
    this._project = details;
    this.dataset.status = details?.status || '';
    this.render();
  }

  get project() {
    return this._project;
  }

  render() {
    if (!this._project || !this.shadowRoot) return;

    const {
      title,
      description,
      status,
      stars,
      tags,
      demo,
      code,
      cover,
      alt,
      timeline,
      role
    } = this._project;

    const tagList = (tags || []).map(tag => `<li>${tag}</li>`).join('');
    const sources = cover?.sources || [];
    const fallback = cover?.fallback || '';
    const firstSource = sources[0]?.srcset || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          height: 100%;
        }

        * {
          box-sizing: border-box;
        }

        article {
          height: 100%;
          display: grid;
          grid-template-rows: auto auto 1fr auto;
          gap: var(--card-gap, 0.9rem);
          padding: 1rem;
          background: var(--card-surface, color-mix(in srgb, var(--foreground) 82%, transparent));
          border: 3px solid var(--card-border, var(--primary-text));
          box-shadow: 0 0 0 2px var(--background),
                      0 12px 20px rgba(0, 0, 0, 0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        article:hover {
          transform: translateY(-4px);
          border-color: var(--secondary-text);
          box-shadow: 0 0 0 2px var(--background),
                      0 16px 26px rgba(0, 0, 0, 0.45);
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          color: var(--secondary-text);
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.6rem;
          border: 2px solid currentColor;
          text-transform: uppercase;
          background: color-mix(in srgb, var(--background) 78%, transparent);
        }

        :host([data-status="Complete"]) .status {
          color: var(--tertiary-text);
          border-color: var(--tertiary-text);
        }

        :host([data-status="In Progress"]) .status {
          color: var(--secondary-text);
          border-color: var(--secondary-text);
          background: color-mix(in srgb, var(--foreground) 70%, transparent);
        }

        .meta {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--star-color, #ffff00);
        }

        picture {
          display: block;
          width: 100%;
          border: 3px solid var(--primary-text);
          background: var(--background);
        }

        picture img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 16 / 9;
        }

        h2 {
          margin: 0;
          font-size: 1.1rem;
          color: var(--primary-text);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .timeline {
          margin: 0.25rem 0 0.75rem;
          color: var(--secondary-text);
          font-size: 0.85rem;
          letter-spacing: 0.03em;
        }

        .description {
          margin: 0;
          color: CanvasText;
          line-height: 1.55;
        }

        ul.tags {
          list-style: none;
          margin: 0.75rem 0 0;
          padding: 0;
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        ul.tags li {
          padding: 0.35rem 0.7rem;
          border: 2px solid var(--primary-text);
          background: color-mix(in srgb, var(--background) 80%, transparent);
          color: CanvasText;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        footer {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }

        footer a {
          flex: 1 1 8rem;
          text-align: center;
          text-decoration: none;
          border: 2px solid var(--primary-text);
          padding: 0.55rem 0.75rem;
          color: var(--button-text);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }

        footer a:hover,
        footer a:focus-visible {
          background-color: var(--primary-text);
          color: CanvasText;
          border-color: var(--secondary-text);
        }
      </style>
      <article role="listitem">
        <header>
          <span class="status"><data value="${status}">${status}</data></span>
          <span class="meta" aria-label="Stars">${String.fromCharCode(9733)} ${stars}</span>
        </header>
        <picture>
          ${sources.map(src => `<source srcset="${src.srcset}" type="${src.type}">`).join('')}
          <img src="${fallback || firstSource}" alt="${alt}">
        </picture>
        <div>
          <h2>${title}</h2>
          <p class="timeline">${timeline} &middot; ${role}</p>
          <p class="description">${description}</p>
          <ul class="tags">${tagList}</ul>
        </div>
        <footer>
          <a href="${demo}" target="_blank" rel="noopener noreferrer">Demo</a>
          <a href="${code}" target="_blank" rel="noopener noreferrer">Code</a>
        </footer>
      </article>
    `;
  }
}

customElements.define('project-card', ProjectCard);

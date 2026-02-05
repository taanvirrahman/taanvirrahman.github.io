import { templates } from "./components.js";

export const elements = {};

// Configure marked with highlight.js
if (typeof marked !== "undefined" && typeof hljs !== "undefined") {
  marked.setOptions({
    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
    breaks: true,
  });
}


export const refreshElements = () => {
  elements.resumeBtn = document.getElementById("resume-btn");

  // Hero Badges
  elements.latestNoteBadge = document.getElementById("latest-note-badge");
  elements.latestResearchBadge = document.getElementById("latest-research-badge");

  // Core Grids
  elements.bentoGrid = document.querySelector(".bento-grid");
  elements.skillsGrid = document.querySelector(".skills-grid");
  elements.certificationsGrid = document.querySelector(".certifications-grid");

  elements.researchList = document.getElementById("research-list");
  elements.recommendedList = document.getElementById("recommended-list");
  elements.educationList = document.getElementById("education-list");
  elements.latestNotesGrid = document.querySelector(".latest-notes-grid");
  elements.blogList = document.getElementById("blog-list");
  elements.aboutLead = document.getElementById("about-lead");
  elements.aboutBio = document.getElementById("about-bio");
};

// Initial run
refreshElements();


export const renderLatestNoteBadge = (note) => {
  if (!elements.latestNoteBadge || !note) return;

  const badgeText = elements.latestNoteBadge.querySelector(".badge-text");
  if (badgeText) badgeText.innerText = note.title;

  elements.latestNoteBadge.href = `notes.html#${note.id}`;
  elements.latestNoteBadge.classList.remove("hidden");
};

export const renderLatestResearchBadge = (paper) => {
  if (!elements.latestResearchBadge || !paper) return;

  const badgeText = elements.latestResearchBadge.querySelector(".badge-text");
  if (badgeText) badgeText.innerText = paper.title;

  elements.latestResearchBadge.href = paper.links?.PDF || paper.links?.Code || "research.html";
  elements.latestResearchBadge.classList.remove("hidden");
};



export const triggerConfetti = () => {
  const duration = 2.5 * 1000;
  const end = Date.now() + duration;

  // Premium color palette - gold, white, and subtle accents
  const colors = [
    "#FFD700", // Gold
    "#FFF8DC", // Cornsilk (soft gold)
    "#FFFFFF", // White
    "#E8E8E8", // Light gray
    "#C0C0C0", // Silver
    "#FF6B6B", // Soft coral (matches footer red)
  ];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      shapes: ["circle", "square"],
      gravity: 1.2,
      drift: 0,
      ticks: 200,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      shapes: ["circle", "square"],
      gravity: 1.2,
      drift: 0,
      ticks: 200,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

};
export const renderProjects = (projects) => {
  if (!elements.bentoGrid || !projects) return;


  if (projects.length === 0) {
    elements.bentoGrid.innerHTML = `
      <div class="col-span-full py-12 text-center text-secondary/40 font-mono text-sm capitalize">
        Projects are being updated. Check back soon.
      </div>
    `;
    return;
  }

  elements.bentoGrid.innerHTML = projects
    .map((project) => templates.card(project, 'project'))
    .join("");
};

export const renderSkills = (skills) => {
  if (!elements.skillsGrid || !skills) return;

  elements.skillsGrid.innerHTML = skills
    .map((group) => templates.skillGroup(group))
    .join("");
};

export const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;

  // Update hljs theme dynamically
  const hljsThemeLink = document.getElementById("hljs-theme");
  if (hljsThemeLink) {
    const themePath =
      theme === "light"
        ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
        : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css";
    hljsThemeLink.setAttribute("href", themePath);
  }
};


export const renderCertifications = (certifications) => {
  if (!elements.certificationsGrid || !certifications) return;

  // Ensure we keep the grid class and don't overwrite it with list
  if (!elements.certificationsGrid.classList.contains('certifications-list')) {
    elements.certificationsGrid.classList.add('certifications-list');
  }

  elements.certificationsGrid.innerHTML = certifications
    .map((cert, index) => templates.certification(cert, index))
    .join("");

  initCertListeners();
};

const initCertListeners = () => {
  document.querySelectorAll(".cert-item").forEach((card) => {
    // Prevent duplicate listeners if re-rendered
    if (card.dataset.listened) return;
    card.dataset.listened = "true";

    card.addEventListener("click", () => {
      const url = card.dataset.url;
      if (url) globalThis.open(url, "_blank");
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const url = card.dataset.url;
        if (url) globalThis.open(url, "_blank");
      }
    });
  });
};

export const renderResearchList = (papers) => {
  if (!elements.researchList || !papers) return;

  if (papers.length === 0) {
    elements.researchList.innerHTML =
      '<p class="loading-indicator">No research papers found.</p>';
    return;
  }

  // Use List View from Projects (Global Style)
  elements.researchList.innerHTML = `
    <div class="bento-grid list-view">
        ${papers.map((paper, index) => `
            <div class="bento-card reveal" style="transition-delay: ${index * 100}ms">
                <!-- Col 1: Meta -->
                <div class="bento-header">
                    <span class="bento-tag">${paper.venue}</span>
                    <span class="bento-desc" style="font-family: var(--font-mono); font-size: 0.8rem;">${paper.year}</span>
                </div>
                
                <!-- Col 2: Main Content -->
                <div class="bento-content">
                    <h3 class="bento-title">${paper.title}</h3>
                    <p class="bento-desc" style="font-style: italic; margin-bottom: 0.5rem;">${paper.authors}</p>
                    <p class="bento-desc">${paper.abstract}</p>
                    <div class="flex gap-2 mt-2">
                        ${paper.tags.map(tag => `<span class="text-xs border border-neutral-800 px-2 py-1 rounded-full text-neutral-500 uppercase tracking-wider">${tag}</span>`).join('')}
                    </div>
                </div>

                <!-- Col 3: Link -->
                <div class="flex flex-col gap-2 items-end justify-center">
                     ${Object.entries(paper.links).map(([label, url]) => `
                        <a href="${url}" target="_blank" class="bento-link text-sm">${label}</a>
                     `).join('')}
                </div>
            </div>
        `).join("")}
    </div>
  `;
};

export const renderRecommendedList = (items) => {
  if (!elements.recommendedList || !items) return;

  if (items.length === 0) {
    elements.recommendedList.innerHTML =
      '<p class="loading-indicator">No recommendations found.</p>';
    return;
  }

  // Use Standard Bento Grid (Global Style)
  elements.recommendedList.innerHTML = `
    <div class="bento-grid">
        ${items.map((item, index) => `
            <a href="${item.links.read || item.links.paper || '#'}" target="_blank" class="bento-card reveal group" style="transition-delay: ${index * 100}ms; text-decoration: none;">
                <div class="bento-content">
                    <div class="flex justify-between items-start">
                        <span class="bento-tag">${item.venue || 'Read'}</span>
                        <span class="text-neutral-600 font-mono text-xs">${item.year}</span>
                    </div>
                    
                    <h3 class="bento-title group-hover:text-white transition-colors">${item.title}</h3>
                    <p class="bento-desc text-sm">by ${item.authors}</p>
                    <p class="bento-desc line-clamp-3">${item.abstract}</p>
                    
                    <div class="bento-link mt-auto group-hover:translate-x-1 transition-transform">Read Now</div>
                </div>
            </a>
        `).join("")}
    </div>
  `;
};

export const renderEducation = (education) => {
  if (!elements.educationList || !education) return;

  elements.educationList.innerHTML = education
    .map(
      (edu, index) => `
    <div class="education-item reveal" style="transition-delay: ${index * 100}ms">
      <div class="edu-header">
        <h3 class="edu-degree">${edu.degree}</h3>
        <span class="edu-period">${edu.period}</span>
      </div>
      <div class="edu-institution">${edu.institution}</div>
      <div class="edu-location">
        <svg class="edu-loc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        ${edu.location}
      </div>
      <p class="edu-desc">${edu.description}</p>
    </div>
  `,
    )
    .join("");
};


export const renderLatestNotes = (posts) => {
  if (!elements.latestNotesGrid || !posts) return;

  if (posts.length === 0) {
    elements.latestNotesGrid.innerHTML = '<p class="loading-indicator">No notes found.</p>';
    return;
  }

  elements.latestNotesGrid.innerHTML = posts
    .map((post) => templates.card(post, 'note'))
    .join("");

  // Initialize Reveal for note cards
  elements.latestNotesGrid.querySelectorAll(".reveal").forEach((el) => {
    import("./effects.js").then(({ observeReveal }) => observeReveal(el));
  });
};

export const renderBlogList = (posts) => {
  if (!elements.blogList || !posts) return;

  if (posts.length === 0) {
    elements.blogList.innerHTML = '<p class="loading-indicator">No notes found.</p>';
    return;
  }

  elements.blogList.innerHTML = posts
    .map((post) => templates.card(post, 'note'))
    .join("");
};

// Resources logic moved to resourcesView.js

export const renderAbout = (aboutData) => {

  if (!aboutData) {
    console.error("No about data provided");
    return;
  }

  // 1. Render Hero Content
  if (aboutData.hero) {
    const hero = aboutData.hero;
    const leadEl = document.getElementById("about-lead");
    const bioEl = document.getElementById("about-bio");

    if (leadEl) leadEl.innerHTML = hero.lead;
    if (bioEl) bioEl.innerHTML = `<p>${hero.bio}</p>`;
  }

  // 2. Render Quick Facts Grid
  const factsGrid = document.getElementById("quick-facts-grid");

  if (factsGrid && aboutData.quickFacts) {
    factsGrid.innerHTML = aboutData.quickFacts
      .map((fact, index) => templates.fact(fact, index))
      .join("");
  }
};



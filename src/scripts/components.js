/**
 * Shared Components System
 * Ensures consistent UI across all pages.
 */

const ICONS = {

  map: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  grad: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  code: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  bolt: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
};

/**
 * Reusable UI Templates
 * Centralized components to ensure visual consistency across all pages.
 */
export const templates = {
  /**
   * Status/Category Badge
   */
  badge: (label, type = 'default', extraClass = '') => {
    const types = {
      default: 'bg-tertiary/20 border-main text-secondary/60',
      success: 'bg-accent-emerald/10 border-accent-emerald/20 text-accent-emerald',
      accent: 'bg-accent-indigo/10 border-accent-indigo/20 text-accent-indigo',
      note: 'bg-accent-rose/10 border-accent-rose/20 text-accent-rose',
    };

    const themeClass = types[type] || types.default;
    const pulse = type === 'success' ? `
      <span class="relative flex h-2 w-2 mr-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald/40 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald"></span>
      </span>` : '';

    return `
      <div class="inline-flex items-center px-3 py-1 rounded-full border backdrop-blur-md text-[9px] font-bold uppercase tracking-[0.2em] ${themeClass} ${extraClass}">
        ${pulse}${label}
      </div>
    `;
  },

  /**
   * Quick Fact / Stat Card - Minimal Horizontal Design
   */
  fact: (fact, index = 0) => {
    return `
          <div class="group py-5 md:py-6 px-4 md:px-6 text-center transition-all duration-500 reveal hover:bg-secondary/20" style="transition-delay: ${index * 100}ms">
              <p class="text-base md:text-lg lg:text-xl font-semibold text-primary tracking-tight mb-1 group-hover:text-accent-indigo transition-colors">${fact.value}</p>
              <h3 class="text-[8px] md:text-[9px] font-medium text-secondary/40 uppercase tracking-[0.2em]">${fact.label}</h3>
          </div>
        `;
  },

  /**
   * Skill Category Group
   */
  skillGroup: (group) => {
    return `
    <div class="skills-category reveal">
      <h3 class="skills-cat-title">${group.category}</h3>
      <div class="skills-items">
        ${group.items
        .map((item) => `<div class="skill-item">${item}</div>`)
        .join("")}
      </div>
    </div>
  `;
  },

  /**
   * Certification Item
   */
  certification: (cert, index = 0) => {
    return `
    <div class="cert-item reveal" style="transition-delay: ${index * 100}ms" tabindex="0" data-url="${cert.url}" role="button">
      <div class="cert-details">
        <h3 class="cert-name">${cert.name}</h3>
        <span class="cert-issuer">${cert.issuer}</span>
      </div>
      <div class="cert-meta">
        <span class="cert-date">${cert.date}</span>
        <svg class="cert-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      </div>
    </div>
  `;
  },

  /**
   * Polymorphic Card Component
   * Supports Bento (Project), Note, and Resource layouts.
   */
  card: (data, layout = 'note') => {
    const { id, title, desc, tag, date, url, thumbnail, readingTime, size } = data;

    // 1. PROJECT (BENTO) LAYOUT
    if (layout === 'project') {
      const sizeMap = { large: "bento-large", wide: "bento-wide" };
      const sizeClass = sizeMap[size] || "bento-normal";
      return `
        <a href="${url}" class="bento-card ${sizeClass} github-project reveal group" data-tilt>
          <div class="bento-content">
            <div class="bento-header">
                <span class="bento-tag">${tag}</span>
                <h3 class="bento-title group-hover:text-accent-indigo transition-colors">${title}</h3>
            </div>
            <p class="bento-desc">${desc}</p>
            <div class="bento-link group-hover:text-accent-indigo">
              View Project
            </div>
          </div>
          ${data.icon ? `<div class="bento-visual opacity-10 group-hover:opacity-20 transition-opacity">${data.icon}</div>` : ""}
        </a>
      `;
    }

    // 2. NOTE (GRID) LAYOUT
    if (layout === 'note') {
      const displayTag = tag || (data.tags && data.tags[0]) || 'Note';
      return `
        <a href="notes.html#${id}" class="group relative p-8 bg-secondary/20 border border-main/10 rounded-3xl hover:bg-secondary/40 hover:border-accent-rose/20 transition-all duration-500 reveal">
          <div class="flex justify-between items-start mb-6">
            <span class="text-[9px] font-bold uppercase tracking-[0.4em] text-accent-rose/60">${displayTag}</span>
            <span class="text-[9px] font-bold uppercase tracking-[0.3em] text-secondary/30">${date}</span>
          </div>
          <h3 class="text-xl md:text-2xl font-serif italic text-primary group-hover:text-accent-rose transition-colors mb-8">${title}</h3>
          <div class="flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 group-hover:text-primary transition-colors">
            Read Article <span class="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </div>
        </a>
      `;
    }

    // 3. RESOURCE (LIST) LAYOUT
    if (layout === 'resource') {
      return `
        <article class="resource-item group flex flex-col md:flex-row gap-8 py-8 border-b border-main/10 hover:bg-secondary/5 transition-all duration-300 transform reveal" data-resource-id="${id}" role="button" tabindex="0">
          ${thumbnail ? `
          <div class="shrink-0 w-full md:w-48 h-32 overflow-hidden rounded-2xl bg-tertiary/10">
              <img src="${thumbnail}" alt="${title}" class="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" loading="lazy" />
          </div>` : ""}
          <div class="flex-1 flex flex-col justify-center">
              <div class="mb-2">
                <span class="text-[9px] font-black uppercase tracking-[0.4em] text-accent-indigo/60">${tag || 'Resource'}</span>
              </div>
              <h3 class="text-2xl font-bold tracking-tight text-primary mb-3 group-hover:text-accent-indigo transition-colors">${title}</h3>
              <p class="text-sm font-light text-secondary/60 leading-relaxed mb-4 max-w-2xl">${desc || readingTime || 'A curated resource for developers.'}</p>
              <div class="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-secondary/30">
                <span>${date}</span>
              </div>
          </div>
        </article>
      `;
    }

  },

  /**
   * Loading Skeleton Component
   */
  skeleton: (type = 'list') => {
    if (type === 'article') {
      return `
        <div class="animate-pulse space-y-8 max-w-3xl mx-auto">
          <div class="h-12 bg-secondary/40 rounded-xl w-3/4"></div>
          <div class="space-y-3">
             <div class="h-4 bg-secondary/20 rounded w-full"></div>
             <div class="h-4 bg-secondary/20 rounded w-5/6"></div>
             <div class="h-4 bg-secondary/20 rounded w-4/6"></div>
          </div>
          <div class="h-64 bg-secondary/20 rounded-3xl w-full"></div>
        </div>
      `;
    }
    return `<div class="animate-pulse bg-secondary/20 rounded-2xl h-32 w-full"></div>`;
  }
};

const components = {
  header: `
    <nav class="nav container" aria-label="Main Navigation">
      <a href="index.html" class="nav-logo" aria-label="Tanvir Rahman Home">tanvir.</a>
      <div class="nav-right">
        <ul class="nav-list" role="list">
          <li><a href="about.html" class="nav-link">about</a></li>
          <li><a href="projects.html" class="nav-link">projects</a></li>
          <li><a href="research.html" class="nav-link">research</a></li>
          <li><a href="notes.html" class="nav-link">notes</a></li>
          <li><a href="resources.html" class="nav-link">resources</a></li>
          <li><a href="contact.html" class="nav-link">contact</a></li>
        </ul>

        <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-nav">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </nav>
    <div class="mobile-nav" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div class="mobile-nav-content" role="list">
        <a href="index.html" class="mobile-nav-link">home</a>
        <a href="about.html" class="mobile-nav-link">about</a>
        <a href="projects.html" class="mobile-nav-link">projects</a>
        <a href="research.html" class="mobile-nav-link">research</a>
        <a href="notes.html" class="mobile-nav-link">notes</a>
        <a href="resources.html" class="mobile-nav-link">resources</a>
        <a href="contact.html" class="mobile-nav-link">contact</a>
      </div>
    </div>
  `,

  footer: `
    <div class="relative py-24 overflow-hidden bg-main font-sans">
      <!-- Ghost Typography (Dynamic Theme Opacity) -->
      <div class="absolute bottom-[-5%] left-[-2%] z-0 select-none pointer-events-none opacity-[0.06] dark:opacity-[0.02]">
        <h2 class="text-[12rem] md:text-[18rem] font-serif italic tracking-tighter leading-none">tanvir</h2>
      </div>

      <!-- Atmospheric Overlay (High Clarity) -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div class="absolute inset-0 bg-no-repeat bg-right bg-contain opacity-[0.4] dark:opacity-[0.25] grayscale mix-blend-multiply dark:mix-blend-luminosity transition-opacity duration-1000" style="background-image: url('./src/assets/images/footerbg.jpg')"></div>
        <div class="absolute inset-0 bg-gradient-to-l from-transparent via-main/20 to-main/95"></div>
      </div>

      <div class="container relative z-10 mx-auto px-6 max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <!-- Brand & Mission (Compact) -->
          <div class="lg:col-span-6 space-y-8">
            <div class="space-y-4">
              <a href="index.html" class="text-5xl font-serif italic tracking-tighter text-primary hover:text-accent-indigo transition-all duration-500">tanvir<span class="text-accent-indigo">.</span></a>
              <p class="text-lg md:text-xl font-light text-primary/90 leading-snug tracking-tight max-w-md">
                Architecting the <span class="italic text-accent-indigo font-serif">invisible systems</span> powering the web.
              </p>
            </div>
            
            <div class="flex flex-col space-y-3">
               <div class="flex items-center gap-3">
                 <span class="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span>
                 <span class="text-[9px] font-bold uppercase tracking-[0.4em] text-secondary/60">Currently in Dhaka, BD</span>
               </div>
               <a href="mailto:mailtanvirrahman@gmail.com" class="text-[9px] font-black uppercase tracking-[0.4em] text-accent-indigo hover:text-primary transition-colors py-1 group w-fit">
                 Get in Touch <span class="inline-block transition-transform group-hover:translate-x-1">→</span>
               </a>
            </div>
          </div>

          <!-- Quick Access Grid -->
          <div class="lg:col-span-6 grid grid-cols-3 gap-4 lg:gap-8">
            <div class="space-y-6">
              <h4 class="text-[9px] font-bold uppercase tracking-[0.5em] text-secondary/30">Explore</h4>
              <ul class="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-[0.15em] text-secondary/80">
                <li><a href="about.html" class="hover:text-primary transition-all">About</a></li>
                <li><a href="projects.html" class="hover:text-primary transition-all">Projects</a></li>
                <li><a href="notes.html" class="hover:text-primary transition-all">Writing</a></li>
              </ul>
            </div>

            <div class="space-y-6">
              <h4 class="text-[9px] font-bold uppercase tracking-[0.5em] text-secondary/30">Social</h4>
              <ul class="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-[0.15em] text-secondary/80">
                <li>
                  <a href="https://github.com/taanvirrahman" class="group flex items-center gap-2 hover:text-primary transition-all">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/tanvir_tweet" class="group flex items-center gap-2 hover:text-primary transition-all">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/muhammud-tanvir-rahman/" class="group flex items-center gap-2 hover:text-primary transition-all">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>

            <div class="space-y-6">
              <h4 class="text-[9px] font-bold uppercase tracking-[0.5em] text-secondary/30">Library</h4>
              <ul class="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-[0.15em] text-secondary/80">
                <li><a href="resources.html" class="hover:text-primary transition-all">Resources</a></li>
              </ul>
            </div>
          </div>

        </div>

        <!-- Meta Strip -->
         <div class="mt-20 pt-8 border-t border-main/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex gap-8">
              <span class="text-[9px] font-bold uppercase tracking-[0.4em] text-secondary/20">© ${new Date().getFullYear()} TANVIR</span>
            </div>
         </div>
      </div>
    </div>
  `
};

export const initComponents = () => {
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');

  if (header) {
    header.innerHTML = components.header;
    setActiveNavLink();
    initMobileMenu();
  }

  if (footer) {
    footer.innerHTML = components.footer;
  }
};

const initMobileMenu = () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (!menuBtn || !mobileNav) return;

  const toggleMenu = (forceClose = null) => {
    const isNowActive = forceClose === null
      ? !mobileNav.classList.contains('active')
      : !forceClose;

    menuBtn.setAttribute('aria-expanded', isNowActive);
    menuBtn.classList.toggle('active', isNowActive);
    mobileNav.classList.toggle('active', isNowActive);
    document.body.style.overflow = isNowActive ? 'hidden' : '';
  };

  menuBtn.addEventListener('click', () => toggleMenu());

  // Close menu when a link is clicked
  const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  // Close on ESC key
  globalThis.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      toggleMenu(true);
    }
  });
};

const setActiveNavLink = () => {
  const currentPath = globalThis.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const hrefBase = href.split('#')[0];
    let isActive = false;

    // Home logic
    if (hrefBase === 'index.html' || hrefBase === '') {
      isActive = (currentPath === 'index.html' || currentPath === '');
    } else {
      // Default exact match
      isActive = (hrefBase === currentPath);
    }

    if (isActive) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
};

/**
 * Shared Components System
 * Ensures consistent UI across all pages.
 */

const ICONS = {
  sun: `<svg class="sun-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg class="moon-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
};

const components = {
  header: `
    <nav class="nav container" aria-label="Main Navigation">
      <a href="index.html" class="nav-logo" aria-label="Tanvir Rahman Home">tanvir.</a>
      <div class="nav-right">
        <ul class="nav-list" role="list">
          <li><a href="research.html" class="nav-link">research</a></li>
          <li><a href="notes.html" class="nav-link">notes</a></li>
          <li><a href="resources.html" class="nav-link">resources</a></li>
          <li><a href="photography.html" class="nav-link">photography</a></li>
          <li><a href="store.html" class="nav-link">store</a></li>
          <li><a href="#contact" class="nav-link">contact</a></li>
        </ul>
        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark and light theme" title="Toggle theme">
          ${ICONS.sun}
          ${ICONS.moon}
        </button>
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
        <a href="research.html" class="mobile-nav-link">research</a>
        <a href="notes.html" class="mobile-nav-link">notes</a>
        <a href="resources.html" class="mobile-nav-link">resources</a>
        <a href="photography.html" class="mobile-nav-link">photography</a>
        <a href="store.html" class="mobile-nav-link">store</a>
        <a href="#contact" class="mobile-nav-link">contact</a>
      </div>
    </div>
  `,

  footer: `
    <div class="relative overflow-hidden text-white border-t-0 mt-0" role="contentinfo" 
         style="background-color: var(--bg-secondary); background-image: url('src/assets/images/footerbg.jpg'); background-size: 100% auto; background-repeat: no-repeat; background-position: top center;">
      
      <!-- Overlay -->
      <div class="absolute inset-0 z-[1] pointer-events-none" 
           style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.95));">
      </div>

      <div class="container relative z-[2] pt-10 pb-8 mx-auto px-[var(--gutter)] w-full max-w-[var(--max-width)]">
        
        <!-- Top CTA -->
        <div class="flex flex-col items-center gap-8 text-center max-w-3xl mx-auto mb-8">
          <h2 class="font-serif text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.1] font-medium tracking-tight text-white">Let's build something meaningful together.</h2>
          <a href="mailto:tanvir.rahman@aiub.edu" class="group inline-flex flex-col items-center gap-2 text-xl text-white/90 transition-transform duration-300 hover:-translate-y-0.5 no-underline" aria-label="Send an email to Tanvir Rahman">
            <span class="text-xs uppercase tracking-widest opacity-60">Drop a line →</span>
            <span class="font-mono border-b border-[var(--border-secondary)] pb-[2px] transition-colors group-hover:border-[var(--accent-indigo)]">mailtanvirrahman@gmail.com</span>
          </a>
        </div>
 
        <!-- Split Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-[var(--border-main)] py-6 mb-6">
          
          <!-- Left Column -->
          <div class="flex flex-col gap-6 text-left items-start">
            <h3 class="text-[2.5rem] font-extrabold tracking-tighter leading-[0.8] text-white/10 opacity-80 select-none relative" style="-webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);">
              TANVIR<span class="text-[1.5rem] align-super ml-1 text-white/60 tracking-normal" style="-webkit-text-stroke: 0;">®</span>
            </h3>
            <div class="font-mono text-sm text-white/60 leading-relaxed">
              <p>Software Engineer Aspiring</p>
              <p>Dhaka</p>
            </div>
            <a href="https://maps.google.com/?q=Dhaka" target="_blank" rel="noopener noreferrer" class="text-[0.95rem] font-semibold uppercase tracking-wider text-white/95 border-b border-transparent transition-colors hover:text-[var(--accent-indigo)] hover:border-[var(--accent-indigo)] w-fit">View on Map →</a>
          </div>
 
          <!-- Right Column -->
          <div class="flex flex-col gap-6 text-left items-start md:items-end md:text-right">
            <h3 class="text-[2.5rem] font-extrabold tracking-tighter leading-[0.8] text-white/10 opacity-80 select-none relative" style="-webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);">
              OPEN TO<span class="text-[1.5rem] align-super ml-1 text-white/60 tracking-normal" style="-webkit-text-stroke: 0;">work</span>
            </h3>
            <div class="font-mono text-sm text-white/60 leading-relaxed">
              <p>Freelance & Collaboration</p>
              <p>Remote / Worldwide</p>
            </div>
            <a href="notes.html" class="text-[0.95rem] font-semibold uppercase tracking-wider text-white/95 border-b border-transparent transition-colors hover:text-[var(--accent-indigo)] hover:border-[var(--accent-indigo)] w-fit">Read Notes →</a>
            <button type="button" class="newsletter-trigger text-[0.95rem] font-semibold uppercase tracking-wider text-white/95 border-b border-transparent transition-colors hover:text-[var(--accent-indigo)] hover:border-[var(--accent-indigo)] w-fit bg-transparent border-0 p-0 cursor-pointer">Subscribe →</button>
          </div>
 
        </div>
 
        <!-- Bottom Bar -->
        <div class="flex flex-wrap justify-between items-end gap-8 mb-4">
          <p class="text-sm text-white/60 font-mono">© ${new Date().getFullYear()} Tanvir Rahman</p>
          <div class="flex flex-wrap gap-8" role="navigation" aria-label="Footer Navigation">
            <a href="index.html" class="text-base text-white/85 uppercase tracking-wider font-medium relative hover:text-white transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-[width] after:duration-300 hover:after:w-full">Home</a>
            <a href="notes.html" class="text-base text-white/85 uppercase tracking-wider font-medium relative hover:text-white transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-[width] after:duration-300 hover:after:w-full">Notes</a>
            <a href="resources.html" class="text-base text-white/85 uppercase tracking-wider font-medium relative hover:text-white transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-[width] after:duration-300 hover:after:w-full">Resources</a>
            <a href="research.html" class="text-base text-white/85 uppercase tracking-wider font-medium relative hover:text-white transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-[width] after:duration-300 hover:after:w-full">Research</a>
            <a href="store.html" class="text-base text-white/85 uppercase tracking-wider font-medium relative hover:text-white transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-[width] after:duration-300 hover:after:w-full">Store</a>
          </div>
        </div>
 
        <!-- Social Pills -->
        <div class="flex flex-wrap gap-3" role="list" aria-label="Social Links">
          <a href="https://github.com/taanvirrahman" target="_blank" rel="noopener noreferrer" class="px-6 py-2.5 border border-[var(--border-main)] rounded-full text-sm text-white/90 bg-[rgba(var(--bg-secondary-rgb),0.5)] transition-all hover:bg-white hover:text-[var(--bg-main)] hover:-translate-y-0.5 hover:shadow-lg">GitHub</a>
          <a href="https://x.com/tanvir_tweet" target="_blank" rel="noopener noreferrer" class="px-6 py-2.5 border border-[var(--border-main)] rounded-full text-sm text-white/90 bg-[rgba(var(--bg-secondary-rgb),0.5)] transition-all hover:bg-white hover:text-[var(--bg-main)] hover:-translate-y-0.5 hover:shadow-lg">X</a>
          <a href="https://www.linkedin.com/in/muhammud-tanvir-rahman/" target="_blank" rel="noopener noreferrer" class="px-6 py-2.5 border border-[var(--border-main)] rounded-full text-sm text-white/90 bg-[rgba(var(--bg-secondary-rgb),0.5)] transition-all hover:bg-white hover:text-[var(--bg-main)] hover:-translate-y-0.5 hover:shadow-lg">LinkedIn</a>
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
    const isNowActive = forceClose !== null ? !forceClose : !mobileNav.classList.contains('active');

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
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      toggleMenu(true);
    }
  });
};

const setActiveNavLink = () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const hrefBase = href.split('#')[0];
    let isActive = false;

    // Home logic
    if (hrefBase === 'index.html' || hrefBase === '') {
      isActive = (currentPath === 'index.html' || currentPath === '');
    } else if (hrefBase === 'store.html') {
      // Product section logic
      isActive = (currentPath === 'store.html' || currentPath === 'digital-product.html');
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

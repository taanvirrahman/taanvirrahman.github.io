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
          <li><a href="about.html" class="nav-link">about</a></li>
          <li><a href="projects.html" class="nav-link">work</a></li>
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
        <a href="about.html" class="mobile-nav-link">about</a>
        <a href="projects.html" class="mobile-nav-link">work</a>
        <a href="notes.html" class="mobile-nav-link">notes</a>
        <a href="resources.html" class="mobile-nav-link">resources</a>
        <a href="photography.html" class="mobile-nav-link">photography</a>
        <a href="store.html" class="mobile-nav-link">store</a>
        <a href="#contact" class="mobile-nav-link">contact</a>
      </div>
    </div>
  `,

  footer: `
    <footer class="relative pt-24 pb-12 overflow-hidden bg-main font-sans" role="contentinfo">
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
                <li><a href="https://github.com/taanvirrahman" class="hover:text-primary transition-all">GitHub</a></li>
                <li><a href="https://x.com/tanvir_tweet" class="hover:text-primary transition-all">Twitter</a></li>
              <li><a href="https://www.linkedin.com/in/muhammud-tanvir-rahman/" class="hover:text-primary transition-all">LinkedIn</a></li>
              </ul>
            </div>

            <div class="space-y-6">
              <h4 class="text-[9px] font-bold uppercase tracking-[0.5em] text-secondary/30">Library</h4>
              <ul class="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-[0.15em] text-secondary/80">
                <li><a href="photography.html" class="hover:text-primary transition-all">Photography</a></li>
                <li><a href="resources.html" class="hover:text-primary transition-all">Resources</a></li>
                <li><button class="newsletter-trigger hover:text-primary transition-all text-left uppercase">Newsletter</button></li>
              </ul>
            </div>
          </div>

        </div>

        <!-- Meta Strip -->
        <div class="mt-20 pt-8 border-t border-main/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <div class="flex gap-8">
             <span class="text-[9px] font-bold uppercase tracking-[0.4em] text-secondary/20">© ${new Date().getFullYear()} TANVIR</span>
             <span class="text-[9px] font-bold uppercase tracking-[0.4em] text-secondary/20">Precision Build</span>
           </div>
           
           <div class="text-[8px] font-bold uppercase tracking-[0.4em] text-secondary/20 font-mono">
               23.8103N // 90.4125E
           </div>
        </div>
      </div>
    </footer>
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

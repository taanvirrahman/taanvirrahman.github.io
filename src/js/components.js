/**
 * Shared Components System
 * Ensures consistent UI across all pages.
 */

const components = {
  header: `
    <nav class="nav container" aria-label="Main Navigation">
      <a href="index.html" class="nav-logo" aria-label="Tanvir Rahman Home">tanvir.</a>
      <div class="nav-right">
        <ul class="nav-list" role="list">
          <li><a href="research.html" class="nav-link">research</a></li>
          <li><a href="notes.html" class="nav-link">notes</a></li>
          <li><a href="photography.html" class="nav-link">photography</a></li>
          <li><a href="#contact" class="nav-link">contact</a></li>
        </ul>
        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark and light theme" title="Toggle theme">
          <svg class="sun-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="moon-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
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
        <a href="photography.html" class="mobile-nav-link">photography</a>
        <a href="#contact" class="mobile-nav-link">contact</a>
      </div>
    </div>
  `,

  footer: `
    <div class="footer-brutalist" role="contentinfo">
      <div class="footer-overlay"></div>
      <div class="container">
        
        <div class="footer-top-centered">
          <h2 class="footer-cta-text">Let's build something meaningful together.</h2>
          <a href="mailto:tanvir.rahman@aiub.edu" class="footer-mail-link" aria-label="Send an email to Tanvir Rahman">
            <span class="mail-prefix">Drop a line →</span>
            <span class="underline">mailtanvirrahman@gmail.com</span>
          </a>
        </div>
 
        <div class="footer-split-grid">
          
          <div class="footer-col">
            <h3 class="footer-brand-large">TANVIR<span class="sup">®</span></h3>
            <div class="footer-address">
              <p>Software Engineer Aspiring</p>
              <p>Dhaka</p>
            </div>
            <a href="https://maps.google.com/?q=Dhaka" target="_blank" rel="noopener noreferrer" class="footer-small-link">View on Map →</a>
          </div>
 
          <div class="footer-col">
            <h3 class="footer-brand-large">OPEN TO<span class="sup">work</span></h3>
            <div class="footer-address">
              <p>Freelance & Collaboration</p>
              <p>Remote / Worldwide</p>
            </div>
            <a href="notes.html" class="footer-small-link">Read Notes →</a>
          </div>
 
        </div>
 
        <div class="footer-bottom-bar">
          <p class="footer-copy">© ${new Date().getFullYear()} Tanvir Rahman</p>
          <div class="footer-nav-links" role="navigation" aria-label="Footer Navigation">
            <a href="index.html" class="footer-nav-link">Home</a>
            <a href="notes.html" class="footer-nav-link">Notes</a>
            <a href="research.html" class="footer-nav-link">Research</a>
          </div>
        </div>
 
        <div class="footer-pills" role="list" aria-label="Social Links">
          <a href="https://github.com/taanvirrahman" target="_blank" rel="noopener noreferrer" class="social-pill pill-1">GitHub</a>
          <a href="https://x.com/tanvir_tweet" target="_blank" rel="noopener noreferrer" class="social-pill pill-2">Twitter</a>
          <a href="https://www.linkedin.com/in/muhammud-tanvir-rahman/" target="_blank" rel="noopener noreferrer" class="social-pill pill-3">LinkedIn</a>
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

  // Set active state for mobile nav links
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    const hrefBase = href ? href.split('#')[0] : '';
    if (hrefBase === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
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
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const hrefBase = href.split('#')[0];
    if (hrefBase === currentPath || (currentPath === 'index.html' && (href === '#' || href === 'index.html'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
};

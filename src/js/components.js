/**
 * Shared Components System
 * Ensures consistent UI across all pages.
 */

const components = {
  header: `
    <nav class="nav container">
      <a href="index.html" class="nav-logo">tanvir.</a>
      <div class="nav-right">
        <ul class="nav-list">
          <li><a href="index.html#projects" class="nav-link">projects</a></li>
          <li><a href="research.html" class="nav-link">research</a></li>
          <li><a href="notes.html" class="nav-link">notes</a></li>
          <li><a href="photography.html" class="nav-link">photography</a></li>
          <li><a href="#contact" class="nav-link">contact</a></li>
        </ul>
        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
          <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
      </div>
    </nav>
  `,

  footer: `
    <div class="container">
      <div class="footer-top">
        <div class="footer-subscribe">
          <h2 class="footer-subscribe-title">Subscribe to notes.</h2>
          <p class="footer-subscribe-desc">Get updates on AI, design, and art.</p>
          <form class="footer-form">
            <input type="email" placeholder="your@email.com" required class="footer-input" />
            <button type="submit" class="footer-submit">Join</button>
          </form>
        </div>
        <div class="footer-nav">
          <div class="footer-col">
            <h4 class="footer-heading">Navigate</h4>
            <a href="index.html#projects" class="footer-link">Projects</a>
            <a href="notes.html" class="footer-link">Notes</a>
            <a href="photography.html" class="footer-link">Photography</a>
          </div>
          <div class="footer-col">
            <h4 class="footer-heading">Connect</h4>
            <a href="https://github.com/taanvirrahman" target="_blank" class="footer-link">GitHub</a>
            <a href="https://linkedin.com/in/taanvirrahman" target="_blank" class="footer-link">LinkedIn</a>
            <a href="https://twitter.com/taanvirrahman" target="_blank" class="footer-link">Twitter</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">&copy; ${new Date().getFullYear()} Tanvir Rahman</p>
        <p class="footer-made">Made with intention</p>
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
  }

  if (footer) {
    footer.innerHTML = components.footer;
  }
};

const setActiveNavLink = () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const hrefBase = href.split('#')[0];
    if (hrefBase === currentPath || (currentPath === 'index.html' && (href === '#' || href === 'index.html'))) {
      link.classList.add('active');
    }
  });
};

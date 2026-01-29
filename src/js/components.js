/**
 * Shared Components System
 * Ensures consistent UI across all pages.
 */

const components = {
  header: `
    <nav class="nav container">
      <a href="index.html" class="nav-logo">tanvir</a>
      <ul class="nav-list">
        <li><a href="index.html#projects" class="nav-link">projects</a></li>
        <li><a href="notes.html" class="nav-link">notes</a></li>
        <li><a href="photography.html" class="nav-link">photography</a></li>
        <li><a href="#contact" class="nav-link">contact</a></li>
      </ul>
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

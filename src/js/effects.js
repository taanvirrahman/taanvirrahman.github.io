export const initEffects = () => {
  const progressBar = document.getElementById("progress-bar");

  // Keyboard Accessibility for cards
  document.querySelectorAll('[role="button"]').forEach((btn) => {
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Premium Header Scroll Effect
  const header = document.querySelector(".header");
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // Scroll Progress Logic
  if (progressBar) {
    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const winScroll =
              window.scrollY || document.documentElement.scrollTop;
            const height =
              document.documentElement.scrollHeight -
              document.documentElement.clientHeight;
            const scrolled = height > 0 ? winScroll / height : 0;
            progressBar.style.transform = `scaleX(${scrolled})`;
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  // Reveal Animation Logic (Intersection Observer)
  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  };

  _revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.1, // Reduced for better triggering on large sections
  });

  const startObserving = () => {
    document.querySelectorAll(".reveal").forEach((el) => {
      _revealObserver.observe(el);
    });
  };

  // Only start observing after splash screen is gone
  if (document.body.classList.contains("loaded")) {
    startObserving();
  } else {
    window.addEventListener("page-reveal", startObserving, { once: true });
  }
};

// Module-level observer reference (no global pollution)
let _revealObserver = null;

/**
 * Observe a new element for reveal animation.
 * Must call initEffects() first.
 */
export const observeReveal = (el) => {
  if (_revealObserver) {
    _revealObserver.observe(el);
  }
};

export const initEffects = () => {
  const cursor = document.querySelector(".custom-cursor");
  const progressBar = document.getElementById("progress-bar");

  // Smooth Cursor Lerp Logic
  let mouseX = 0,
    mouseY = 0;
  let ballX = 0,
    ballY = 0;
  let hasMoved = false;
  const speed = 0.15; // Smoothness factor

  if (cursor && window.innerWidth > 768) {
    document.body.classList.add("has-custom-cursor");

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        ballX = mouseX;
        ballY = mouseY;
        cursor.classList.remove("is-hidden");
        hasMoved = true;
      }
    });

    const animateCursor = () => {
      if (hasMoved) {
        const distX = mouseX - ballX;
        const distY = mouseY - ballY;

        if (Math.abs(distX) > 0.1 || Math.abs(distY) > 0.1) {
          ballX = ballX + distX * speed;
          ballY = ballY + distY * speed;

          const isHovering = cursor.classList.contains("hover");
          const scale = isHovering ? 4 : 1;

          cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%) scale(${scale})`;
        }
      }

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover Delegation
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("a, button, .project-card, .skill-item")) {
        cursor.classList.add("hover");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("a, button, .project-card, .skill-item")) {
        cursor.classList.remove("hover");
      }
    });
  }

  // Keyboard Accessibility for cards
  document.querySelectorAll('[role="button"]').forEach((btn) => {
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

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

  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.1, // Reduced for better triggering on large sections
  });

  window.revealObserver = revealObserver; // Expose to global for dynamic elements

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });
};

export const observeReveal = (el) => {
  if (window.revealObserver) {
    window.revealObserver.observe(el);
  }
};

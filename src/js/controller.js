import * as model from "./model.js";
import * as view from "./view.js";
import { initEffects, observeReveal } from "./effects.js";
import { initComponents } from "./components.js";

/**
 * Setup click delegation for bento cards.
 * Follows MVC: Controller handles events, delegates to View actions.
 */
const initBentoListeners = () => {
  document.querySelectorAll(".bento-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest("a")) {
        const link = card.querySelector(".bento-link");
        if (link) link.click();
      }
    });

    // Keyboard accessibility for bento cards
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (!e.target.closest("a")) {
          e.preventDefault();
          const link = card.querySelector(".bento-link");
          if (link) link.click();
        }
      }
    });
  });
};

/**
 * Setup click delegation for certification cards.
 * Uses data-url attribute instead of inline onclick (separation of concerns).
 */
const initCertListeners = () => {
  document.querySelectorAll(".cert-item").forEach((card) => {
    card.addEventListener("click", (e) => {
      const url = card.dataset.url;
      if (url) {
        window.open(url, "_blank");
      }
    });
    // Keyboard accessibility
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const url = card.dataset.url;
        if (url) {
          window.open(url, "_blank");
        }
      }
    });
  });
};

export const init = async () => {
  // Initialize model (pre-fetch IP, etc.)
  model.initModel();

  // Theme initialization - use getter
  view.applyTheme(model.getTheme());

  // Bootstrap global components & effects
  initComponents();
  view.refreshElements(); // Crucial: Update pointers after header/footer injection
  initEffects();

  // Theme Toggle Listener
  if (view.elements.themeToggle) {
    view.elements.themeToggle.addEventListener("click", () => {
      const currentTheme = model.getTheme();
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      model.setTheme(newTheme);
      view.applyTheme(newTheme);
    });
  }

  // Feature: Latest Note Badge (Hero)
  if (view.elements.latestNoteBadge) {
    const posts = await model.fetchBlogPosts();
    if (posts.length > 0) {
      const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
      const latestPost = sortedPosts[0];
      view.renderLatestNoteBadge(latestPost);

      view.elements.latestNoteBadge.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = `notes.html#${latestPost.id}`;
      });
    }
  }

  // Load config-based content (homepage only)
  if (view.elements.bentoGrid) {
    const config = await model.fetchConfig();
    if (config) {
      view.renderProjects(config.projects);
      view.renderSkills(config.skills);
      view.renderCertifications(config.certifications);
      view.renderEducation(config.education);

      // Re-observe new elements
      document.querySelectorAll(".reveal").forEach((el) => {
        observeReveal(el);
      });

      // Setup listeners for dynamic content
      initBentoListeners();
      initCertListeners();
    }
  }

  // Feature: Latest Notes Section (Footer Preview)
  if (view.elements.latestNotesGrid) {
    const posts = await model.fetchBlogPosts();
    if (posts.length > 0) {
      const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
      view.renderLatestNotes(sortedPosts.slice(0, 4));
    } else {
      view.renderLatestNotes([]);
    }
  }

  // Research list initialization
  if (view.elements.researchList) {
    const papers = await model.fetchResearchPapers();
    view.renderResearchList(papers);

    document.querySelectorAll(".research-item.reveal").forEach((el) => {
      observeReveal(el);
    });
  }

  // Initial render - fetch then render
  if (view.elements.blogList) {
    try {
      console.log("Fetching notes...");
      const posts = await model.fetchBlogPosts();
      console.log(`Fetched ${posts.length} notes`);
      view.renderBlogList(posts);

      // Re-observe dynamically added reveal elements
      const blogItems = document.querySelectorAll(".blog-item.reveal");
      console.log(`Setting up reveal for ${blogItems.length} items`);
      blogItems.forEach((el) => {
        observeReveal(el);
      });
    } catch (error) {
      console.error("Failed to initialize blog list:", error);
    }
  }

  // Subscribe to Hi interactions
  if (view.elements.sayHiBtn) {
    view.elements.sayHiBtn.addEventListener("click", (e) => {
      e.preventDefault();
      view.showMessageInput();
    });
  }

  if (view.elements.backBtn) {
    view.elements.backBtn.addEventListener("click", () => {
      view.hideMessageInput();
    });
  }

  if (view.elements.messageInput) {
    view.elements.messageInput.addEventListener("input", (e) => {
      const text = e.target.value.trim();
      model.updateMessage(text);
      view.toggleSendButton(text.length > 0);
    });
  }

  if (view.elements.sendBtn) {
    view.elements.sendBtn.addEventListener("click", async () => {
      const message = model.getMessage();
      if (!message) return;

      // Visual feedback: disabling button during submission
      const originalText = view.elements.sendBtn.innerText;
      view.elements.sendBtn.innerText = "sending...";
      view.elements.sendBtn.disabled = true;

      const success = await model.submitToSheet({
        type: "Message",
        message: message
      });

      if (success) {
        model.markAsSent();
        view.triggerConfetti();
        view.showThankYou();
      } else {
        view.elements.sendBtn.innerText = "failed";
        setTimeout(() => {
          view.elements.sendBtn.innerText = originalText;
          view.elements.sendBtn.disabled = false;
        }, 2000);
      }
    });
  }



  // Blog interactions
  const handleRouting = async () => {
    if (!view.elements.blogList) return;

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Show loading skeleton
      view.showSkeleton();
      const posts = await model.fetchBlogPosts();
      const post = await model.fetchBlogPost(hash);
      if (post) {
        view.showBlogPost(post.content);
      } else {
        // Fallback or 404
        window.location.hash = "";
      }
    } else {
      view.hideBlogPost();
    }
  };

  if (view.elements.blogList) {
    // Listen for deep links
    window.addEventListener("hashchange", handleRouting);
    // Initial check
    handleRouting();

    view.elements.blogList.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const postId = link.dataset.postId;
      if (postId) {
        e.preventDefault();
        window.location.hash = postId;
      }
    });
  }

  if (view.elements.closeBlog) {
    view.elements.closeBlog.addEventListener("click", () => {
      window.location.hash = "";
    });
  }

  if (view.elements.copyLinkBtn) {
    view.elements.copyLinkBtn.addEventListener("click", () => {
      view.copyToClipboard(window.location.href);
    });
  }

  if (view.elements.subscribeForm) {
    view.elements.subscribeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = view.elements.subscribeForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value : "";

      if (!email) return;

      // Visual feedback
      const originalBtnText = view.elements.subscribeBtn.innerText;
      view.elements.subscribeBtn.innerText = "...";
      view.elements.subscribeBtn.disabled = true;

      const success = await model.submitToSheet({
        type: "Subscription",
        email: email
      });

      if (success) {
        view.showSubscribeSuccess();
        view.triggerConfetti();
        if (emailInput) emailInput.value = "";
      } else {
        view.elements.subscribeBtn.innerText = "Error";
      }

      setTimeout(() => {
        view.elements.subscribeBtn.innerText = originalBtnText;
        view.elements.subscribeBtn.disabled = false;
      }, 2000);
    });
  }

  // Feature: Photography Gallery
  if (view.elements.photoGallery) {
    const photos = await model.fetchPhotos();
    view.renderPhotographyGallery(photos);

    // Re-observe new gallery items
    document.querySelectorAll(".gallery-item.reveal").forEach((el) => {
      observeReveal(el);
    });

    initPhotographyListeners(photos);
  }
};

/**
 * Photography specific logic: Filters and Lightbox
 */
let lightboxState = {
  currentIndex: 0,
  visiblePhotos: []
};

const initPhotographyListeners = (allPhotos) => {
  const filterPills = document.querySelectorAll(".filter-pill");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const lightboxCategory = document.querySelector(".lightbox-category");
  const lightboxLocation = document.querySelector(".lightbox-location");
  const lightboxCurrent = document.getElementById("lightbox-current");
  const gallery = view.elements.photoGallery;

  lightboxState.visiblePhotos = [...allPhotos];

  // 1. Filter Logic
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const filter = pill.dataset.filter;
      const items = document.querySelectorAll(".gallery-item");

      let visibleIndices = [];
      items.forEach((item, index) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.classList.remove("hidden");
          visibleIndices.push(index);
        } else {
          item.classList.add("hidden");
        }
      });

      lightboxState.visiblePhotos = visibleIndices.map(idx => allPhotos[idx]);
      document.getElementById("lightbox-total").textContent = lightboxState.visiblePhotos.length;
    });
  });

  // 2. Lightbox Open Logic (Delegated)
  gallery.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (!item || item.classList.contains("hidden")) return;

    const indexInAll = parseInt(item.dataset.index);
    const photo = allPhotos[indexInAll];
    const indexInVisible = lightboxState.visiblePhotos.findIndex(p => p.id === photo.id);

    openLightbox(indexInVisible);
  });

  const openLightbox = (index) => {
    lightboxState.currentIndex = index;
    updateLightboxUI();

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const updateLightboxUI = () => {
    const photo = lightboxState.visiblePhotos[lightboxState.currentIndex];
    if (!photo) return;

    lightboxImg.style.opacity = "0";
    setTimeout(() => {
      lightboxImg.src = photo.src;
      lightboxImg.alt = photo.alt;
      lightboxTitle.textContent = photo.title;
      lightboxCategory.textContent = photo.category;
      lightboxLocation.textContent = photo.location;
      lightboxCurrent.textContent = lightboxState.currentIndex + 1;
      lightboxImg.style.opacity = "1";
    }, 200);
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const navigateLightbox = (direction) => {
    lightboxState.currentIndex += direction;
    if (lightboxState.currentIndex < 0) lightboxState.currentIndex = lightboxState.visiblePhotos.length - 1;
    if (lightboxState.currentIndex >= lightboxState.visiblePhotos.length) lightboxState.currentIndex = 0;
    updateLightboxUI();
  };

  // 3. Lightbox Controls
  document.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
  document.querySelector(".lightbox-backdrop")?.addEventListener("click", closeLightbox);
  document.querySelector(".lightbox-prev")?.addEventListener("click", () => navigateLightbox(-1));
  document.querySelector(".lightbox-next")?.addEventListener("click", () => navigateLightbox(1));

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });
};

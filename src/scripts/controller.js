import * as model from "./model.js";
import * as view from "./view.js";
import { observeReveal } from "./effects.js";

/**
 * Setup click delegation for bento cards.
 * Follows MVC: Controller handles events, delegates to View actions.
 */
// Click listeners removed as projects are now native links

/**
 * Setup click delegation for certification cards.
 * Uses data-url attribute instead of inline onclick (separation of concerns).
 */
const initCertListeners = () => {
  document.querySelectorAll(".cert-item").forEach((card) => {
    card.addEventListener("click", (e) => {
      const url = card.dataset.url;
      if (url) {
        globalThis.open(url, "_blank");
      }
    });
    // Keyboard accessibility
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const url = card.dataset.url;
        if (url) {
          globalThis.open(url, "_blank");
        }
      }
    });
  });
};

export const init = async () => {
  await initHeroBadges();
  await initDynamicContent();
  initContactInteractions();
  initNewsletterInteraction();
  initBlogRouting();
  await initPhotography();
  initProductPurchaseLogging();
};

const initHeroBadges = async () => {
  // Feature: Latest Note Badge (Hero)
  if (view.elements.latestNoteBadge) {
    const posts = await model.fetchBlogPosts();
    if (posts.length > 0) {
      const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
      view.renderLatestNoteBadge(sortedPosts[0]);
    }
  }

  // Feature: Latest Research Badge (Hero)
  if (view.elements.latestResearchBadge) {
    const papers = await model.fetchResearchPapers();
    if (papers.length > 0) {
      view.renderLatestResearchBadge(papers[0]);
    }
  }
};

const initDynamicContent = async () => {
  // Load config-based content (homepage only)
  if (view.elements.bentoGrid) {
    const [config, projects] = await Promise.all([
      model.fetchConfig(),
      model.fetchProjects()
    ]);

    if (config) {
      view.renderProjects(projects);
      view.renderSkills(config.skills);
      view.renderCertifications(config.certifications);
      view.renderEducation(config.education);
      view.renderAbout(config.about);

      document.querySelectorAll(".reveal").forEach((el) => {
        observeReveal(el);
      });

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
      const posts = await model.fetchBlogPosts();
      view.renderBlogList(posts);
      document.querySelectorAll(".blog-item.reveal").forEach((el) => {
        observeReveal(el);
      });
    } catch (error) {
      console.error("Failed to initialize blog list:", error);
    }
  }
};

const initContactInteractions = () => {
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
};

const initBlogRouting = () => {
  const handleRouting = async () => {
    if (!view.elements.blogList) return;

    const hash = globalThis.location.hash.replace("#", "");
    if (hash) {
      view.showSkeleton();
      const post = await model.fetchBlogPost(hash);
      if (post) {
        view.showBlogPost(post.content);
      } else {
        globalThis.location.hash = "";
      }
    } else {
      view.hideBlogPost();
    }
  };

  if (view.elements.blogList) {
    globalThis.addEventListener("hashchange", handleRouting);
    handleRouting();

    view.elements.blogList.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const postId = link.dataset.postId;
      if (postId) {
        e.preventDefault();
        globalThis.location.hash = postId;
      }
    });
  }

  if (view.elements.closeBlog) {
    view.elements.closeBlog.addEventListener("click", () => {
      globalThis.location.hash = "";
    });
  }

  if (view.elements.copyLinkBtn) {
    view.elements.copyLinkBtn.addEventListener("click", () => {
      view.copyToClipboard(globalThis.location.href);
    });
  }
};

const initNewsletterInteraction = () => {
  if (view.elements.subscribeForm) {
    view.elements.subscribeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = view.elements.subscribeForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value : "";

      if (!email) return;

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
};

const initPhotography = async () => {
  if (view.elements.photoGallery) {
    const photos = await model.fetchPhotos();
    view.renderPhotographyGallery(photos);

    document.querySelectorAll(".gallery-item.reveal").forEach((el) => {
      observeReveal(el);
    });

    initPhotographyListeners(photos);
  }
};

const initProductPurchaseLogging = () => {
  globalThis.addEventListener("initiate-purchase", async (e) => {
    const { product, type, email, paymentMethod, senderNumber, transactionId } = e.detail;
    await model.submitToSheet({
      type: "Product Purchase",
      product: product || "Unknown Product",
      purchaseType: type,
      email: email,
      paymentMethod,
      senderNumber,
      transactionId
    });
  });
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

    const indexInAll = Number.parseInt(item.dataset.index);
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

import * as model from "./model.js";
import * as view from "./view.js";
import { initEffects, observeReveal } from "./effects.js";
import { initComponents } from "./components.js";

const initBentoListeners = () => {
  document.querySelectorAll(".bento-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest("a")) {
        const link = card.querySelector(".bento-link");
        if (link) link.click();
      }
    });
  });
};

const initCertListeners = () => {
  document.querySelectorAll(".cert-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest("a")) {
        const link = card.querySelector(".cert-link");
        if (link) link.click();
      }
    });
  });
};

export const init = async () => {
  // Theme initialization
  view.applyTheme(model.state.theme);

  // Bootstrap global components & effects
  initComponents();
  view.refreshElements(); // Crucial: Update pointers after header/footer injection
  initEffects();

  // Theme Toggle Listener
  if (view.elements.themeToggle) {
    view.elements.themeToggle.addEventListener("click", () => {
      const newTheme = model.state.theme === "dark" ? "light" : "dark";
      model.setTheme(newTheme);
      view.applyTheme(newTheme);
    });
  }

  // Feature: Latest Note Badge & Dynamic Content (for homepage)
  if (view.elements.latestNoteBadge) {
    // Load Projects and Skills from config
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
      const message = model.state.message;
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
};

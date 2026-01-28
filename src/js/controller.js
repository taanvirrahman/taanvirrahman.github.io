import * as model from "./model.js";
import * as view from "./view.js";
import { initEffects, observeReveal } from "./effects.js";

export const init = async () => {
  // Bootstrap global effects
  initEffects();

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
    view.elements.sendBtn.addEventListener("click", () => {
      model.markAsSent();
      view.triggerConfetti();
      view.showThankYou();
    });
  }

  // Project cards - navigate on whole card click
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      // If user clicked the link itself, let the link handle it (or common behavior)
      // Otherwise, trigger the link.
      if (!e.target.closest("a")) {
        const link = card.querySelector(".project-link");
        if (link) link.click();
      }
    });
  });

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
};

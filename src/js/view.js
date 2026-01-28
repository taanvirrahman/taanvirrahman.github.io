export const elements = {
  sayHiBtn: document.getElementById("say-hi-btn"),
  messageContainer: document.getElementById("message-container"),
  backBtn: document.getElementById("back-btn"),
  messageInput: document.getElementById("message-input"),
  sendBtn: document.getElementById("send-btn"),
  blogList: document.getElementById("blog-list"),
  blogContent: document.getElementById("blog-content"),
  closeBlog: document.getElementById("close-blog"),
  copyLinkBtn: document.getElementById("copy-link"),
  markdownContainer: document.getElementById("markdown-container"),
  subscribeForm: document.querySelector(".subscribe-form"),
  subscribeBtn: document.querySelector(".subscribe-btn"),
  latestNoteBadge: document.getElementById("latest-note-badge"),
};

export const renderBlogList = (posts) => {
  if (!elements.blogList) return;

  if (posts.length === 0) {
    elements.blogList.innerHTML =
      '<p class="loading-indicator">No notes found or error loading notes.</p>';
    return;
  }

  elements.blogList.innerHTML = posts
    .map(
      (post, index) => `
    <article class="blog-item reveal" style="transition-delay: ${index * 100}ms">
      <div class="blog-meta">
        <span class="blog-date">${post.date}</span>
        <span class="blog-reading-time">${post.readingTime}</span>
      </div>
      <h3 class="blog-title"><a href="#${post.id}" data-post-id="${post.id}">${post.title}</a></h3>
      <div class="blog-tags">
        ${post.tags.map((tag) => `<span class="blog-tag">${tag}</span>`).join("")}
      </div>
    </article>
  `,
    )
    .join("");
};

export const renderLatestNoteBadge = (note) => {
  if (!elements.latestNoteBadge || !note) return;

  const badgeText = elements.latestNoteBadge.querySelector(".badge-text");
  if (badgeText) badgeText.innerText = note.title;

  elements.latestNoteBadge.href = `#${note.id}`;
  elements.latestNoteBadge.classList.remove("hidden");
};

export const showBlogPost = (content) => {
  if (!elements.blogList) return;
  elements.blogList.classList.add("hidden");
  elements.blogContent.classList.remove("hidden");

  // High-performance rendering with a refined editorial fade + transition
  elements.markdownContainer.style.opacity = "0";
  elements.markdownContainer.style.transform = "translateY(20px)";
  elements.markdownContainer.innerHTML = marked.parse(content);

  // Re-scroll to top of content
  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => {
    elements.markdownContainer.style.opacity = "1";
    elements.markdownContainer.style.transform = "translateY(0)";
    elements.markdownContainer.style.transition =
      "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
  }, 100);
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = elements.copyLinkBtn.innerText;
    elements.copyLinkBtn.innerText = "copied!";
    setTimeout(() => {
      elements.copyLinkBtn.innerText = originalText;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy link:", err);
  }
};

export const showSkeleton = () => {
  if (!elements.markdownContainer) return;
  elements.blogList.classList.add("hidden");
  elements.blogContent.classList.remove("hidden");
  elements.markdownContainer.innerHTML = `
    <div class="skeleton-title"></div>
    <div class="skeleton-line" style="width: 100%"></div>
    <div class="skeleton-line" style="width: 90%"></div>
    <div class="skeleton-line" style="width: 95%"></div>
    <div class="skeleton-line" style="width: 40%"></div>
  `;
};

export const hideBlogPost = () => {
  if (elements.blogContent) elements.blogContent.classList.add("hidden");
  if (elements.blogList) elements.blogList.classList.remove("hidden");
};

export const showMessageInput = () => {
  elements.sayHiBtn.classList.add("hidden");
  elements.messageContainer.classList.remove("hidden");
  elements.messageInput.focus();
};

export const hideMessageInput = () => {
  elements.messageContainer.classList.add("hidden");
  elements.sayHiBtn.classList.remove("hidden");
  elements.messageInput.value = "";
  elements.sendBtn.classList.add("hidden");
};

export const toggleSendButton = (isVisible) => {
  if (isVisible) {
    elements.sendBtn.classList.remove("hidden");
  } else {
    elements.sendBtn.classList.add("hidden");
  }
};

export const showThankYou = () => {
  elements.messageContainer.classList.add("hidden");
  elements.sayHiBtn.innerText = "thank you";
  elements.sayHiBtn.classList.remove("hidden");
  elements.sayHiBtn.style.borderColor = "#888888";
  elements.sayHiBtn.style.color = "#888888";
  elements.messageInput.value = "";
  elements.sendBtn.classList.add("hidden");
};

export const showSubscribeSuccess = () => {
  if (!elements.subscribeBtn) return;
  elements.subscribeBtn.innerText = "Joined!";
  elements.subscribeBtn.style.backgroundColor = "#fff";
  elements.subscribeBtn.style.color = "#000";
  setTimeout(() => {
    elements.subscribeBtn.innerText = "Thank you";
  }, 1000);
};

export const triggerConfetti = () => {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: [
        "#ff0000",
        "#ffa500",
        "#ffff00",
        "#00ff00",
        "#0000ff",
        "#ff00ff",
        "#00ffff",
      ],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: [
        "#ff0000",
        "#ffa500",
        "#ffff00",
        "#00ff00",
        "#0000ff",
        "#ff00ff",
        "#00ffff",
      ],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export let elements = {};

// Configure marked with highlight.js
if (typeof marked !== "undefined" && typeof hljs !== "undefined") {
  marked.setOptions({
    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
    breaks: true,
  });
}


export const refreshElements = () => {
  elements.sayHiBtn = document.getElementById("say-hi-btn");
  elements.resumeBtn = document.getElementById("resume-btn");
  elements.messageContainer = document.getElementById("message-container");
  elements.backBtn = document.getElementById("back-btn");
  elements.messageInput = document.getElementById("message-input");
  elements.sendBtn = document.getElementById("send-btn");
  elements.blogList = document.getElementById("blog-list");
  elements.blogContent = document.getElementById("blog-content");
  elements.closeBlog = document.getElementById("close-blog");
  elements.copyLinkBtn = document.getElementById("copy-link");
  elements.markdownContainer = document.getElementById("markdown-container");

  // Resources Elements
  elements.resourceList = document.getElementById("resource-list");
  elements.resourceContent = document.getElementById("resource-content");
  elements.closeResource = document.getElementById("close-resource");
  elements.copyLinkResource = document.getElementById("copy-link-resource");
  elements.markdownContainerResource = document.getElementById("markdown-container-resource");

  elements.subscribeForm = document.querySelector(".footer-form");
  elements.subscribeBtn = document.querySelector(".footer-submit");
  elements.latestNoteBadge = document.getElementById("latest-note-badge");
  elements.latestResearchBadge = document.getElementById("latest-research-badge");
  elements.bentoGrid = document.querySelector(".bento-grid");
  elements.skillsGrid = document.querySelector(".skills-grid");
  elements.certificationsGrid = document.querySelector(".certifications-grid");
  elements.themeToggle = document.getElementById("theme-toggle");
  elements.researchList = document.getElementById("research-list");
  elements.educationList = document.getElementById("education-list");
  elements.latestNotesGrid = document.querySelector(".latest-notes-grid");
  elements.photoGallery = document.getElementById("gallery");
  elements.photoStats = document.querySelector(".gallery-stats");
  elements.lightboxTotal = document.getElementById("lightbox-total");
  elements.aboutLead = document.getElementById("about-lead");
  elements.aboutBio = document.getElementById("about-bio");
};

// Initial run
refreshElements();

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

  elements.latestNoteBadge.href = `notes.html#${note.id}`;
  elements.latestNoteBadge.classList.remove("hidden");
};

export const renderLatestResearchBadge = (paper) => {
  if (!elements.latestResearchBadge || !paper) return;

  const badgeText = elements.latestResearchBadge.querySelector(".badge-text");
  if (badgeText) badgeText.innerText = paper.title;

  elements.latestResearchBadge.href = paper.links?.PDF || paper.links?.Code || "research.html";
  elements.latestResearchBadge.classList.remove("hidden");
};

export const showBlogPost = (content) => {
  if (!elements.blogList) return;
  elements.blogList.classList.add("hidden");
  elements.blogContent.classList.remove("hidden");

  // High-performance rendering with a refined editorial fade + transition
  elements.markdownContainer.style.opacity = "0";
  elements.markdownContainer.style.transform = "translateY(20px)";
  elements.markdownContainer.innerHTML = marked.parse(content);

  // Apply highlighting
  elements.markdownContainer.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });


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
  if (elements.resumeBtn) elements.resumeBtn.classList.add("hidden");
  elements.messageContainer.classList.remove("hidden");
  elements.messageInput.focus();
};

export const hideMessageInput = () => {
  elements.messageContainer.classList.add("hidden");
  elements.sayHiBtn.classList.remove("hidden");
  if (elements.resumeBtn) elements.resumeBtn.classList.remove("hidden");
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
  const originalText = elements.subscribeBtn.innerText;
  elements.subscribeBtn.innerText = "Joined!";
  elements.subscribeBtn.style.backgroundColor = "var(--accent-emerald)";
  elements.subscribeBtn.style.color = "var(--white)";
  setTimeout(() => {
    elements.subscribeBtn.innerText = originalText;
    elements.subscribeBtn.style.backgroundColor = "";
    elements.subscribeBtn.style.color = "";
  }, 2000);
};

export const triggerConfetti = () => {
  const duration = 2.5 * 1000;
  const end = Date.now() + duration;

  // Premium color palette - gold, white, and subtle accents
  const colors = [
    "#FFD700", // Gold
    "#FFF8DC", // Cornsilk (soft gold)
    "#FFFFFF", // White
    "#E8E8E8", // Light gray
    "#C0C0C0", // Silver
    "#FF6B6B", // Soft coral (matches footer red)
  ];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      shapes: ["circle", "square"],
      gravity: 1.2,
      drift: 0,
      ticks: 200,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      shapes: ["circle", "square"],
      gravity: 1.2,
      drift: 0,
      ticks: 200,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

};
export const renderProjects = (projects) => {
  if (!elements.bentoGrid || !projects) return;

  elements.bentoGrid.innerHTML = projects
    .map(
      (project) => `
    <div class="bento-card ${project.size === "large" ? "bento-large" : project.size === "wide" ? "bento-wide" : ""} reveal" tabindex="0" role="button">
      <div class="bento-icon">${project.icon}</div>
      <span class="bento-tag">${project.tag}</span>
      <h3 class="bento-title">${project.title}</h3>
      <p class="bento-desc">${project.desc}</p>
      <a href="${project.url}" class="bento-link">${project.link}</a>
    </div>
  `,
    )
    .join("");
};

export const renderSkills = (skills) => {
  if (!elements.skillsGrid || !skills) return;

  elements.skillsGrid.innerHTML = skills
    .map(
      (group) => `
    <div class="skills-category reveal">
      <h3 class="skills-cat-title">${group.category}</h3>
      <div class="skills-items">
        ${group.items
          .map(
            (item) => `
          <div class="skill-item" tabindex="0">
            ${item}
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `,
    )
    .join("");
};

export const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);

  // Update hljs theme dynamically
  const hljsThemeLink = document.getElementById("hljs-theme");
  if (hljsThemeLink) {
    const themePath =
      theme === "light"
        ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
        : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css";
    hljsThemeLink.setAttribute("href", themePath);
  }
};


export const renderCertifications = (certifications) => {
  if (!elements.certificationsGrid || !certifications) return;

  // Ensure we keep the grid class and don't overwrite it with list
  elements.certificationsGrid.className = 'certifications-list';

  elements.certificationsGrid.innerHTML = certifications
    .map(
      (cert, index) => `
    <div class="cert-item reveal" style="transition-delay: ${index * 100}ms" tabindex="0" data-url="${cert.url}" role="button">
      <div class="cert-details">
        <h3 class="cert-name">${cert.name}</h3>
        <span class="cert-issuer">${cert.issuer}</span>
      </div>
      <div class="cert-meta">
        <span class="cert-date">${cert.date}</span>
        <svg class="cert-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      </div>
    </div>
  `,
    )
    .join("");
};

export const renderResearchList = (papers) => {
  if (!elements.researchList || !papers) return;

  if (papers.length === 0) {
    elements.researchList.innerHTML =
      '<p class="loading-indicator">No research papers found.</p>';
    return;
  }

  elements.researchList.innerHTML = papers
    .map(
      (paper, index) => `
    <article class="research-item reveal" style="transition-delay: ${index * 100}ms">
      <div class="research-meta">
        <span class="research-venue">${paper.venue}</span>
        <span class="research-year">${paper.year}</span>
      </div>
      <h3 class="research-title">${paper.title}</h3>
      <p class="research-authors">${paper.authors}</p>
      <p class="research-abstract">${paper.abstract}</p>
      <div class="research-tags">
        ${paper.tags.map((tag) => `<span class="research-tag">${tag}</span>`).join("")}
      </div>
      <div class="research-links">
        ${Object.entries(paper.links)
          .map(
            ([label, url]) =>
              `<a href="${url}" class="research-link" target="_blank">${label} ↗</a>`,
          )
          .join("")}
      </div>
    </article>
  `,
    )
    .join("");
};

export const renderEducation = (education) => {
  if (!elements.educationList || !education) return;

  elements.educationList.innerHTML = education
    .map(
      (edu, index) => `
    <div class="education-item reveal" style="transition-delay: ${index * 100}ms">
      <div class="edu-header">
        <h3 class="edu-degree">${edu.degree}</h3>
        <span class="edu-period">${edu.period}</span>
      </div>
      <div class="edu-institution">${edu.institution}</div>
      <div class="edu-location">
        <svg class="edu-loc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        ${edu.location}
      </div>
      <p class="edu-desc">${edu.description}</p>
    </div>
  `,
    )
    .join("");
};

export const renderLatestNotes = (posts) => {
  if (!elements.latestNotesGrid || !posts) return;

  if (posts.length === 0) {
    elements.latestNotesGrid.innerHTML = '<p class="loading-indicator">No notes found.</p>';
    return;
  }

  elements.latestNotesGrid.innerHTML = posts
    .map(
      (post, index) => `
    <a href="notes.html#${post.id}" class="note-card reveal" style="transition-delay: ${index * 100}ms">
        <div class="note-card-content">
            <h3 class="note-card-title">${post.title}</h3>
            <span class="note-card-date">${post.date}</span>
        </div>
        <svg class="note-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </a>
  `,
    )
    .join("");
};

export const renderPhotographyGallery = (photos) => {
  if (!elements.photoGallery || !photos) return;

  elements.photoGallery.innerHTML = photos
    .map(
      (photo, index) => `
    <div class="gallery-item ${photo.size || "standard"} reveal" data-category="${photo.category}" data-index="${index}">
        <div class="gallery-img-wrapper">
            <img src="${photo.src}" alt="${photo.alt}" loading="lazy" />
            <div class="gallery-overlay">
                <div class="gallery-overlay-content">
                    <span class="gallery-category">${photo.category}</span>
                    <h3 class="gallery-title">${photo.title}</h3>
                    <p class="gallery-location">${photo.location}</p>
                </div>
            </div>
        </div>
    </div>
  `,
    )
    .join("");

  // Update stats
  if (elements.lightboxTotal) elements.lightboxTotal.textContent = photos.length;

  const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length >= 2) {
    statNumbers[0].textContent = photos.length;
    const categories = new Set(photos.map(p => p.category)).size;
    statNumbers[1].textContent = categories;
  }
};

export const renderResourceList = (resources) => {
  if (!elements.resourceList) return;

  if (resources.length === 0) {
    elements.resourceList.innerHTML =
      '<p class="loading-indicator">No resources found.</p>';
    return;
  }

  elements.resourceList.innerHTML = resources
    .map(
      (resource, index) => `
    <article class="blog-item resource-item reveal" style="transition-delay: ${index * 100}ms" onclick="document.querySelector('[data-resource-id=\\'${resource.id}\\']').click()">
      ${resource.thumbnail ? `
      <div class="resource-thumbnail">
          <img src="${resource.thumbnail}" alt="${resource.title}" loading="lazy" />
      </div>` : ""}
      <div class="resource-content">
          <div class="blog-tags">
            ${resource.tags.slice(0, 2).map((tag) => `<span class="blog-tag">${tag}</span>`).join("")}
          </div>
          <h3 class="blog-title"><a href="#${resource.id}" data-resource-id="${resource.id}" class="resource-link">${resource.title}</a></h3>
          <div class="blog-meta">
            <span class="blog-date">${resource.date}</span>
            <span class="resource-arrow">→</span>
          </div>
      </div>
    </article>
  `,
    )
    .join("");
};

export const showResource = (resource) => {
  if (!elements.resourceList) return;
  elements.resourceList.classList.add("hidden");
  elements.resourceContent.classList.remove("hidden");

  // Manual animation setup - prevent usage of .reveal on dynamic content without observers
  elements.markdownContainerResource.style.opacity = "0";
  elements.markdownContainerResource.style.transform = "translateY(20px)";

  const headerHTML = `
    <header class="resource-detail-header">
      <h1 class="resource-detail-title">${resource.title}</h1>
      <div class="resource-detail-meta">
        <span class="resource-detail-date">${resource.date}</span>
        <span class="meta-separator">/</span>
        <div class="resource-share-inline">
            <span class="share-label">Share:</span>
            <button class="share-icon-btn copy-url-btn" aria-label="Copy Link" title="Copy Link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </button>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(resource.title)}&url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-icon-btn" aria-label="Share on X" title="Share on X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-icon-btn" aria-label="Share on LinkedIn" title="Share on LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
        </div>
      </div>
    </header>
    ${resource.thumbnail ? `
    <div class="resource-detail-image">
      <img src="${resource.thumbnail}" alt="${resource.title}" />
    </div>` : ""}
  `;

  elements.markdownContainerResource.innerHTML = headerHTML + marked.parse(resource.content);

  elements.markdownContainerResource.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });

  // Setup copy listener
  const copyBtn = elements.markdownContainerResource.querySelector(".copy-url-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href);
      copyBtn.style.color = "var(--text-primary)";
      setTimeout(() => copyBtn.style.color = "", 1000);
    });
  }

  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => {
    elements.markdownContainerResource.style.opacity = "1";
    elements.markdownContainerResource.style.transform = "translateY(0)";
    elements.markdownContainerResource.style.transition =
      "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
  }, 100);
};

export const hideResource = () => {
  if (elements.resourceContent) elements.resourceContent.classList.add("hidden");
  if (elements.resourceList) elements.resourceList.classList.remove("hidden");
};


export const renderAbout = (about) => {
  if (!about) return;
  if (elements.aboutLead) elements.aboutLead.innerText = about.lead;
  if (elements.aboutBio) {
    elements.aboutBio.innerHTML = `<p>${about.bio}</p>`;
  }
};

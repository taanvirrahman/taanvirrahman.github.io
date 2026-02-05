/**
 * Shared View Utilities
 * Common rendering and UI logic for Notes and Resources pages
 */

/**
 * Renders a list of items (notes or resources) with consistent styling
 */
export const renderItemList = (container, items, options = {}) => {
    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = '<p class="loading-indicator">No items found.</p>';
        return;
    }

    const {
        showThumbnails = false,
        defaultSnippet = 'Exploring the boundaries of technical innovation and design excellence...'
    } = options;

    container.innerHTML = items
        .map((item) => `
    <article class="resource-item group flex flex-col md:flex-row gap-6 py-6 border-b transition-all duration-300 transform" data-resource-id="${item.id}" role="button" tabindex="0" style="border-color: var(--resource-border)">
      ${showThumbnails && item.thumbnail ? `
      <div class="resource-thumbnail-container shrink-0 w-full md:w-[160px] h-[100px] overflow-hidden rounded-sm" style="background-color: var(--resource-thumb-bg)">
          <img src="${item.thumbnail}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      </div>` : ""}
      <div class="flex-1 flex flex-col justify-center">
          <div class="mb-1">
            <span class="text-[11px] font-black uppercase tracking-widest" style="color: var(--resource-accent)">${item.tags[0] || 'Tech'}</span>
          </div>
          <h3 class="resource-headline text-[20px] md:text-[22px] font-bold leading-[1.25] mb-2 transition-colors decoration-1 underline-offset-4" style="color: var(--resource-text-headline)">${item.title}</h3>
          <div class="resource-snippet text-[14px] leading-relaxed mb-2 transition-all duration-300" style="color: var(--resource-text-snippet)">
            ${item.snippet || item.readingTime || defaultSnippet}
          </div>
          <div class="flex items-center gap-2 text-[12px] font-medium uppercase tracking-wider" style="color: var(--resource-text-meta)">
            <span>Tanvir Rahman</span>
            <span>•</span>
            <span>${item.date}</span>
          </div>
      </div>
    </article>
  `)
        .join("");
};

/**
 * Renders a popular/featured items list
 */
export const renderPopularList = (container, items, limit = 3) => {
    if (!container) return;

    const popularItems = items.slice(0, limit);

    container.innerHTML = popularItems
        .map((item) => `
        <li class="pt-6 border-t border-white/20 flex gap-4 group">
            <div class="w-2 h-2 bg-white mt-2 shrink-0 transition-transform group-hover:scale-125"></div>
            <a href="#${item.id}" class="text-[16px] font-bold leading-tight hover:text-white/80 transition-colors">${item.title}</a>
        </li>
    `)
        .join("");
};

/**
 * Initialize toggle for headlines-only view
 */
export const initToggle = (toggleElement) => {
    if (!toggleElement) return;

    toggleElement.addEventListener("click", () => {
        const isChecked = toggleElement.getAttribute("aria-checked") === "true";
        const newStatus = !isChecked;

        toggleElement.setAttribute("aria-checked", newStatus);

        if (newStatus) {
            toggleElement.style.backgroundColor = "var(--resource-accent)";
        } else {
            toggleElement.style.backgroundColor = "var(--toggle-bg-off)";
        }

        const dot = toggleElement.querySelector("div");
        if (dot) {
            dot.style.transform = newStatus ? "translateX(20px)" : "translateX(0)";
        }

        // Toggle content visibility
        const thumbnails = document.querySelectorAll(".resource-thumbnail-container");
        const snippets = document.querySelectorAll(".resource-snippet");

        thumbnails.forEach(el => el.classList.toggle("hidden", newStatus));
        snippets.forEach(el => el.classList.toggle("hidden", newStatus));
    });
};

/**
 * Show a single item (note or resource) in full view
 */
export const showItem = (item, elements, options = {}) => {
    const {
        showThumbnail = false,
        stripFirstHeading = false
    } = options;

    // Hide listing view
    if (elements.listingView) {
        elements.listingView.classList.add("hidden");
    } else {
        if (elements.listingHeader) elements.listingHeader.classList.add("hidden");
        if (elements.listingGrid) elements.listingGrid.classList.add("hidden");
    }

    // Show content view
    elements.resourceContent.classList.remove("hidden");
    document.body.style.backgroundColor = "var(--resource-bg)";

    // Prepare for animation
    elements.markdownContainerResource.style.opacity = "0";
    elements.markdownContainerResource.style.transform = "translateY(20px)";

    // Build header HTML
    const headerHTML = `
    <header class="max-w-3xl mx-auto mb-10 text-left">
      <div class="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-[0.2em]" style="color: var(--resource-accent)">
        <span>${item.tags[0] || 'Resource'}</span>
        <span class="opacity-20" style="color: var(--resource-text-headline)">|</span>
        <span class="font-medium" style="color: var(--resource-text-meta)">${item.date}</span>
      </div>
      <h1 class="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-tight" style="color: var(--resource-text-headline)">${item.title}</h1>
      <div class="flex items-center text-[12px] font-medium" style="color: var(--resource-text-meta)">
        <span class="opacity-70">Tanvir Rahman</span>
      </div>
    </header>
    ${showThumbnail && item.thumbnail ? `
    <div class="mb-12 w-full max-w-4xl mx-auto overflow-hidden rounded-sm" style="background-color: var(--resource-thumb-bg)">
      <img src="${item.thumbnail}" alt="${item.title}" class="w-full h-auto object-cover max-h-[500px]" />
    </div>` : ""}
`;

    // Render content
    if (typeof marked === "undefined") {
        elements.markdownContainerResource.innerHTML = headerHTML + `<div class="max-w-3xl mx-auto">${item.content}</div>`;
    } else {
        let content = item.content;

        // Strip first heading if requested (to avoid duplicate titles)
        if (stripFirstHeading) {
            content = content.replace(/^#+\s+.*(\r?\n)?/, '');
        }

        const contentHTML = `<div class="max-w-3xl mx-auto">${marked.parse(content)}</div>`;
        elements.markdownContainerResource.innerHTML = headerHTML + contentHTML;
    }

    // Syntax highlighting
    if (typeof hljs !== "undefined") {
        elements.markdownContainerResource.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" });

    // Animate in
    setTimeout(() => {
        elements.markdownContainerResource.style.opacity = "1";
        elements.markdownContainerResource.style.transform = "translateY(0)";
        elements.markdownContainerResource.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    }, 100);
};

/**
 * Hide item view and return to listing
 */
export const hideItem = (elements) => {
    if (elements.resourceContent) elements.resourceContent.classList.add("hidden");

    if (elements.listingView) {
        elements.listingView.classList.remove("hidden");
    } else {
        if (elements.listingHeader) elements.listingHeader.classList.remove("hidden");
        if (elements.listingGrid) elements.listingGrid.classList.remove("hidden");
    }

    document.body.style.backgroundColor = "";
};

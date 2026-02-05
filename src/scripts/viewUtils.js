import { templates } from "./components.js";

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

    container.innerHTML = items
        .map((item) => templates.card(item, 'resource'))
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
      <div class="mb-6">
        ${templates.badge(item.tags[0] || 'Resource', 'accent')}
      </div>
      <h1 class="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-tight" style="color: var(--resource-text-headline)">${item.title}</h1>
      <div class="flex items-center text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
        <span>${item.date}</span>
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

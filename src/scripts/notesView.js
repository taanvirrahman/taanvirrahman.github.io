export let elements = {};

export const refreshResourceElements = () => {
    elements.resourceList = document.getElementById("blog-list");
    elements.resourceContent = document.getElementById("blog-content");
    elements.closeResource = document.getElementById("close-blog");
    elements.copyLinkResource = document.getElementById("copy-link");
    elements.markdownContainerResource = document.getElementById("markdown-container");
    elements.headlinesToggle = document.getElementById("headlines-toggle");
    elements.listingHeader = document.querySelector("main header");
    elements.listingGrid = document.querySelector(".notes-page-grid");
    elements.popularResourceList = document.getElementById("popular-resource-list");
    elements.listingView = document.getElementById("notes-listing-view");
};

// Initial run
refreshResourceElements();

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
    <article class="resource-item group flex flex-col md:flex-row gap-6 py-6 border-b transition-all duration-300 transform" data-resource-id="${resource.id}" role="button" tabindex="0" style="border-color: var(--resource-border)">
      <div class="flex-1 flex flex-col justify-center">
          <div class="mb-1">
            <span class="text-[11px] font-black uppercase tracking-widest" style="color: var(--resource-accent)">${resource.tags[0] || 'Tech'}</span>
          </div>
          <h3 class="resource-headline text-[20px] md:text-[22px] font-bold leading-[1.25] mb-2 transition-colors decoration-1 underline-offset-4" style="color: var(--resource-text-headline)">${resource.title}</h3>
          <div class="resource-snippet text-[14px] leading-relaxed mb-2 transition-all duration-300" style="color: var(--resource-text-snippet)">
            ${resource.readingTime || '5 min read'}
          </div>
          <div class="flex items-center gap-2 text-[12px] font-medium uppercase tracking-wider" style="color: var(--resource-text-meta)">
            <span>Tanvir Rahman</span>
            <span>•</span>
            <span>${resource.date}</span>
          </div>
      </div>
    </article>
  `,
        )
        .join("");

    initResourceToggle();
};

export const renderPopularList = (resources) => {
    if (!elements.popularResourceList) return;

    // Show latest 3-4 resources
    const popularItems = resources.slice(0, 3);

    elements.popularResourceList.innerHTML = popularItems
        .map(
            (resource) => `
        <li class="pt-6 border-t border-white/20 flex gap-4 group">
            <div class="w-2 h-2 bg-white mt-2 shrink-0 transition-transform group-hover:scale-125"></div>
            <a href="#${resource.id}" class="text-[16px] font-bold leading-tight hover:text-white/80 transition-colors">${resource.title}</a>
        </li>
    `
        )
        .join("");
};

const initResourceToggle = () => {
    const toggle = elements.headlinesToggle;
    if (!toggle) return;

    toggle.addEventListener("click", () => {
        const isChecked = toggle.getAttribute("aria-checked") === "true";
        const newStatus = !isChecked;

        toggle.setAttribute("aria-checked", newStatus);
        toggle.setAttribute("aria-checked", newStatus);

        if (newStatus) {
            toggle.style.backgroundColor = "var(--resource-accent)";
        } else {
            toggle.style.backgroundColor = "var(--toggle-bg-off)";
        }

        const dot = toggle.querySelector("div");
        dot.style.transform = newStatus ? "translateX(20px)" : "translateX(0)";

        // Toggle content visibility
        const thumbnails = document.querySelectorAll(".resource-thumbnail-container");
        const snippets = document.querySelectorAll(".resource-snippet");

        thumbnails.forEach(el => el.classList.toggle("hidden", newStatus));
        snippets.forEach(el => el.classList.toggle("hidden", newStatus));
    });
};

export const showResource = (resource) => {
    if (elements.listingView) {
        elements.listingView.classList.add("hidden");
    } else {
        if (elements.listingHeader) elements.listingHeader.classList.add("hidden");
        if (elements.listingGrid) elements.listingGrid.classList.add("hidden");
    }
    elements.resourceContent.classList.remove("hidden");
    document.body.style.backgroundColor = "var(--resource-bg)";

    elements.markdownContainerResource.style.opacity = "0";
    elements.markdownContainerResource.style.transform = "translateY(20px)";

    const headerHTML = `
    <header class="max-w-3xl mx-auto mb-10 text-left">
      <div class="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-[0.2em]" style="color: var(--resource-accent)">
        <span>${resource.tags[0] || 'Resource'}</span>
        <span class="opacity-20" style="color: var(--resource-text-headline)">|</span>
        <span class="font-medium" style="color: var(--resource-text-meta)">${resource.date}</span>
      </div>
      <h1 class="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-tight" style="color: var(--resource-text-headline)">${resource.title}</h1>
      <div class="flex items-center text-[12px] font-medium" style="color: var(--resource-text-meta)">
        <span class="opacity-70">Tanvir Rahman</span>
      </div>
    </header>
`;

    if (typeof marked !== "undefined") {
        // Strip the first heading from markdown content to avoid duplicate titles
        // (Since we already render a custom cinematic header)
        const cleanContent = resource.content.replace(/^#+\s+.*(\r?\n)?/, '');

        // Keep header (including image) outside the text container to allow image to be wider
        // Wrap ONLY the markdown content in the narrower 3xl container
        const contentHTML = `<div class="max-w-3xl mx-auto">${marked.parse(cleanContent)}</div>`;
        elements.markdownContainerResource.innerHTML = headerHTML + contentHTML;
    } else {
        elements.markdownContainerResource.innerHTML = headerHTML + `<div class="max-w-3xl mx-auto">${resource.content}</div>`;
    }

    if (typeof hljs !== "undefined") {
        elements.markdownContainerResource.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    window.scrollTo({ top: 0, behavior: "instant" });

    setTimeout(() => {
        elements.markdownContainerResource.style.opacity = "1";
        elements.markdownContainerResource.style.transform = "translateY(0)";
        elements.markdownContainerResource.style.transition =
            "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    }, 100);
};

export const hideResource = () => {
    if (elements.resourceContent) elements.resourceContent.classList.add("hidden");
    if (elements.listingView) {
        elements.listingView.classList.remove("hidden");
    } else {
        if (elements.listingHeader) elements.listingHeader.classList.remove("hidden");
        if (elements.listingGrid) elements.listingGrid.classList.remove("hidden");
    }
    document.body.style.backgroundColor = "";
};

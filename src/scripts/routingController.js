import { observeReveal } from "./effects.js";

/**
 * Shared Routing Controller
 * Handles hash-based routing, event delegation, and keyboard accessibility
 * for both Notes and Resources pages.
 */
export const initHashRouting = async (config) => {
    const {
        elements,
        fetchListFn,      // Function to fetch list data (e.g., model.fetchBlogPosts)
        fetchItemFn,      // Function to fetch single item (e.g., model.fetchBlogPost)
        renderListFn,     // Function to render list (e.g., view.renderResourceList)
        renderPopularFn,  // Optional: Function to render popular items
        showItemFn,       // Function to show single item (e.g., view.showResource)
        hideItemFn        // Function to hide item view (e.g., view.hideResource)
    } = config;

    if (!elements.resourceList) {
        console.error("Routing controller: resourceList element not found");
        return;
    }

    // 1. Fetch and render list
    try {
        const items = await fetchListFn();
        renderListFn(items);

        // Render popular list if function provided
        if (renderPopularFn) {
            renderPopularFn(items);
        } else if (elements.popularResourceList) {
            // Hide popular list if not applicable
            elements.popularResourceList.style.display = 'none';
        }

        // Observe reveal animations
        const listItems = elements.resourceList.querySelectorAll(".reveal");
        listItems.forEach((el) => observeReveal(el));
    } catch (error) {
        console.error("Failed to initialize list:", error);
    }

    // 2. Hash-based routing handler
    const handleRouting = async () => {
        const hash = globalThis.location.hash.replace("#", "");
        if (hash) {
            const item = await fetchItemFn(hash);
            if (item) {
                showItemFn(item);
            } else {
                globalThis.location.hash = "";
            }
        } else {
            hideItemFn();
        }
    };

    // 3. Register hash change listener
    globalThis.addEventListener("hashchange", handleRouting);
    handleRouting();

    // 4. Click delegation for list items
    elements.resourceList.addEventListener("click", (e) => {
        const item = e.target.closest(".resource-item");
        if (item) {
            const itemId = item.dataset.resourceId;
            if (itemId) {
                e.preventDefault();
                globalThis.location.hash = itemId;
            }
        }
    });

    // 5. Keyboard accessibility for list items
    elements.resourceList.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            const item = e.target.closest(".resource-item");
            if (item) {
                const itemId = item.dataset.resourceId;
                if (itemId) {
                    e.preventDefault();
                    globalThis.location.hash = itemId;
                }
            }
        }
    });

    // 6. Close button handler
    if (elements.closeResource) {
        elements.closeResource.addEventListener("click", () => {
            globalThis.location.hash = "";
        });
    }

    // 7. Copy link handler
    if (elements.copyLinkResource) {
        elements.copyLinkResource.addEventListener("click", () => {
            navigator.clipboard.writeText(globalThis.location.href);
            const originalText = elements.copyLinkResource.innerText;
            elements.copyLinkResource.innerText = "COPIED!";
            setTimeout(() => {
                elements.copyLinkResource.innerText = originalText;
            }, 2000);
        });
    }
};

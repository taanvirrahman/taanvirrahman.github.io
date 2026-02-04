import * as model from "./model.js";
import * as resourcesView from "./notesView.js";
import { observeReveal } from "./effects.js";

export const initResources = async () => {
    const { elements } = resourcesView;
    // Map 'resourceList' logic to 'blogList' container for notes page

    // Verify elements are populated
    if (!elements.resourceList) {
        console.warn("Notes controller: resourceList not found in view elements. Attempting manual refresh.");
        resourcesView.refreshResourceElements();
    }

    if (elements.resourceList) {
        try {
            console.log("Fetching notes...");
            const resources = await model.fetchBlogPosts(); // Fetch NOTES instead of resources
            console.log(`Fetched ${resources.length} notes`);
            resourcesView.renderResourceList(resources);

            // Hide popular list if not valid for notes, or map it if we want popular notes
            if (elements.popularResourceList) elements.popularResourceList.style.display = 'none';

            const resourceItems = elements.resourceList.querySelectorAll(".reveal");
            resourceItems.forEach((el) => {
                observeReveal(el);
            });
        } catch (error) {
            console.error("Failed to initialize notes list:", error);
        }

        const handleResourceRouting = async () => {
            const hash = window.location.hash.replace("#", "");
            if (hash) {
                // Fetch specific note content
                const resource = await model.fetchBlogPost(hash);
                if (resource) {
                    resourcesView.showResource(resource);
                } else {
                    window.location.hash = "";
                }
            } else {
                resourcesView.hideResource();
            }
        };

        window.addEventListener("hashchange", handleResourceRouting);
        handleResourceRouting();

        elements.resourceList.addEventListener("click", (e) => {
            const item = e.target.closest(".resource-item");
            if (item) {
                const resourceId = item.dataset.resourceId;
                if (resourceId) {
                    e.preventDefault();
                    window.location.hash = resourceId;
                }
            }
        });

        // Keyboard accessibility
        elements.resourceList.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                const item = e.target.closest(".resource-item");
                if (item) {
                    const resourceId = item.dataset.resourceId;
                    if (resourceId) {
                        e.preventDefault();
                        window.location.hash = resourceId;
                    }
                }
            }
        });

        if (elements.closeResource) {
            elements.closeResource.addEventListener("click", () => {
                window.location.hash = "";
            });
        }

        if (elements.copyLinkResource) {
            elements.copyLinkResource.addEventListener("click", () => {
                navigator.clipboard.writeText(window.location.href);
                const originalText = elements.copyLinkResource.innerText;
                elements.copyLinkResource.innerText = "COPIED!";
                setTimeout(() => {
                    elements.copyLinkResource.innerText = originalText;
                }, 2000);
            });
        }
    }
};

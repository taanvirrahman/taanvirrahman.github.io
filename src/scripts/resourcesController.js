import * as model from "./model.js";
import * as resourcesView from "./resourcesView.js";
import { observeReveal } from "./effects.js";

export const initResources = async () => {
    const { elements } = resourcesView;

    if (elements.resourceList) {
        try {
            console.log("Fetching resources...");
            const resources = await model.fetchResources();
            console.log(`Fetched ${resources.length} resources`);
            resourcesView.renderResourceList(resources);
            resourcesView.renderPopularList(resources);

            const resourceItems = elements.resourceList.querySelectorAll(".reveal");
            resourceItems.forEach((el) => {
                observeReveal(el);
            });
        } catch (error) {
            console.error("Failed to initialize resource list:", error);
        }

        const handleResourceRouting = async () => {
            const hash = window.location.hash.replace("#", "");
            if (hash) {
                const resource = await model.fetchResource(hash);
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

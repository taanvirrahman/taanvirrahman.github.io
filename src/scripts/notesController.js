import * as model from "./model.js";
import * as notesView from "./notesView.js";
import { initHashRouting } from "./routingController.js";

export const initResources = async () => {
    const { elements } = notesView;

    // Verify elements are populated
    if (!elements.resourceList) {
        console.warn("Notes controller: resourceList not found in view elements. Attempting manual refresh.");
        notesView.refreshResourceElements();
    }

    // Initialize hash-based routing with notes-specific configuration
    await initHashRouting({
        elements,
        fetchListFn: model.fetchBlogPosts,
        fetchItemFn: model.fetchBlogPost,
        renderListFn: notesView.renderResourceList,
        renderPopularFn: null, // Notes don't have a popular list
        showItemFn: notesView.showResource,
        hideItemFn: notesView.hideResource
    });
};

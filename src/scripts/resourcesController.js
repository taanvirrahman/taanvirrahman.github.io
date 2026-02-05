import * as model from "./model.js";
import * as resourcesView from "./resourcesView.js";
import { initHashRouting } from "./routingController.js";

export const initResources = async () => {
    const { elements } = resourcesView;

    // Initialize hash-based routing with resources-specific configuration
    await initHashRouting({
        elements,
        fetchListFn: model.fetchResources,
        fetchItemFn: model.fetchResource,
        renderListFn: resourcesView.renderResourceList,
        renderPopularFn: resourcesView.renderPopularList,
        showItemFn: resourcesView.showResource,
        hideItemFn: resourcesView.hideResource
    });
};

import { renderItemList, renderPopularList as renderPopular, showItem, hideItem } from "./viewUtils.js";

export const elements = {};

export const refreshResourceElements = () => {
    elements.resourceList = document.getElementById("resource-list");
    elements.resourceContent = document.getElementById("resource-content");
    elements.closeResource = document.getElementById("close-resource");
    elements.copyLinkResource = document.getElementById("copy-link-resource");
    elements.markdownContainerResource = document.getElementById("markdown-container-resource");
    elements.listingHeader = document.querySelector("main header");
    elements.listingGrid = document.querySelector(".resources-page-grid");
    elements.popularResourceList = document.getElementById("popular-resource-list");
    elements.listingView = document.getElementById("resources-listing-view");
};

// Initial run
refreshResourceElements();

export const renderResourceList = (resources) => {
    renderItemList(elements.resourceList, resources, {
        showThumbnails: true,
        defaultSnippet: 'Exploring the boundaries of technical innovation and design excellence...'
    });
};

export const renderPopularList = (resources) => {
    renderPopular(elements.popularResourceList, resources, 3);
};

export const showResource = (resource) => {
    showItem(resource, elements, {
        showThumbnail: true,
        stripFirstHeading: false
    });
};

export const hideResource = () => {
    hideItem(elements);
};

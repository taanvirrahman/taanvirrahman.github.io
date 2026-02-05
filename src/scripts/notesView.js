import { renderItemList, showItem, hideItem } from "./viewUtils.js";

export const elements = {};

export const refreshResourceElements = () => {
    elements.resourceList = document.getElementById("blog-list");
    elements.resourceContent = document.getElementById("blog-content");
    elements.closeResource = document.getElementById("close-blog");
    elements.copyLinkResource = document.getElementById("copy-link");
    elements.markdownContainerResource = document.getElementById("markdown-container");
    elements.listingHeader = document.querySelector("main header");
    elements.listingGrid = document.querySelector(".notes-page-grid");
    elements.listingView = document.getElementById("notes-listing-view");
};

// Initial run
refreshResourceElements();

export const renderResourceList = (resources) => {
    renderItemList(elements.resourceList, resources, {
        showThumbnails: false,
        defaultSnippet: null // Notes use readingTime instead
    });
};


export const showResource = (resource) => {
    showItem(resource, elements, {
        showThumbnail: false,
        stripFirstHeading: true
    });
};

export const hideResource = () => {
    hideItem(elements);
};

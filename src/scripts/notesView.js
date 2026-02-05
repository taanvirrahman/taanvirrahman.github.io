import { renderItemList, renderPopularList as renderPopular, initToggle, showItem, hideItem } from "./viewUtils.js";

export const elements = {};

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
    renderItemList(elements.resourceList, resources, {
        showThumbnails: false,
        defaultSnippet: null // Notes use readingTime instead
    });
    initToggle(elements.headlinesToggle);
};

export const renderPopularList = (resources) => {
    renderPopular(elements.popularResourceList, resources, 3);
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

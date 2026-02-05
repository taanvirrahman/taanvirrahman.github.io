import { initApp } from "./app.js";
import { refreshResourceElements } from "./resourcesView.js";
import { initResources } from "./resourcesController.js";

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Core Initialization (Shared)
    initApp();
    refreshResourceElements();

    // 2. Initialize Resources specialized logic
    try {
        await initResources();
    } catch (e) {
        console.error("Resources init failed:", e);
        document.body.classList.add("loaded");
    }
});

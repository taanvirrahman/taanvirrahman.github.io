import { initApp, observeReveal } from "./app.js";
import * as model from "./model.js";
import * as view from "./view.js";

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Core Initialization (Shared)
    initApp();

    // 2. Specialized Projects Loading
    try {
        // Redirect target container for bento grid
        const projectsGrid = document.getElementById("projects-bento-grid");
        if (projectsGrid) {
            view.elements.bentoGrid = projectsGrid;
        }

        const projects = await model.fetchProjects();
        if (projects) {
            view.renderProjects(projects);

            // Re-observe newly added cards for reveal animations
            document.querySelectorAll(".bento-card.reveal").forEach(el => observeReveal(el));
        }
    } catch (error) {
        console.error("Projects page initialization failed:", error);
        const projectsGrid = document.getElementById("projects-bento-grid");
        if (projectsGrid) {
            projectsGrid.innerHTML = '<p class="loading-indicator">Failed to load the technical index. Please refresh.</p>';
        }
    }
});

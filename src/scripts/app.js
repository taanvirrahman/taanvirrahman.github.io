import { initComponents } from "./components.js";
import { initEffects } from "./effects.js";
import { initTheme } from "./theme.js";
import * as model from "./model.js";
import * as view from "./view.js";

/**
 * Shared Application Bootstrapper
 * Handles common initialization tasks for all pages to avoid duplication.
 */
export const initApp = () => {
    // 1. Core Model Initialization
    model.initModel();

    // 2. UI Components (Header, Footer, Navigation)
    initComponents();

    // 3. View Elements Refresh
    view.refreshElements();

    // 4. Theme System
    initTheme();

    // 5. Interactive Effects (Scroll, Reveal, Canvas)
    initEffects();


    // 7. Global Page Load Handling (Splash Screen & Reveal)
    handlePageLoad();
};

/**
 * Standardized Page Load & Splash Screen Handling
 */
const handlePageLoad = () => {
    const splash = document.getElementById("splash-screen");

    // Logic for pages WITHOUT splash screen (immediate reveal)
    if (!splash) {
        if (document.readyState === "complete") {
            dispatchReveal();
        } else {
            globalThis.addEventListener("load", dispatchReveal);
        }
        return;
    }

    // Logic for pages WITH splash screen
    globalThis.addEventListener("load", () => {
        // Accuracy fix: ensure we use the early timestamp from index.html if available
        const startTime = globalThis.splashStartTime || Date.now();
        const minDelay = 500; // Reduced splash duration
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDelay - elapsed);

        setTimeout(() => {
            splash.classList.add("hidden");
            document.body.classList.add("loaded");

            // Dispatch event to start reveal animations
            globalThis.dispatchEvent(new CustomEvent("page-reveal"));

            // Cleanup DOM
            setTimeout(() => splash.remove(), 1000);
        }, remaining);
    });
};

const dispatchReveal = () => {
    document.body.classList.add("loaded");
    globalThis.dispatchEvent(new CustomEvent("page-reveal"));
};

// Re-export common utilities for convenience
export { observeReveal } from "./effects.js";

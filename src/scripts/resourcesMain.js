import { initComponents } from "./components.js";
import { initEffects } from "./effects.js";
import * as model from "./model.js";
import { refreshResourceElements } from "./resourcesView.js";
import { initResources } from "./resourcesController.js";
import { initNewsletter } from "./newsletter.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Initialize model
    model.initModel();

    // Bootstrap global components
    initComponents();
    refreshResourceElements();
    initEffects();
    initNewsletter();

    // Initialize Resources specialized logic
    try {
        await initResources();
    } catch (e) {
        console.error("Resources init failed:", e);
        document.body.classList.add("loaded");
    }

    // Theme Management
    const applyTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        const toggleBtn = document.getElementById("theme-toggle");
        if (toggleBtn) {
            toggleBtn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
            toggleBtn.title = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
        }
    };

    // Apply init theme
    applyTheme(model.getTheme());

    // Toggle Listener
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = model.getTheme();
            const next = current === "dark" ? "light" : "dark";
            model.setTheme(next);
            applyTheme(next);
        });
    }
});

window.addEventListener("load", () => {
    const splash = document.getElementById("splash-screen");
    if (!splash) {
        document.body.classList.add("loaded");
        return;
    }

    setTimeout(() => {
        splash.classList.add("hidden");
        document.body.classList.add("loaded");
        setTimeout(() => splash.remove(), 800);
    }, 1000);
});

import * as model from "./model.js";
import { applyTheme as viewApplyTheme } from "./view.js";

/**
 * Enhanced Theme Management System
 * Synchronizes theme across all pages and components.
 */

export const applyTheme = (theme) => {
    // 1. Update data-theme attribute for CSS variables
    document.documentElement.dataset.theme = theme;

    // 2. Update UI components
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
        toggleBtn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
        toggleBtn.title = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
    }

    // 3. Update highlighted code blocks if applicable
    viewApplyTheme(theme);
};

export const initTheme = () => {
    // Initial theme from model (safely handles localStorage)
    const currentTheme = model.getTheme();
    applyTheme(currentTheme);

    // Bootstrap click listener
    document.addEventListener("click", (e) => {
        const toggle = e.target.closest("#theme-toggle");
        if (toggle) {
            const nextTheme = model.getTheme() === "dark" ? "light" : "dark";
            model.setTheme(nextTheme);
            applyTheme(nextTheme);
        }
    });

    // Listen for system changes if user hasn't set a preference
    globalThis.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            const newTheme = e.matches ? "dark" : "light";
            applyTheme(newTheme);
        }
    });
};

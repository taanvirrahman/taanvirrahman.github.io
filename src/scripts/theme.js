import * as model from "./model.js";
import { applyTheme as viewApplyTheme } from "./view.js";

/**
 * Theme Management System - DARK MODE ONLY
 * Enforces dark theme across the application.
 */

export const applyTheme = (theme) => {
    // Always force dark
    const targetTheme = "dark";
    document.documentElement.dataset.theme = targetTheme;
    viewApplyTheme(targetTheme);
};

export const initTheme = () => {
    // Force dark mode
    model.setTheme("dark");
    applyTheme("dark");

    // Remove old listeners logic as we only support dark mode
};

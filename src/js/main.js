import * as controller from "./controller.js";

document.addEventListener("DOMContentLoaded", () => {
  controller.init();
});

window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");

  // If no splash screen (e.g. photography page), just mark as loaded
  if (!splash) {
    document.body.classList.add("loaded");
    return;
  }

  const minDelay = 2000; // Minimum time to show splash
  const startTime = Date.now();

  const hideSplash = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const remaining = Math.max(0, minDelay - elapsed);

    setTimeout(() => {
      splash.classList.add("hidden");
      document.body.classList.add("loaded");

      // Cleanup from DOM after transition
      setTimeout(() => {
        splash.remove();
      }, 1200); // Wait for the longer curtain transition
    }, remaining);
  };

  hideSplash();
});

import { initApp } from "./app.js";
import * as controller from "./controller.js";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  controller.init();
});

globalThis.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");

  const finishLoading = () => {
    if (document.body.classList.contains("loaded")) return;

    if (!splash) {
      document.body.classList.add("loaded");
      globalThis.dispatchEvent(new CustomEvent("page-reveal"));
      return;
    }

    const minDelay = 2000;
    // Accuracy fix: ensure we use the early timestamp from index.html
    const startTime = globalThis.splashStartTime || Date.now();
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDelay - elapsed);

    setTimeout(() => {
      splash.classList.add("hidden");
      document.body.classList.add("loaded");

      // Dispatch a custom event to start reveal animations
      globalThis.dispatchEvent(new CustomEvent("page-reveal"));

      setTimeout(() => {
        splash.remove();
      }, 1500);
    }, remaining);
  };

  // Standard load completion
  finishLoading();

  // Safety fallback (5s max)
  setTimeout(finishLoading, 5000);
});


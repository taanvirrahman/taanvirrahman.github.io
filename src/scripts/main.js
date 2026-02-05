import { initApp } from "./app.js";
import * as controller from "./controller.js";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  controller.init();
});

// Splash screen logic is handled centrally in app.js



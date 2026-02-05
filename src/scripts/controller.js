import * as model from "./model.js";
import * as view from "./view.js";
import { observeReveal } from "./effects.js";

/**
 * Setup click delegation for bento cards.
 * Follows MVC: Controller handles events, delegates to View actions.
 */
// Click listeners removed as projects are now native links


export const init = async () => {
  await initHeroBadges();
  await initDynamicContent();
};

const initHeroBadges = async () => {
  try {
    const [posts, papers] = await Promise.all([
      model.fetchBlogPosts(),
      model.fetchResearchPapers()
    ]);

    if (view.elements.latestNoteBadge && posts.length > 0) {
      view.renderLatestNoteBadge(posts[0]);
    }

    if (view.elements.latestResearchBadge && papers.length > 0) {
      view.renderLatestResearchBadge(papers[0]);
    }
  } catch (error) {
    console.warn("Failed to load hero badges:", error);
  }
};

const initDynamicContent = async () => {
  // 1. Projects (Always load if grid exists)
  if (view.elements.bentoGrid) {
    try {
      const projects = await model.fetchProjects();
      view.renderProjects(projects);

      // Initialize Reveal for project cards
      document.querySelectorAll("#featured-projects-grid .reveal").forEach(el => observeReveal(el));
    } catch (error) {
      console.warn("Failed to load projects:", error);
    }
  }

  // 2. Specialized Page Logic - Research/About (Redirected from main logic)
  if (view.elements.researchList || view.elements.recommendedList) {
    try {
      const papers = await model.fetchResearchPapers();
      const publications = papers.filter(p => !p.type || p.type === 'publication');
      const recommendations = papers.filter(p => p.type === 'recommendation');

      if (view.elements.researchList) view.renderResearchList(publications);
      if (view.elements.recommendedList) view.renderRecommendedList(recommendations);

      document.querySelectorAll(".reveal").forEach(el => observeReveal(el));
    } catch (error) {
      console.warn("Failed to load research:", error);
    }
  }

  // Feature: Latest Notes Section (Footer Preview)
  if (view.elements.latestNotesGrid) {
    const posts = await model.fetchBlogPosts();
    if (posts.length > 0) {
      const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
      view.renderLatestNotes(sortedPosts.slice(0, 3));
    } else {
      view.renderLatestNotes([]);
    }
  }

  // Initial render - fetch then render
  if (view.elements.blogList) {
    try {
      const posts = await model.fetchBlogPosts();
      view.renderBlogList(posts);
      document.querySelectorAll(".blog-item.reveal").forEach((el) => {
        observeReveal(el);
      });
    } catch (error) {
      console.error("Failed to initialize blog list:", error);
    }
  }
};



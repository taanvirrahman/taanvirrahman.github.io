
/**
 * Private state object - not directly exported to prevent external mutations.
 * Access state through getter functions for encapsulation.
 */
const _state = {
  blogPosts: [],
  researchPapers: [],
  resources: [],
  currentPost: null,
  config: null,
  projects: [],
  cache: new Map(),
  theme: "dark",
};

// Specific getters for commonly accessed values

/**
 * Initialize model - must be called explicitly.
 * Pre-fetches client IP in background (non-blocking).
 */
export const initModel = async () => {
  // Model initialization
};

export const setTheme = (theme) => {
  _state.theme = theme;
  localStorage.setItem("theme", theme);
};


export const fetchBlogPosts = async () => {
  if (_state.blogPosts.length > 0) return _state.blogPosts;
  try {
    const response = await fetch("src/data/notes.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    _state.blogPosts = data;
    return _state.blogPosts;
  } catch (error) {
    console.error("Error fetching notes list:", error);
    return [];
  }
};

export const fetchBlogPost = async (postId) => {
  // Check cache first
  if (_state.cache.has(postId)) {
    return _state.cache.get(postId);
  }

  const post = _state.blogPosts.find((p) => p.id === postId);
  if (!post) return null;

  try {
    const response = await fetch(post.file);
    const content = await response.text();

    // Senior performance move: Dynamic reading time calculation
    const wordCount = content.split(/\s+/g).length;
    const readingTime = Math.ceil(wordCount / 225) + " min read";

    const result = { ...post, content, readingTime };
    _state.cache.set(postId, result); // Cache the result
    return result;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
};
export const fetchResearchPapers = async () => {
  if (_state.researchPapers.length > 0) return _state.researchPapers;
  try {
    const response = await fetch("src/data/papers.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    _state.researchPapers = data;
    return _state.researchPapers;
  } catch (error) {
    console.error("Error fetching research papers:", error);
    return [];
  }
};

export const fetchResources = async () => {
  if (_state.resources.length > 0) return _state.resources;
  try {
    const response = await fetch("src/data/resources.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    _state.resources = data;
    return _state.resources;
  } catch (error) {
    console.error("Error fetching resources list:", error);
    return [];
  }
};

export const fetchResource = async (resourceId) => {
  if (_state.cache.has(resourceId)) return _state.cache.get(resourceId);

  const resource = _state.resources.find((r) => r.id === resourceId);
  if (!resource) return null;

  try {
    const response = await fetch(resource.file);
    const content = await response.text();
    const result = { ...resource, content };
    _state.cache.set(resourceId, result);
    return result;
  } catch (error) {
    console.error("Error fetching resource content:", error);
    return null;
  }
};

export const fetchConfig = async () => {
  if (_state.config) return _state.config;
  try {
    const response = await fetch("src/data/config.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    _state.config = await response.json();
    return _state.config;
  } catch (error) {
    console.error("Error fetching config:", error);
    return null;
  }
};

export const fetchProjects = async () => {
  if (_state.projects.length > 0) return _state.projects;
  try {
    const response = await fetch("src/data/projects.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    _state.projects = data;
    return _state.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

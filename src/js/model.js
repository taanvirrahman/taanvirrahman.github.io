const SHEET_URL = "https://script.google.com/macros/s/AKfycbydT3i4nOwfTakcqLwjTEI_EQcsSMuWZmSpmWHJPuyBC5AcdDXVPL9feHAkYXvcKs0i/exec";

/**
 * Private state object - not directly exported to prevent external mutations.
 * Access state through getter functions for encapsulation.
 */
const _state = {
  isMessageSent: false,
  message: "",
  blogPosts: [],
  researchPapers: [],
  currentPost: null,
  config: null,
  photos: [],
  cache: new Map(),
  theme: localStorage.getItem("theme") || "dark",
  clientIP: "unknown",
};

// Immutable state accessor (returns shallow copy for safe reads)
export const getState = () => ({ ..._state, cache: _state.cache });

// Specific getters for commonly accessed values
export const getTheme = () => _state.theme;
export const getMessage = () => _state.message;
export const getBlogPosts = () => _state.blogPosts;
export const getCache = () => _state.cache;

/**
 * Initialize model - must be called explicitly.
 * Pre-fetches client IP in background (non-blocking).
 */
export const initModel = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    _state.clientIP = data.ip;
  } catch (e) {
    console.warn("Could not pre-fetch IP");
  }
};

export const setTheme = (theme) => {
  _state.theme = theme;
  localStorage.setItem("theme", theme);
};

export const updateMessage = (text) => {
  _state.message = text;
};

export const submitToSheet = async (data) => {
  // Fire and forget - don't wait for response (Google Apps Script can be slow)
  fetch(SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, ip: _state.clientIP, timestamp: new Date().toISOString() }),
  }).catch(e => console.warn("Submission may have failed:", e));

  // Return immediately - don't wait
  return true;
};

export const markAsSent = () => {
  _state.isMessageSent = true;
};

export const fetchBlogPosts = async () => {
  if (_state.blogPosts.length > 0) return _state.blogPosts;
  try {
    const response = await fetch("content/notes/notes.json");
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
    const response = await fetch("content/research/papers.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    _state.researchPapers = data;
    return _state.researchPapers;
  } catch (error) {
    console.error("Error fetching research papers:", error);
    return [];
  }
};

export const fetchConfig = async () => {
  if (_state.config) return _state.config;
  try {
    const response = await fetch("config.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    _state.config = await response.json();
    return _state.config;
  } catch (error) {
    console.error("Error fetching config:", error);
    return null;
  }
};

export const fetchPhotos = async () => {
  if (_state.photos.length > 0) return _state.photos;
  try {
    const response = await fetch("assets/photography/images.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    _state.photos = data;
    return _state.photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};

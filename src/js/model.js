const SHEET_URL = "https://script.google.com/macros/s/AKfycbydT3i4nOwfTakcqLwjTEI_EQcsSMuWZmSpmWHJPuyBC5AcdDXVPL9feHAkYXvcKs0i/exec";

export const state = {
  isMessageSent: false,
  message: "",
  blogPosts: [],
  researchPapers: [],
  currentPost: null,
  config: null,
  cache: new Map(),
  theme: localStorage.getItem("theme") || "dark",
  clientIP: "unknown", // Pre-cached IP
};

// Pre-fetch IP on page load (runs in background, doesn't block)
(async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    state.clientIP = data.ip;
  } catch (e) {
    console.warn("Could not pre-fetch IP");
  }
})();

export const setTheme = (theme) => {
  state.theme = theme;
  localStorage.setItem("theme", theme);
};

export const updateMessage = (text) => {
  state.message = text;
};

export const submitToSheet = async (data) => {
  // Fire and forget - don't wait for response (Google Apps Script can be slow)
  fetch(SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, ip: state.clientIP, timestamp: new Date().toISOString() }),
  }).catch(e => console.warn("Submission may have failed:", e));

  // Return immediately - don't wait
  return true;
};

export const markAsSent = () => {
  state.isMessageSent = true;
};

export const fetchBlogPosts = async () => {
  if (state.blogPosts.length > 0) return state.blogPosts;
  try {
    const response = await fetch("content/notes/notes.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    state.blogPosts = data;
    return state.blogPosts;
  } catch (error) {
    console.error("Error fetching notes list:", error);
    return [];
  }
};

export const fetchBlogPost = async (postId) => {
  // Check cache first
  if (state.cache.has(postId)) {
    return state.cache.get(postId);
  }

  const post = state.blogPosts.find((p) => p.id === postId);
  if (!post) return null;

  try {
    const response = await fetch(post.file);
    const content = await response.text();

    // Senior performance move: Dynamic reading time calculation
    const wordCount = content.split(/\s+/g).length;
    const readingTime = Math.ceil(wordCount / 225) + " min read";

    const result = { ...post, content, readingTime };
    state.cache.set(postId, result); // Cache the result
    return result;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
};
export const fetchResearchPapers = async () => {
  if (state.researchPapers.length > 0) return state.researchPapers;
  try {
    const response = await fetch("content/research/papers.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    state.researchPapers = data;
    return state.researchPapers;
  } catch (error) {
    console.error("Error fetching research papers:", error);
    return [];
  }
};

export const fetchConfig = async () => {
  if (state.config) return state.config;
  try {
    const response = await fetch("config.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    state.config = await response.json();
    return state.config;
  } catch (error) {
    console.error("Error fetching config:", error);
    return null;
  }
};

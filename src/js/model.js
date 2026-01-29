export const state = {
  isMessageSent: false,
  message: "",
  blogPosts: [],
  currentPost: null,
  config: null,
  cache: new Map(), // Added caching for instantaneous page loads
};

export const updateMessage = (text) => {
  state.message = text;
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

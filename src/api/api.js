const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function apiFetch(path, options = {}, token = null) {
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const registerUser = (name, email, password) =>
  apiFetch("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });

export const loginUser = (email, password) =>
  apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });

// ── Search ────────────────────────────────────────────────────────────────────
export const searchMedia = (q, type) =>
  apiFetch(`/search?q=${encodeURIComponent(q)}&type=${type}`);

// ── Favorites ─────────────────────────────────────────────────────────────────
export const getFavorites = (token) =>
  apiFetch("/favorites", {}, token);

export const addFavorite = (token, payload) =>
  apiFetch("/favorites", { method: "POST", body: JSON.stringify(payload) }, token);

export const removeFavorite = (token, mediaId) =>
  apiFetch(`/favorites/${mediaId}`, { method: "DELETE" }, token);

// ── Reviews ───────────────────────────────────────────────────────────────────
export const getReviews = (mediaId) =>
  apiFetch(`/reviews/${mediaId}`);

export const postReview = (token, payload) =>
  apiFetch("/reviews", { method: "POST", body: JSON.stringify(payload) }, token);

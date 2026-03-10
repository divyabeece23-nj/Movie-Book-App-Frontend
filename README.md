# ◈ ReelReads — Frontend

> Find. Watch. Read. *Review.*

React frontend for ReelReads — a movie and book discovery app with favourites and reviews.

🔗 **Live Demo:** [movie-book-app-frontend.vercel.app](https://movie-book-app-frontend.vercel.app)  
🔗 **Backend Repo:** [github.com/yourusername/movie-book-app-backend](https://github.com/divyabeece23-nj/Movie-Book-App-Backend.git)

---

## Features

- 🔍 Search movies and books
- ❤️ Save and manage a personal favourites library
- ⭐ Read and write reviews per title
- 🔐 Register / login with JWT authentication
- 📱 Fully responsive — mobile, tablet, desktop

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI components |
| React Router v6 | Client-side routing |
| SCSS | Component-level styling |
| Vite | Dev server & build |
| Vercel | Deployment |

---

## Project Structure

```
src/
├── api/
│   └── api.js              # All API call functions
├── components/
│   ├── layout/
│   │   ├── Header.jsx      # Nav with mobile hamburger menu
│   │   └── Footer.jsx
│   └── modals/
│       ├── AuthModal.jsx   # Login / Register modal
│       └── DetailModal.jsx # Movie / book detail + reviews
├── context/
│   └── AuthContext.jsx     # JWT auth state (login, logout, token)
├── pages/
│   ├── DiscoverPage.jsx    # Search & browse
│   └── LibraryPage.jsx     # User's saved favourites
└── styles/
    └── global.scss
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Backend running locally or deployed — see [backend repo](https://github.com/divyabeece23-nj/Movie-Book-App-Backend.git)

### Install & run

```bash
git clone https://github.com/divyabeece23-nj/Movie-Book-App-Frontend.git
cd movie-book-app-frontend
npm install
```

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
# → http://localhost:5173
```

### Build for production

```bash
npm run build
# Output in /dist — drag to netlify.com/drop or deploy via Vercel
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Go to **Settings → Environment Variables** and add:
   ```
   VITE_API_URL = https://your-backend.onrender.com/api
   ```
4. Deploy — Vercel auto-redeploys on every push to `main`

> ⚠️ After adding or changing env variables, you must **manually redeploy** for them to take effect.

---

## Environment Variables

| Variable | Example | Description |
|---|---|---|
| `VITE_API_URL` | `https://your-backend.onrender.com/api` | Backend API base URL |

---

## What I Learned

- Structuring a React app with context, pages, and reusable components
- JWT auth flow — storing tokens, protecting routes with React Router
- Debugging CORS errors between a Vercel frontend and Render backend
- Environment variables in Vite (`import.meta.env`) and why they differ from Node.js
- Responsive design with SCSS and mobile-first breakpoints

---

## Author

**Divya Natarajan** ·

# 🥙 أبو شاورما — Restaurant Web App

A MERN-stack front-end project built with React.js, featuring an illustrated restaurant counter UI.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Restaurant entrance — click the door to enter |
| `/menu` | Illustrated counter with hover animations & filtering |
| `/dish/:id` | Interactive dish preparation page |
| `/about` | "Health Inspection Certificate" — about the team |
| `/login` | Employee back door — login placeholder |
| `/register` | New employee registration — placeholder |

## Features
- ✅ Illustrated restaurant counter (inspired by joguman.com)
- ✅ Hover animations on each dish based on its "mood"
- ✅ Click dish → interactive step-by-step preparation
- ✅ Search + category filter + sort (simultaneous, native JS array methods)
- ✅ Fully responsive (mobile + desktop)
- ✅ React Router v6 client-side routing
- ✅ Persistent header on all pages
- ✅ Arabic RTL layout with Google Fonts (Tajawal)

## Running Locally

```bash
npm install
npm start
```

## Deploying to Render.com

1. Push to GitHub (public repo)
2. Go to [render.com](https://render.com) → New → **Static Site**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `build`
5. Click Deploy

## Tech Stack
- React 18 + React Router v6
- CSS Animations (no external animation libraries)
- Native JS `.filter()` / `.sort()` for data logic
- Tajawal font (Arabic)

## Team Members
| Name | Student ID |
|------|------------|
| — | — |
| — | — |
| — | — |

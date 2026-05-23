# Xaalis — Landing Page

**Live:** https://xaalis-landing.vercel.app

Landing page for [Xaalis](https://github.com/atetheone/my_wallet), a personal budgeting PWA built for the CFA franc, in French.

## Stack

Plain HTML + React (via CDN) + Babel standalone. No build step, no bundler.

| File              | Role                              |
|-------------------|-----------------------------------|
| `index.html` | Entry point |
| `landing.jsx` | Main landing page component |
| `screens-1-2.jsx` | App screen mockups (screens 1–2) |
| `screens-3-5.jsx` | App screen mockups (screens 3–5) |
| `screens-6-7.jsx` | App screen mockups (screens 6–7) |
| `helpers.jsx` | Shared UI primitives |
| `styles.css` | Base styles |
| `landing.css` | Landing-specific styles |

## Development

Open `index.html` directly in a browser — no server required.

## Deployment

Deployed on Vercel with Web Analytics and Speed Insights enabled. Pushes to `main` trigger automatic redeployments.

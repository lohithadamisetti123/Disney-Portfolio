# ✨ The Kingdom of Lohitha — a scroll-to-play portfolio film

My developer portfolio told as a fairy-tale film. Scroll down to play the story forward, scroll up to rewind. Chapters for About, Education, Skills, Projects, Achievements, Experience and Contact appear inside the scenes.

**Built with:** React · TypeScript · Vite · Framer Motion · Lenis
**Visuals:** original characters and world, created with AI (ChatGPT images + Google Flow video)

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build   # output in dist/
```

## Edit content
- `src/data/portfolio.ts` — projects, skills, achievements, links
- `src/data/film.ts` — what appears when, and where
- `public/film/` — film frames (hd = 1920×1080, sd = 1280×720)

## Deploy
Import this repo on Vercel or Netlify (framework: Vite, build: `npm run build`, output: `dist`).

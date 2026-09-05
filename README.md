# LIPZCODE Dashboard — React

Modern React rewrite of the LIPZCODE portfolio dashboard.

## Stack

- Vite + React
- Framer Motion
- Responsive CSS glass UI
- Static assets for Vercel deployment

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The generated `dist/` directory is ready for Vercel static deployment.

## Vercel

Connect this repository to Vercel. Vercel should detect Vite automatically. Use `npm run build` as the build command and `dist` as the output directory.

## Structure

```text
src/
  components/
    AnimatedBackground.jsx
    Footer.jsx
    Hero.jsx
    LoadingScreen.jsx
    Navbar.jsx
    ProjectCard.jsx
    ProjectsSection.jsx
    Stats.jsx
  data/projects.js
  hooks/usePointerScene.js
  styles/app.css
  App.jsx
  main.jsx
public/assets/background.webp
```

The original UI-level sound control is retained. The supplied source archive did not contain `assets/suara.mp3`, so no replacement audio file was invented during migration.

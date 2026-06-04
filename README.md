# Edward Night — Resume Presentation

A 9-slide React resume site, styled after [elisebyolsen.com](https://elisebyolsen.com/), based on the [GitHub portfolio README](https://github.com/moonman89/moonman89).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Navigation

- Click section names in the header
- **←** / **→** at the bottom, or arrow keys / Space

## Push to GitHub

One-time login (if you have not already):

```bash
gh auth login
```

Create the repo and push:

```bash
cd /Users/christophnight/Projects/edward-night-resume
gh repo create edward-night-resume --public --source=. --remote=origin --push
```

## Live site (GitHub Pages)

After the first push:

1. On GitHub: **Settings → Pages → Build and deployment → Source:** **GitHub Actions**
2. Wait for the **Deploy to GitHub Pages** workflow to finish
3. Site URL: **https://moonman89.github.io/edward-night-resume/**

## Custom photos (full-bleed backgrounds)

Each slide uses a background image defined in `src/data/slides.ts`. To use your own work:

1. Add images to `public/slides/` (e.g. `cover.jpg`)
2. In `slides.ts`, set `image: "/edward-night-resume/slides/cover.jpg"` (or `/slides/cover.jpg` when running locally)

## Build

```bash
npm run build
npm run preview
```

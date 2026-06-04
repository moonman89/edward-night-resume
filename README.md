# Edward Night — Portfolio & Resume

Photo portfolio with **random cover per set on each load** and click-to-open slideshows, plus a resume presentation.

## Photo sets

Add images to `public/photos/your-set-id/` (e.g. `01.png`, `02.png`), then register the set in `src/data/photoSets.ts`:

```ts
{
  id: "your-set-id",
  title: "Your Set Name",
  year: "2026",
  coverPool: optional array of image srcs — defaults to all images,
  images: [
    photo("your-set-id", "01.png", "Caption"),
  ],
}
```

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

## Build

```bash
npm run build
npm run preview
```

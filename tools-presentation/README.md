# Modern AI Dev Tools — Presentation

Single-page React presentation covering **Cursor**, **Google Antigravity**, and **ROI** (return on investment).

## Run locally

```bash
cd tools-presentation
npm install
npm run dev
```

Open http://localhost:5173

## Edit content

Copy and data live in `src/data/`:

- `tools.ts` — tool descriptions, strengths, compare table rows
- `roi.ts` — default calculator inputs and ROI formulas

## Build

```bash
npm run build
npm run preview   # smoke-test production build at http://localhost:4173
```

## Firebase Hosting (first time)

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** (e.g. `ai-tools-roi`)
3. After creation, open **Build → Hosting → Get started**

### 3. Link this app to your project

Edit `.firebaserc` and replace `YOUR_FIREBASE_PROJECT_ID` with your real project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

Or run from `tools-presentation/`:

```bash
firebase use --add
```

### 4. Deploy

**From your Mac (local):**

```bash
cd tools-presentation
npm run deploy
```

**From Google Cloud Shell:**

Cloud Shell does not have this folder until the repo is on GitHub. First push from your Mac, then in Cloud Shell:

```bash
git clone https://github.com/moonman89/edward-night-resume.git
cd edward-night-resume/tools-presentation
npm install
npm run build
npx firebase-tools deploy --only hosting
```

Cloud Shell is already tied to your GCP project (`project-1-e54bb`). If deploy asks you to log in, run `firebase login` first.

**One-time:** enable Hosting in [Firebase Console](https://console.firebase.google.com/project/project-1-e54bb/hosting) → Get started.

Your site will be live at:

- `https://YOUR_PROJECT_ID.web.app`
- `https://YOUR_PROJECT_ID.firebaseapp.com`

## Project structure

```
src/
├── components/   Hero, ToolSection, ToolCard, CompareSection, RoiSection, Footer
├── data/         tools.ts, roi.ts
├── App.tsx
└── index.css
```

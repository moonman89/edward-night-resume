# Edward Night — Portfolio & Resume

Live **Instagram feed** on the Work page plus a resume presentation.

**Live site:** https://moonman89.github.io/edward-night-resume/

## Run locally

```bash
npm install
cp .env.example .env   # optional — for live Instagram grid
npm run dev
```

Open http://localhost:5173

## Instagram live feed (@studyofnight)

The Work page loads recent posts from Instagram using the **Instagram Graph API**. Without a token, visitors see a link to your profile and setup instructions.

### 1. Meta app & Instagram account

1. Go to [developers.facebook.com](https://developers.facebook.com/) → **My Apps** → **Create App** (type: Business).
2. Add product **Instagram** → **API setup with Instagram login** (or connect a Facebook Page if you use the business flow).
3. Your Instagram must be a **Creator** or **Business** account linked to the app.
4. Under **Instagram → API setup**, add permissions: `instagram_basic`, `instagram_manage_insights` (if offered), and anything required to read media.

### 2. Generate an access token

1. In the Meta app, open **Instagram → API setup** or **Tools → Graph API Explorer**.
2. Generate a **User access token** for your Instagram account.
3. Exchange for a **long-lived token** (recommended, ~60 days):

```bash
curl "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=YOUR_APP_SECRET&access_token=SHORT_LIVED_TOKEN"
```

### 3. Add token to this project

**Local:**

```bash
# .env
VITE_INSTAGRAM_ACCESS_TOKEN=your_long_lived_token
VITE_INSTAGRAM_USERNAME=studyofnight
```

Restart `npm run dev`.

**GitHub Pages (production):**

1. Repo → **Settings → Secrets and variables → Actions**
2. New secret: `VITE_INSTAGRAM_ACCESS_TOKEN` = your token
3. Push to `main` — the deploy workflow injects it at build time

> **Note:** The token is embedded in the built JavaScript (normal for static sites). Use a long-lived token with minimal permissions and rotate it when it expires. Do not commit `.env`.

### 4. Verify

Open the Work tab. You should see a grid of recent posts. Click a post for preview; **Open on Instagram** goes to the real post.

## Resume

Click **Resume** in the header for the slide deck. **Work** returns to the Instagram feed.

## Build

```bash
npm run build
npm run preview
```

## Deploy

Pushes to `main` run **Deploy to GitHub Pages** automatically.

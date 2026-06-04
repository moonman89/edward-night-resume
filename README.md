# Edward Night — Portfolio & Resume

Live **Instagram feed** on the Work page plus a resume presentation.

**Live site (with AI chat):** https://edward-night-resume.web.app

**GitHub Pages mirror:** https://moonman89.github.io/edward-night-resume/ — updates when `main` is pushed successfully; may lag behind Firebase Hosting.

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

## AI portfolio assistant (Firebase Functions)

The floating chatbot on every page calls **Firebase callable functions** — the browser never talks to OpenAI or other AI APIs directly. Your ChatGPT API key lives only in Functions secrets.

### 1. Initialize Functions (first time)

```bash
npm install -g firebase-tools
firebase login
cd /path/to/edward-night-resume
cd functions && npm install && cd ..
```

### 2. Firebase web config (frontend)

In [Firebase Console](https://console.firebase.google.com/) → Project **edward-night-resume** → Project settings → Your apps → Web app, copy the config into `.env`:

```bash
cp .env.example .env
```

Fill in `VITE_FIREBASE_*` in `.env` from the Firebase Console web app config.

Restart `npm run dev` after changing `.env`.

### 3. Set the OpenAI secret (backend)

Use the same API key as ChatGPT from [OpenAI API keys](https://platform.openai.com/api-keys) (requires API billing; separate from a plain ChatGPT Plus subscription).

```bash
firebase functions:secrets:set OPENAI_API_KEY
```

Paste your `sk-...` key when prompted.

Deploy functions so the secret is bound:

```bash
cd functions && npm run build && cd ..
firebase deploy --only functions
```

### 4. Test locally with emulators

Terminal 1 — build and start the Functions emulator:

```bash
cd functions
npm run build
cd ..
firebase emulators:start --only functions
```

Terminal 2 — in `.env` set `VITE_USE_FUNCTIONS_EMULATOR=true`, then:

```bash
npm run dev
```

Send a message in the chat panel. Image mode uses **DALL·E 3** (billed per image on your OpenAI account).

### 5. Deploy hosting + functions

```bash
npm run build
firebase deploy --only hosting,functions
```

Or hosting only / functions only:

```bash
firebase deploy --only hosting
firebase deploy --only functions
```

### Callable API

| Function | Payload | Response |
|----------|---------|----------|
| `askAssistant` | `{ message: string }` | `{ type: "text", answer: string }` |
| `generatePhoto` | `{ prompt: string }` | `{ type: "image", imageUrl: string, prompt: string }` |

Frontend calls use `httpsCallable(functions, "askAssistant")` and `httpsCallable(functions, "generatePhoto")` from `firebase/functions`.

### Models (optional)

Defaults: chat `gpt-4o-mini`, images `dall-e-3`. Override by setting env on the function runtime (e.g. `OPENAI_CHAT_MODEL=gpt-4o`) before deploy, or edit `functions/src/index.ts` / `imageGeneration.ts`.

## Deploy

Pushes to `main` run **Deploy to GitHub Pages** automatically.

For Firebase Hosting (with the AI assistant backend), use `firebase deploy` as above. GitHub Pages alone will show the UI but needs Firebase config in build secrets for live AI calls.

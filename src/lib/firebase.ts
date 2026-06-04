import { initializeApp, type FirebaseApp } from "firebase/app";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import {
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "../config/firebase.project";

function readEnv(value: string | undefined, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

/**
 * Firebase web config. apiKey/appId are optional for callable-only use but
 * recommended — set VITE_FIREBASE_* in .env or GitHub Actions secrets.
 */
const firebaseConfig = {
  apiKey: readEnv(import.meta.env.VITE_FIREBASE_API_KEY, ""),
  authDomain: readEnv(
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    FIREBASE_AUTH_DOMAIN,
  ),
  projectId: readEnv(
    import.meta.env.VITE_FIREBASE_PROJECT_ID,
    FIREBASE_PROJECT_ID,
  ),
  storageBucket: readEnv(
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    FIREBASE_STORAGE_BUCKET,
  ),
  messagingSenderId: readEnv(
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    "",
  ),
  appId: readEnv(import.meta.env.VITE_FIREBASE_APP_ID, ""),
};

let app: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseFunctions() {
  const firebaseApp = getFirebaseApp();
  const functions = getFunctions(firebaseApp, "us-central1");

  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_USE_FUNCTIONS_EMULATOR === "true"
  ) {
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  }

  return functions;
}

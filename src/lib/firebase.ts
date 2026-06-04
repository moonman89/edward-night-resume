import { initializeApp, type FirebaseApp } from "firebase/app";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

/**
 * Firebase web config (public client values).
 * Override via VITE_FIREBASE_* in .env or GitHub Actions secrets.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ??
    "edward-night-resume.firebaseapp.com",
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "edward-night-resume",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ??
    "edward-night-resume.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
};

let app: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    if (!firebaseConfig.projectId) {
      throw new Error(
        "Firebase is not configured. Add VITE_FIREBASE_* variables to .env (see README).",
      );
    }
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

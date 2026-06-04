import { FirebaseError } from "firebase/app";

const FRIENDLY: Record<string, string> = {
  internal:
    "The assistant service failed. Redeploy functions after fixes, then check: firebase functions:log",
  "failed-precondition":
    "Setup issue (API key, billing, or quota). See the message above or run firebase functions:log",
  unauthenticated:
    "Functions need public access. In the project folder run: npm run functions:public (after firebase login). Or in Google Cloud Console → Cloud Run → askassistant → Security → Allow unauthenticated.",
  "not-found": "Function not deployed. Run: firebase deploy --only functions",
  unavailable: "Assistant is temporarily unavailable. Try again shortly.",
};

/** Turn Firebase callable errors into readable chat messages. */
export function getCallableErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) {
    const code = err.code.replace(/^functions\//, "");
    const raw = err.message?.trim() ?? "";

    if (raw && raw !== "internal" && raw !== "INTERNAL") {
      return raw;
    }

    const details = (err as FirebaseError & { details?: unknown }).details;
    if (typeof details === "string" && details) return details;

    return FRIENDLY[code] ?? `Request failed (${code}).`;
  }

  if (err instanceof Error && err.message) {
    return err.message;
  }

  return "Something went wrong. Try again in a moment.";
}

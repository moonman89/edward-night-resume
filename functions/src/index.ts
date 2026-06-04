import { initializeApp } from "firebase-admin/app";
import { defineSecret } from "firebase-functions/params";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import OpenAI from "openai";
import { buildSystemPrompt } from "./assistantProfile.js";
import { generateImageFromPrompt } from "./imageGeneration.js";

initializeApp();

const openaiApiKey = defineSecret("OPENAI_API_KEY");

const OPENAI_CHAT_MODEL = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";

const callableOptions = {
  secrets: [openaiApiKey],
  cors: true,
  /** Required for portfolio visitors (no Firebase Auth login). */
  invoker: "public" as const,
};

type TextResponse = { type: "text"; answer: string };
type ImageResponse = { type: "image"; imageUrl: string; prompt: string };

function getOpenAIClient(apiKey: string): OpenAI {
  if (!apiKey?.trim()) {
    throw new HttpsError(
      "failed-precondition",
      "OPENAI_API_KEY is not configured. Set it with: firebase functions:secrets:set OPENAI_API_KEY",
    );
  }
  return new OpenAI({ apiKey });
}

function mapOpenAIError(err: unknown): never {
  console.error("OpenAI error:", err);

  if (err instanceof OpenAI.APIError) {
    const hint =
      err.status === 401
        ? "Invalid OpenAI API key. Create a new key at platform.openai.com/api-keys and update the Firebase secret."
        : err.status === 429
          ? "OpenAI rate limit or quota exceeded. Check billing at platform.openai.com."
          : err.message;

    throw new HttpsError("failed-precondition", hint);
  }

  const message = err instanceof Error ? err.message : "Assistant request failed.";
  throw new HttpsError("internal", message);
}

export const askAssistant = onCall(callableOptions, async (request): Promise<TextResponse> => {
  const message = request.data?.message;
  if (!message || typeof message !== "string" || !message.trim()) {
    throw new HttpsError("invalid-argument", "message is required");
  }

  try {
    const openai = getOpenAIClient(openaiApiKey.value());
    const completion = await openai.chat.completions.create({
      model: OPENAI_CHAT_MODEL,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: message.trim() },
      ],
    });

    const answer = completion.choices[0]?.message?.content?.trim();

    if (!answer) {
      throw new HttpsError("internal", "No response from the assistant.");
    }

    return { type: "text", answer };
  } catch (err) {
    if (err instanceof HttpsError) throw err;
    mapOpenAIError(err);
  }
});

export const generatePhoto = onCall(callableOptions, async (request): Promise<ImageResponse> => {
  const prompt = request.data?.prompt;
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    throw new HttpsError("invalid-argument", "prompt is required");
  }

  const trimmed = prompt.trim();

  try {
    const imageUrl = await generateImageFromPrompt(
      openaiApiKey.value(),
      trimmed,
    );
    return { type: "image", imageUrl, prompt: trimmed };
  } catch (err) {
    if (err instanceof HttpsError) throw err;
    mapOpenAIError(err);
  }
});

import { initializeApp } from "firebase-admin/app";
import { defineSecret } from "firebase-functions/params";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import OpenAI from "openai";
import { buildSystemPrompt } from "./assistantProfile.js";
import { generateImageFromPrompt } from "./imageGeneration.js";

initializeApp();

const openaiApiKey = defineSecret("OPENAI_API_KEY");

const OPENAI_CHAT_MODEL = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";

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

export const askAssistant = onCall(
  { secrets: [openaiApiKey], cors: true },
  async (request): Promise<TextResponse> => {
    const message = request.data?.message;
    if (!message || typeof message !== "string" || !message.trim()) {
      throw new HttpsError("invalid-argument", "message is required");
    }

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
  },
);

export const generatePhoto = onCall(
  { secrets: [openaiApiKey], cors: true },
  async (request): Promise<ImageResponse> => {
    const prompt = request.data?.prompt;
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      throw new HttpsError("invalid-argument", "prompt is required");
    }

    const trimmed = prompt.trim();
    const imageUrl = await generateImageFromPrompt(
      openaiApiKey.value(),
      trimmed,
    );

    return { type: "image", imageUrl, prompt: trimmed };
  },
);

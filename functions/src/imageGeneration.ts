import OpenAI from "openai";

const OPENAI_IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL ?? "dall-e-3";

/**
 * Generates an image with OpenAI (DALL·E). Requires billing on your OpenAI account.
 */
export async function generateImageFromPrompt(
  apiKey: string,
  prompt: string,
): Promise<string> {
  const openai = new OpenAI({ apiKey });
  const response = await openai.images.generate({
    model: OPENAI_IMAGE_MODEL,
    prompt: `Creative portfolio visual concept, professional and polished: ${prompt}`,
    n: 1,
    size: "1024x1024",
  });

  const imageUrl = response.data?.[0]?.url;
  if (!imageUrl) {
    throw new Error("OpenAI did not return an image URL.");
  }

  return imageUrl;
}

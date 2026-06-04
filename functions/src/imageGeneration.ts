import OpenAI from "openai";

/** DALL·E 2/3 are deprecated (May 2026). Use GPT Image models. */
const OPENAI_IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1";

/**
 * Generates an image with OpenAI GPT Image. Requires billing on your OpenAI account.
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

  const item = response.data?.[0];
  if (item?.url) {
    return item.url;
  }

  if (item?.b64_json) {
    return `data:image/png;base64,${item.b64_json}`;
  }

  throw new Error("OpenAI did not return an image URL or image data.");
}

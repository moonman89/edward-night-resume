import fs from "node:fs/promises";
import path from "node:path";

const username = process.env.INSTAGRAM_USERNAME || "studyofnight";
const token = process.env.INSTAGRAM_ACCESS_TOKEN || process.env.VITE_INSTAGRAM_ACCESS_TOKEN || "";
const igUserId = process.env.INSTAGRAM_USER_ID || "";
const limit = process.env.INSTAGRAM_LIMIT || "24";

const outDir = path.resolve("public");
const outFile = path.join(outDir, "instagram-feed.json");

function normalizePost(node) {
  const imageUrl =
    node.media_type === "VIDEO"
      ? node.thumbnail_url
      : node.media_url || node.thumbnail_url;

  if (!imageUrl) return null;

  return {
    id: node.id,
    caption: node.caption || "Instagram post",
    mediaType: node.media_type || "IMAGE",
    imageUrl,
    permalink: node.permalink || `https://www.instagram.com/${username}/`,
    timestamp: node.timestamp || "",
  };
}

async function writeFeed(posts = [], error = "") {
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(
    outFile,
    JSON.stringify(
      {
        username,
        generatedAt: new Date().toISOString(),
        error,
        posts,
      },
      null,
      2,
    ),
  );
}

async function fetchFeed() {
  if (!token) {
    console.log("Instagram feed skipped: INSTAGRAM_ACCESS_TOKEN is not set.");
    await writeFeed([], "INSTAGRAM_ACCESS_TOKEN is not set.");
    return;
  }

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
  ].join(",");

  const url = igUserId
    ? new URL(`https://graph.facebook.com/v21.0/${igUserId}/media`)
    : new URL("https://graph.instagram.com/me/media");

  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", limit);
  url.searchParams.set("access_token", token);

  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok || json.error) {
    const message = json.error?.message || "Could not load Instagram feed.";
    console.log(`Instagram feed error: ${message}`);
    await writeFeed([], message);
    return;
  }

  const posts = (json.data || []).map(normalizePost).filter(Boolean);
  console.log(`Instagram feed: saved ${posts.length} posts.`);
  await writeFeed(posts);
}

fetchFeed().catch(async (error) => {
  console.log(`Instagram feed script failed: ${error.message}`);
  await writeFeed([], error.message);
});

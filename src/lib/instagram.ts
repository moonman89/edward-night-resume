export type InstagramMedia = {
  id: string;
  caption: string;
  mediaType: string;
  imageUrl: string;
  permalink: string;
  timestamp: string;
};

type GraphMediaNode = {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  children?: { data: GraphMediaNode[] };
};

type GraphMediaResponse = {
  data: GraphMediaNode[];
  error?: { message: string; type: string; code: number };
};

const USERNAME =
  import.meta.env.VITE_INSTAGRAM_USERNAME?.trim() || "studyofnight";

export function getInstagramProfileUrl() {
  return `https://www.instagram.com/${USERNAME}/`;
}

export function hasInstagramToken() {
  return Boolean(import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN?.trim());
}

function imageFromNode(node: GraphMediaNode): string | null {
  if (node.media_type === "VIDEO") {
    return node.thumbnail_url ?? null;
  }
  if (node.media_type === "IMAGE") {
    return node.media_url ?? null;
  }
  if (node.media_type === "CAROUSEL_ALBUM") {
    const first = node.children?.data?.[0];
    if (first) return imageFromNode(first);
    return node.media_url ?? null;
  }
  return node.media_url ?? node.thumbnail_url ?? null;
}

function normalizeNode(node: GraphMediaNode): InstagramMedia | null {
  const imageUrl = imageFromNode(node);
  if (!imageUrl) return null;

  return {
    id: node.id,
    caption: node.caption?.trim() ?? "Instagram post",
    mediaType: node.media_type,
    imageUrl,
    permalink: node.permalink,
    timestamp: node.timestamp,
  };
}

export async function fetchInstagramFeed(
  limit = 24,
): Promise<InstagramMedia[]> {
  const token = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN?.trim();
  if (!token) {
    throw new Error("NO_TOKEN");
  }

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
    "children{media_type,media_url,thumbnail_url}",
  ].join(",");

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", token);

  const res = await fetch(url.toString());
  const json = (await res.json()) as GraphMediaResponse;

  if (json.error) {
    throw new Error(json.error.message);
  }

  if (!res.ok) {
    throw new Error("Could not load Instagram feed.");
  }

  return (json.data ?? [])
    .map(normalizeNode)
    .filter((item): item is InstagramMedia => item !== null);
}

export function getInstagramUsername() {
  return USERNAME;
}

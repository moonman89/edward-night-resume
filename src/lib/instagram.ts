export type InstagramMedia = {
  id: string;
  caption: string;
  mediaType: string;
  imageUrl: string;
  permalink: string;
  timestamp: string;
};

type StaticFeed = {
  username?: string;
  generatedAt?: string;
  error?: string;
  posts?: InstagramMedia[];
};

const USERNAME = import.meta.env.VITE_INSTAGRAM_USERNAME?.trim() || "studyofnight";

export function getInstagramProfileUrl() {
  return `https://www.instagram.com/${USERNAME}/`;
}

export function getInstagramUsername() {
  return USERNAME;
}

export async function fetchInstagramFeed(): Promise<InstagramMedia[]> {
  const response = await fetch(`${import.meta.env.BASE_URL}instagram-feed.json`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Instagram feed file was not found.");
  }

  const json = (await response.json()) as StaticFeed;

  if (json.error && (!json.posts || json.posts.length === 0)) {
    throw new Error(json.error);
  }

  return json.posts ?? [];
}

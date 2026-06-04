import { useEffect, useState } from "react";
import {
  fetchInstagramFeed,
  getInstagramProfileUrl,
  getInstagramUsername,
  type InstagramMedia,
} from "../lib/instagram";
import { PhotoLightbox } from "./PhotoLightbox";
import type { PortfolioImage } from "../data/photoSets";
import "./InstagramFeed.css";

type FeedState =
  | { status: "loading" }
  | { status: "ready"; posts: InstagramMedia[] }
  | { status: "error"; message: string };

function toLightboxImages(posts: InstagramMedia[]): PortfolioImage[] {
  return posts.map((post) => ({
    src: post.imageUrl,
    alt: post.caption.slice(0, 120),
  }));
}

export function InstagramFeed() {
  const [state, setState] = useState<FeedState>({ status: "loading" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchInstagramFeed()
      .then((posts) => {
        if (!cancelled) {
          if (posts.length > 0) {
            setState({ status: "ready", posts });
          } else {
            setState({ status: "error", message: "No Instagram posts were found in the generated feed." });
          }
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setState({ status: "error", message: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const username = getInstagramUsername();
  const profileUrl = getInstagramProfileUrl();

  if (state.status === "loading") {
    return (
      <div className="ig-feed">
        <p className="ig-status">Loading @{username}…</p>
        <div className="ig-skeleton-grid" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="ig-skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="ig-feed">
        <section className="ig-setup ig-setup-error">
          <p className="ig-setup-eyebrow">Instagram feed</p>
          <h2 className="ig-setup-title">Feed not connected yet</h2>
          <p className="ig-setup-text">
            The grid is ready, but GitHub needs an Instagram access token to generate the post feed during deployment.
          </p>
          <p className="ig-setup-note">{state.message}</p>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-btn ig-btn-primary"
          >
            Open @{username} on Instagram →
          </a>
        </section>
      </div>
    );
  }

  const lightboxImages = toLightboxImages(state.posts);

  return (
    <div className="ig-feed">
      <div className="ig-feed-bar">
        <p className="ig-feed-label">
          Live from{" "}
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            @{username}
          </a>
        </p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ig-feed-follow"
        >
          Follow →
        </a>
      </div>

      <div className="ig-grid">
        {state.posts.map((post, index) => (
          <button
            key={post.id}
            type="button"
            className="ig-card"
            onClick={() => setLightboxIndex(index)}
          >
            <img src={post.imageUrl} alt={post.caption} loading="lazy" decoding="async" />
            <span className="ig-card-scrim" />
            <span className="ig-card-type">{post.mediaType.replace("_", " ")}</span>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          images={lightboxImages}
          startIndex={lightboxIndex}
          setTitle={`@${username}`}
          onClose={() => setLightboxIndex(null)}
          getExternalUrl={(i) => state.posts[i]?.permalink}
        />
      )}
    </div>
  );
}

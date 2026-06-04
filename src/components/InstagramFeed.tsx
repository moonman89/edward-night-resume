import { useEffect, useState } from "react";
import {
  fetchInstagramFeed,
  getInstagramProfileUrl,
  getInstagramUsername,
  hasInstagramToken,
  type InstagramMedia,
} from "../lib/instagram";
import { PhotoLightbox } from "./PhotoLightbox";
import type { PortfolioImage } from "../data/photoSets";
import "./InstagramFeed.css";

type FeedState =
  | { status: "loading" }
  | { status: "ready"; posts: InstagramMedia[] }
  | { status: "error"; message: string }
  | { status: "setup" };

function toLightboxImages(posts: InstagramMedia[]): PortfolioImage[] {
  return posts.map((post) => ({
    src: post.imageUrl,
    alt: post.caption.slice(0, 120),
  }));
}

export function InstagramFeed() {
  const [state, setState] = useState<FeedState>(
    hasInstagramToken() ? { status: "loading" } : { status: "setup" },
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!hasInstagramToken()) {
      setState({ status: "setup" });
      return;
    }

    let cancelled = false;
    setState({ status: "loading" });

    fetchInstagramFeed()
      .then((posts) => {
        if (!cancelled) {
          setState({ status: "ready", posts });
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setState({
            status: "error",
            message:
              err.message === "NO_TOKEN"
                ? "Instagram token not configured."
                : err.message,
          });
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
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="ig-skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (state.status === "setup") {
    return (
      <div className="ig-feed">
        <section className="ig-setup">
          <p className="ig-setup-eyebrow">Live feed</p>
          <h2 className="ig-setup-title">Connect Instagram</h2>
          <p className="ig-setup-text">
            Add a Meta Instagram Graph API token to show recent posts from{" "}
            <a href={profileUrl} target="_blank" rel="noopener noreferrer">
              @{username}
            </a>{" "}
            automatically. See <code>README.md</code> for setup steps.
          </p>
          <div className="ig-setup-actions">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-btn ig-btn-primary"
            >
              View @{username} on Instagram →
            </a>
          </div>
          <p className="ig-setup-note">
            Local: create <code>.env</code> with{" "}
            <code>VITE_INSTAGRAM_ACCESS_TOKEN</code>. Production: add the same
            name as a GitHub Actions secret.
          </p>
        </section>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="ig-feed">
        <section className="ig-setup ig-setup-error">
          <p className="ig-setup-eyebrow">Feed error</p>
          <h2 className="ig-setup-title">Could not load posts</h2>
          <p className="ig-setup-text">{state.message}</p>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-btn"
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
            <img src={post.imageUrl} alt="" loading="lazy" decoding="async" />
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

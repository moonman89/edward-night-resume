import { useMemo, useState } from "react";
import { profileLinks } from "../data/links";
import {
  photoSets,
  pickRandomCover,
  type PhotoSet,
  type PortfolioImage,
} from "../data/photoSets";
import { PhotoLightbox } from "./PhotoLightbox";
import "./PhotoPortfolio.css";

type LightboxState = {
  set: PhotoSet;
  startIndex: number;
};

type CoverEntry = {
  set: PhotoSet;
  cover: PortfolioImage;
};

export function PhotoPortfolio({ onOpenResume }: { onOpenResume: () => void }) {
  const covers = useMemo<CoverEntry[]>(
    () =>
      photoSets.map((set) => ({
        set,
        cover: pickRandomCover(set),
      })),
    [],
  );

  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const openSet = (set: PhotoSet, cover: PortfolioImage) => {
    const startIndex = Math.max(
      0,
      set.images.findIndex((img) => img.src === cover.src),
    );
    setLightbox({ set, startIndex });
  };

  return (
    <div className="portfolio">
      <div className="portfolio-grain" aria-hidden />

      <header className="portfolio-header">
        <h1 className="portfolio-title">Edward Night</h1>
        <nav className="portfolio-nav">
          <button type="button" className="is-active">
            Work
          </button>
          <button type="button" onClick={onOpenResume}>
            Resume
          </button>
        </nav>
        <a href="mailto:mutedscience@icloud.com" className="portfolio-hire">
          Hire
        </a>
      </header>

      <div className="portfolio-links">
        {profileLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
          >
            → {link.label}
          </a>
        ))}
      </div>

      <p className="portfolio-hint">
        Cover rotates on every load · Click to open set
      </p>

      <main className="portfolio-grid">
        {covers.map(({ set, cover }) => (
          <button
            key={set.id}
            type="button"
            className="portfolio-card"
            onClick={() => openSet(set, cover)}
          >
            <span className="portfolio-card-media">
              <img src={cover.src} alt={cover.alt} loading="eager" />
              <span className="portfolio-card-scrim" />
              <span className="portfolio-card-cta">View set →</span>
            </span>
            <span className="portfolio-card-meta">
              <span className="portfolio-card-title">{set.title}</span>
              <span className="portfolio-card-count">
                {set.images.length} images
                {set.year ? ` · ${set.year}` : ""}
              </span>
            </span>
          </button>
        ))}
      </main>

      <footer className="portfolio-footer">
        <span>©{new Date().getFullYear()} Edward Night</span>
        <span className="portfolio-footer-note">
          Send the next photo set — we&apos;ll add a folder + entry in{" "}
          <code>photoSets.ts</code>
        </span>
      </footer>

      {lightbox && (
        <PhotoLightbox
          images={lightbox.set.images}
          startIndex={lightbox.startIndex}
          setTitle={lightbox.set.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

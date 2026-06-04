import { useCallback, useEffect, useState } from "react";
import type { PortfolioImage } from "../data/photoSets";
import "./PhotoLightbox.css";

type Props = {
  images: PortfolioImage[];
  startIndex: number;
  setTitle: string;
  onClose: () => void;
};

export function PhotoLightbox({
  images,
  startIndex,
  setTitle,
  onClose,
}: Props) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    setIndex(startIndex);
  }, [startIndex]);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const image = images[index];

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={setTitle}>
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
        Close ×
      </button>

      <header className="lightbox-header">
        <span className="lightbox-set">{setTitle}</span>
        <span className="lightbox-count">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </header>

      <figure className="lightbox-stage">
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className="lightbox-image"
        />
        <figcaption className="lightbox-caption">{image.alt}</figcaption>
      </figure>

      <nav className="lightbox-nav" aria-label="Slideshow">
        <button type="button" onClick={() => go(-1)} aria-label="Previous image">
          ← Prev
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next image">
          Next →
        </button>
      </nav>
    </div>
  );
}

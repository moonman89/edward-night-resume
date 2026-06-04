import { useCallback, useEffect, useState } from "react";
import { slides } from "../data/slides";
import "./SlideDeck.css";

const YEAR = new Date().getFullYear();

export function SlideDeck() {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const slide = slides[index];

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => Math.min(total - 1, Math.max(0, i + delta)));
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "Home") setIndex(0);
      if (e.key === "End") setIndex(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, total]);

  return (
    <div className="site">
      <header className="site-header">
        <button
          type="button"
          className="site-title"
          onClick={() => setIndex(0)}
        >
          Edward Night
        </button>

        <nav className="site-nav" aria-label="Sections">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`site-nav-link ${i === index ? "is-active" : ""}`}
              onClick={() => setIndex(i)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="site-meta">
          <a
            href="https://github.com/moonman89"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            GitHub
          </a>
        </div>
      </header>

      <main className="site-main" key={slide.id}>
        <aside className="site-aside" aria-hidden>
          <span className="slide-index">
            {String(index + 1).padStart(2, "0")}
          </span>
        </aside>

        <article className="site-content">
          <h1 className="content-title">{slide.title}</h1>

          {slide.subtitle && (
            <p className="content-lead">{slide.subtitle}</p>
          )}

          {slide.quote && <p className="content-quote">{slide.quote}</p>}

          {slide.bullets && (
            <ul className="content-list">
              {slide.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          {slide.links && slide.links.length > 0 && (
            <ul className="content-links">
              {slide.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </article>
      </main>

      <footer className="site-footer">
        <span className="copyright">©{YEAR}</span>

        <div className="pager">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous"
          >
            ←
          </button>
          <span className="pager-count">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === total - 1}
            aria-label="Next"
          >
            →
          </button>
        </div>
      </footer>
    </div>
  );
}

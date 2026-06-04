import { useCallback, useEffect, useState } from "react";
import { profileLinks } from "../data/links";
import { slides } from "../data/slides";
import "./SlideDeck.css";

const YEAR = new Date().getFullYear();
const MARQUEE =
  "EDWARD NIGHT · MORROWGRID · MUTED SCIENCE · AI SYSTEMS · CREATIVE OPS · STUDY OF NIGHT · ";

type SlideDeckProps = {
  onOpenPortfolio?: () => void;
};

export function SlideDeck({ onOpenPortfolio }: SlideDeckProps) {
  const [index, setIndex] = useState(0);
  const [motionKey, setMotionKey] = useState(0);
  const total = slides.length;
  const slide = slides[index];
  const progress = ((index + 1) / total) * 100;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => {
        const next = Math.min(total - 1, Math.max(0, i + delta));
        if (next !== i) setMotionKey((k) => k + 1);
        return next;
      });
    },
    [total],
  );

  const jump = useCallback((i: number) => {
    setIndex((prev) => {
      if (prev !== i) setMotionKey((k) => k + 1);
      return i;
    });
  }, []);

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
      if (e.key === "Home") jump(0);
      if (e.key === "End") jump(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, jump, total]);

  return (
    <div className="site">
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="site-grain" aria-hidden />

      {slide.id === "cover" && (
        <div className="marquee" aria-hidden>
          <div className="marquee-track">
            <span>{MARQUEE}</span>
            <span>{MARQUEE}</span>
          </div>
        </div>
      )}

      <div className="site-ui">
        <header className="site-header">
          <button type="button" className="site-title" onClick={() => jump(0)}>
            Edward Night
          </button>

          <nav className="site-nav" aria-label="Sections">
            {onOpenPortfolio && (
              <button
                type="button"
                className="site-nav-link site-nav-work"
                onClick={onOpenPortfolio}
              >
                Work
              </button>
            )}
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`site-nav-link ${i === index ? "is-active" : ""}`}
                onClick={() => jump(i)}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="site-meta">
            <a href="mailto:mutedscience@icloud.com" className="meta-cta">
              Hire
            </a>
          </div>
        </header>

        <div className="link-rail" aria-label="Portfolio links">
          {profileLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="link-rail-item"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="link-rail-label">{link.label}</span>
              {link.note && (
                <span className="link-rail-note">{link.note}</span>
              )}
            </a>
          ))}
        </div>

        <main className="site-main">
          <aside className="site-aside">
            <span className="slide-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="slide-total">/{String(total).padStart(2, "0")}</span>
            <p className="slide-id">{slide.id}</p>
          </aside>

          <article
            key={motionKey}
            className="site-content panel-enter"
            aria-live="polite"
          >
            <p className="content-eyebrow">{slide.label}</p>
            <h1
              className={`content-title ${slide.id === "cover" ? "is-hero" : ""}`}
            >
              {slide.title}
            </h1>

            {slide.subtitle && (
              <p className="content-lead">{slide.subtitle}</p>
            )}

            {slide.manifesto && (
              <p className="content-manifesto">{slide.manifesto}</p>
            )}

            {slide.quote && <p className="content-quote">{slide.quote}</p>}

            {slide.tags && slide.tags.length > 0 && (
              <ul className="content-tags" aria-label="Tags">
                {slide.tags.map((tag, i) => (
                  <li key={tag} style={{ animationDelay: `${120 + i * 50}ms` }}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {slide.bullets && (
              <ul className="content-list">
                {slide.bullets.map((item, i) => (
                  <li key={item} style={{ animationDelay: `${180 + i * 40}ms` }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {slide.projects && slide.projects.length > 0 && (
              <div className="content-projects">
                {slide.projects.map((project, i) => (
                  <section
                    key={project.name}
                    className="project-card"
                    style={{ animationDelay: `${200 + i * 70}ms` }}
                  >
                    <h2 className="project-name">{project.name}</h2>
                    <p className="project-desc">{project.description}</p>
                    <ul className="project-links">
                      {project.links.map((link) => (
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
                  </section>
                ))}
              </div>
            )}

            {slide.links && slide.links.length > 0 && (
              <ul className="content-links">
                {slide.links.map((link, i) => (
                  <li key={link.href} style={{ animationDelay: `${220 + i * 50}ms` }}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      className="content-link-card"
                    >
                      <span className="content-link-arrow">→</span>
                      <span className="content-link-text">
                        <span className="content-link-label">{link.label}</span>
                        {link.note && (
                          <span className="content-link-note">{link.note}</span>
                        )}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

          </article>
        </main>

        <footer className="site-footer">
          <span className="copyright">©{YEAR} Edward Night</span>
          <a
            href="https://github.com/moonman89/moonman89"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-readme"
          >
            README
          </a>

          <div className="pager">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label="Previous"
            >
              Prev
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
              Next
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

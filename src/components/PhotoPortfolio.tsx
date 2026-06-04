import { profileLinks } from "../data/links";
import { getInstagramUsername } from "../lib/instagram";
import { InstagramFeed } from "./InstagramFeed";
import "./PhotoPortfolio.css";

export function PhotoPortfolio({ onOpenResume }: { onOpenResume: () => void }) {
  const username = getInstagramUsername();

  return (
    <div className="portfolio">
      <div className="portfolio-grain" aria-hidden />

      <header className="portfolio-header">
        <h1 className="portfolio-title">Edward Night</h1>
        <nav className="portfolio-nav">
          <button type="button" className="is-active">
            Instagram
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
        Live feed from @{username} · Click a post to preview · Opens on Instagram
      </p>

      <main className="portfolio-main">
        <InstagramFeed />
      </main>

      <footer className="portfolio-footer">
        <span>©{new Date().getFullYear()} Edward Night</span>
      </footer>
    </div>
  );
}

import { profileLinks } from "../data/links";
import "./PhotoPortfolio.css";

const INSTAGRAM_URL = "https://instagram.com/studyofnight";

const instagramCards = [
  "AI systems",
  "Web tools",
  "Interface taste",
  "Photo direction",
  "Visual design",
  "Product polish",
  "Creative tech",
  "Field work",
  "Storytelling",
  "Build process",
  "Experiments",
  "Case studies",
];

export function PhotoPortfolio({ onOpenResume }: { onOpenResume: () => void }) {
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

      <section className="instagram-hero">
        <p className="portfolio-hint">Instagram / Visual archive</p>
        <h2>Photo, design, and visual direction live on Instagram.</h2>
        <p>
          This page no longer uses the old local photo portfolio. The visual work now points directly to the public Instagram archive, keeping the resume focused on IT engineering and AI systems while still showing the secondary creative skill set.
        </p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="instagram-cta">
          Open @studyofnight →
        </a>
      </section>

      <main className="instagram-grid" aria-label="Instagram preview grid">
        {instagramCards.map((label, index) => (
          <a
            key={label}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-card"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <span className="instagram-card-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="instagram-card-label">{label}</span>
            <span className="instagram-card-handle">@studyofnight</span>
          </a>
        ))}
      </main>

      <footer className="portfolio-footer">
        <span>©{new Date().getFullYear()} Edward Night</span>
        <span className="portfolio-footer-note">
          Live Instagram feed requires a backend API token. This static GitHub Pages version links cleanly to the public profile.
        </span>
      </footer>
    </div>
  );
}

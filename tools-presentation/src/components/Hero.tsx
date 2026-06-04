const NAV = [
  { href: "#tools", label: "Tools" },
  { href: "#compare", label: "Compare" },
  { href: "#roi", label: "ROI" },
];

export function Hero() {
  return (
    <header className="hero">
      <nav className="hero-nav">
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <p className="section-label">Presentation</p>
      <h1 className="hero-title">Modern AI Dev Tools</h1>
      <p className="hero-subtitle">
        Agentic IDEs are changing how teams ship software. Cursor and Google
        Antigravity put AI at the center of development — from inline edits to
        autonomous multi-step builds. The question is no longer whether to
        adopt them, but how to measure the return.
      </p>
      <style>{`
        .hero {
          padding: 48px 0 64px;
        }
        .hero-nav {
          display: flex;
          gap: 24px;
          margin-bottom: 48px;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .hero-nav a {
          color: #666;
        }
        .hero-nav a:hover {
          color: #e8e6e1;
          text-decoration: none;
        }
        .hero-title {
          font-family: Syne, sans-serif;
          font-size: clamp(36px, 7vw, 64px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin: 0 0 24px;
        }
        .hero-subtitle {
          color: #999;
          max-width: 640px;
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
        }
      `}</style>
    </header>
  );
}

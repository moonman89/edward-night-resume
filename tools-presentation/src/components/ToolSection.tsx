import { tools } from "../data/tools";
import { ToolCard } from "./ToolCard";

export function ToolSection() {
  return (
    <section id="tools" className="section">
      <p className="section-label">01 — Tools</p>
      <h2 className="section-title">Cursor & Antigravity</h2>
      <p className="section-subtitle">
        Two leading agentic development environments — different philosophies,
        same goal: ship faster with AI in the loop.
      </p>
      <div className="card-grid">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}

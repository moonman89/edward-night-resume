import type { Tool } from "../data/tools";

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="tool-card">
      <div>
        <h3 className="tool-card-name">{tool.name}</h3>
        <p className="tool-card-tagline">{tool.tagline}</p>
      </div>
      <p className="tool-card-desc">{tool.description}</p>
      <div>
        <p className="section-label">Strengths</p>
        <ul className="tool-card-list">
          {tool.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="section-label">Best for</p>
        <ul className="tool-card-list">
          {tool.useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <a
        className="tool-card-link"
        href={tool.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {tool.linkLabel} ↗
      </a>
    </article>
  );
}

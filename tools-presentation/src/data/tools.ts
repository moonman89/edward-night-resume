export type Tool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  useCases: string[];
  href: string;
  linkLabel: string;
};

export type CompareRow = {
  label: string;
  cursor: string;
  antigravity: string;
};

export const tools: Tool[] = [
  {
    id: "cursor",
    name: "Cursor",
    tagline: "AI-native IDE built on VS Code",
    description:
      "Cursor is a code editor forked from VS Code with AI deeply integrated into every workflow — inline edits, chat, agents, and multi-model support. Teams adopt it when they want familiar tooling with powerful agentic assistance.",
    strengths: [
      "VS Code extension ecosystem — drop-in for most teams",
      "Inline Tab completions and Cmd+K targeted edits",
      "Agent mode with codebase-wide context and MCP servers",
      "Multi-model support (Claude, GPT, Gemini, and more)",
      "Rules, skills, and project-level AI configuration",
    ],
    useCases: [
      "Day-to-day feature development and refactors",
      "Bug fixes with full repo context",
      "Bootstrapping new projects from specs",
      "Internal tools and dashboards",
    ],
    href: "https://cursor.com",
    linkLabel: "cursor.com",
  },
  {
    id: "antigravity",
    name: "Google Antigravity",
    tagline: "Agent-first IDE from Google",
    description:
      "Antigravity is Google's agentic development environment where autonomous agents plan, execute, and verify work across your codebase — with browser and deployment integrations built in. It targets teams that want agents to own multi-step tasks end-to-end.",
    strengths: [
      "Multi-agent orchestration for complex workflows",
      "Browser integration for testing and verification",
      "Tight Google Cloud and Firebase deployment paths",
      "Agent planning with human-in-the-loop review",
      "Built for long-running, multi-file tasks",
    ],
    useCases: [
      "Full feature builds from product specs",
      "End-to-end testing with browser agents",
      "GCP / Firebase project scaffolding and deploys",
      "Large refactors spanning many files",
    ],
    href: "https://antigravity.google",
    linkLabel: "antigravity.google",
  },
];

export const compareRows: CompareRow[] = [
  {
    label: "Workflow model",
    cursor: "Developer-led with AI assist — you drive, AI accelerates",
    antigravity: "Agent-first — agents plan and execute, you review",
  },
  {
    label: "Agent support",
    cursor: "Single agent with MCP tools, background tasks",
    antigravity: "Multi-agent orchestration with browser agents",
  },
  {
    label: "Ecosystem",
    cursor: "VS Code extensions, broad language support",
    antigravity: "Google Cloud stack, browser & deploy integrations",
  },
  {
    label: "Best for",
    cursor: "Teams already on VS Code wanting incremental AI adoption",
    antigravity: "Teams on GCP wanting autonomous multi-step builds",
  },
  {
    label: "Pricing",
    cursor: "Subscription — see cursor.com/pricing",
    antigravity: "Subscription — see antigravity.google",
  },
];

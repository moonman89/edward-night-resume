import type { LinkItem } from "./links";

export type StackGroup = {
  category: string;
  items: string[];
};

export type ProjectCard = {
  name: string;
  description: string;
  links: LinkItem[];
};

export type Slide = {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  stackGroups?: StackGroup[];
  links?: LinkItem[];
  projects?: ProjectCard[];
  tags?: string[];
  quote?: string;
  manifesto?: string;
};

export const slides: Slide[] = [
  {
    id: "cover",
    label: "Index",
    title: "Edward Night",
    subtitle:
      "AI Engineer · AI Architect · Workflow Engineer",
    manifesto:
      "AI systems first — architecture, engineering, and shipping real tools. Photo and creative work are a passion on the side.",
    quote: "Build the vision. Architect the system. Execute clean.",
    tags: ["AI Engineering", "AI Architecture", "Vertex AI", "React"],
    links: [
      { label: "Muted Science", href: "https://mutedscience.com" },
      { label: "Instagram", href: "https://instagram.com/studyofnight" },
      { label: "GitHub", href: "https://github.com/moonman89" },
    ],
  },
  {
    id: "identity",
    label: "Identity",
    title: "AI engineer & AI architect",
    subtitle: "Primary focus — design, build, and deploy AI-powered systems.",
    bullets: [
      "AI engineering: prototypes, integrations, automation, and production-ready workflows",
      "AI architecture: system logic, user flows, human-in-the-loop review, build-ready specs",
      "Less hype, more structure — systems teams can actually run",
      "Photography & creative direction — hobby and bonus skill set, not the day job",
    ],
    links: [{ label: "GitHub", href: "https://github.com/moonman89" }],
  },
  {
    id: "ai-architecture",
    label: "AI Architect",
    title: "AI systems architecture",
    subtitle: "Map how a business works → usable AI workflow logic.",
    bullets: [
      "Messy processes into clear AI-assisted workflows",
      "Lead management, task ownership, follow-ups, client communication",
      "Dashboards for teams, agencies, service businesses, founders",
      "Connect AI tools, automations, databases, and human review steps",
      "Business problems → system logic, UX flows, build-ready requirements",
    ],
    tags: ["System Logic", "Vertex AI", "Firebase", "Cloud Run"],
  },
  {
    id: "ai-workflows",
    label: "AI Engineer",
    title: "AI workflow engineering",
    subtitle: "Build, refine, ship — strategy through execution.",
    bullets: [
      "Operations, outreach, admin, and production management workflows",
      "Prompt systems, intake flows, automation logic, repeatable SOPs",
      "Internal tools, dashboards, AI-assisted workspaces",
      "Lead gen · client intake · production tracking · knowledge organization",
    ],
    tags: ["Prompt Systems", "Automation", "Node.js", "Python"],
    links: [{ label: "Muted Science repo", href: "https://github.com/moonman89/muted-science" }],
  },
  {
    id: "stack",
    label: "Stack",
    title: "Technical stack",
    subtitle: "Languages, cloud, and AI tooling.",
    stackGroups: [
      {
        category: "Web Frontend",
        items: ["React", "Flutter", "Vanilla JavaScript / HTML"],
      },
      {
        category: "Backend",
        items: ["Node.js", "Python", "Java", "C# .NET"],
      },
      {
        category: "Google Cloud",
        items: ["Firebase", "Cloud Run", "Vertex AI", "AI Studio"],
      },
      {
        category: "AI Tools",
        items: [
          "Antigravity Google",
          "Cursor",
          "Gemini 3.5",
          "Opus 4.8",
          "Sonnet 4.6",
        ],
      },
    ],
    tags: ["React", "Flutter", "Vertex AI", "Cursor"],
  },
  {
    id: "creative",
    label: "Creative",
    title: "Photo & creative — hobby + bonus",
    subtitle: "Passion project energy — strengthens taste and visual communication.",
    bullets: [
      "Photography direction & commercial image-making",
      "Video direction — artists, brands, campaigns, documentaries",
      "Fashion · music · editorial · commercial · documentary",
      "Post: DaVinci Resolve, Photoshop, Capture One, Figma",
      "Not primary hire focus — adds depth to AI and product work",
    ],
    links: [{ label: "Instagram", href: "https://instagram.com/studyofnight" }],
    tags: ["Study of Night", "Direction", "Post"],
  },
  {
    id: "projects",
    label: "Projects",
    title: "Current focus",
    subtitle: "Code, experiments, and creative-tech builds.",
    projects: [
      {
        name: "Muted Science",
        description:
          "Creative technology — experimental systems, automation, visual infrastructure.",
        links: [
          { label: "Site", href: "https://mutedscience.com" },
          { label: "GitHub", href: "https://github.com/moonman89/muted-science" },
        ],
      },
      {
        name: "GitHub — moonman89",
        description: "Portfolio, AI experiments, frontend and cloud projects.",
        links: [
          { label: "Profile", href: "https://github.com/moonman89" },
          { label: "Portfolio", href: "https://github.com/moonman89/moonman89" },
          { label: "framertochatgpt", href: "https://github.com/moonman89/framertochatgpt" },
          { label: "replitmutedscience", href: "https://github.com/moonman89/replitmutedscience" },
        ],
      },
    ],
    bullets: [
      "AI systems for operators — leads, briefs, timelines, follow-ups",
      "Web apps on React / Flutter with GCP backends",
    ],
  },
  {
    id: "value",
    label: "Edge",
    title: "Where I add value",
    subtitle: "Engineering rigor + optional creative eye.",
    bullets: [
      "Ship AI systems that connect to how teams already work",
      "Full stack from prompt logic to React/Flutter UI and Cloud Run deploys",
      "Creative background as a bonus — stronger UX, campaigns, and visual briefs",
    ],
    quote: "Build the vision. Architect the system. Execute clean.",
  },
  {
    id: "contact",
    label: "Contact",
    title: "Open to",
    subtitle: "AI engineering · architecture · full-stack with GCP.",
    bullets: [
      "AI workflow architecture & engineering",
      "Internal tools, dashboards, Vertex AI / Firebase builds",
      "React & Flutter frontends with Node, Python, or .NET backends",
      "Creative collaboration when it supports the product — not core hire",
    ],
    links: [
      { label: "Email", href: "mailto:mutedscience@icloud.com", note: "mutedscience@icloud.com" },
      { label: "Instagram", href: "https://instagram.com/studyofnight", note: "@studyofnight" },
      { label: "Muted Science", href: "https://mutedscience.com" },
      { label: "GitHub", href: "https://github.com/moonman89" },
      { label: "muted-science repo", href: "https://github.com/moonman89/muted-science" },
    ],
  },
];

import type { LinkItem } from "./links";

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
      "Producer · Photographer · Video Director · AI Systems Architect · Workflow Engineer",
    manifesto:
      "Camera, concept, execution, automation, systems — visuals that land, workflows that hold.",
    quote: "Co-Founder — Morrowgrid",
    tags: ["Creative Ops", "AI Systems", "Muted Science"],
    links: [
      { label: "Morrowgrid", href: "https://morrowgrid.com" },
      { label: "Muted Science", href: "https://mutedscience.com" },
      { label: "Instagram", href: "https://instagram.com/studyofnight" },
    ],
  },
  {
    id: "identity",
    label: "Identity",
    title: "Creative operator & AI systems builder",
    subtitle:
      "Director · producer · architect · workflow engineer — less hype, more structure.",
    bullets: [
      "Photography, video direction, commercial production, artist visuals, documentary, brand storytelling",
      "Through Morrowgrid: AI workflows, automation, dashboards, outreach, internal tools, team execution",
      "Making AI useful in the real world — better follow-up, cleaner handoffs, systems people actually use",
    ],
    links: [
      { label: "Morrowgrid", href: "https://morrowgrid.com" },
      { label: "GitHub", href: "https://github.com/moonman89" },
    ],
  },
  {
    id: "ai-architecture",
    label: "AI Systems",
    title: "AI systems architecture",
    subtitle: "Turn how a business already works into usable workflow logic.",
    bullets: [
      "Map messy processes into clear AI-assisted workflows",
      "Lead management, task ownership, follow-ups, client communication",
      "Dashboards for creative teams, agencies, service businesses, founders",
      "Connect AI tools, automations, databases, and human review steps",
      "Business problems → system logic, user flows, build-ready requirements",
    ],
    tags: ["Ops Mapping", "Dashboards", "System Logic"],
  },
  {
    id: "ai-workflows",
    label: "Workflows",
    title: "AI workflow engineering",
    subtitle: "Build, refine, prototype — strategy through execution.",
    bullets: [
      "Operations, outreach, admin, production management workflows",
      "Prompt systems, intake flows, automation logic, repeatable SOPs",
      "Internal tools, dashboards, AI-assisted workspaces",
      "Lead gen · client intake · production tracking · knowledge organization",
    ],
    tags: ["Prompt Systems", "SOPs", "Automation"],
    links: [{ label: "Muted Science repo", href: "https://github.com/moonman89/muted-science" }],
  },
  {
    id: "creative",
    label: "Creative",
    title: "Creative production",
    subtitle: "Visual identity, clean execution, practical delivery.",
    bullets: [
      "Photography direction & commercial image-making",
      "Video direction — artists, brands, campaigns, documentaries",
      "Shoot planning, visual concepts, production structure, rollout",
      "Fashion · music · editorial · commercial · documentary",
      "Post: editing, color, selection, delivery",
    ],
    links: [{ label: "Instagram", href: "https://instagram.com/studyofnight" }],
    tags: ["Direction", "Campaigns", "Post"],
  },
  {
    id: "business",
    label: "Business",
    title: "Morrowgrid & execution",
    subtitle: "From scattered admin to systems that scale.",
    bullets: [
      "Custom AI workflow systems for businesses",
      "Lead gen, outreach, follow-up structures",
      "Task ownership & production tracking dashboards",
      "Brand positioning, client acquisition, timeline management",
      "Messy ideas → executable systems",
    ],
    projects: [
      {
        name: "Morrowgrid",
        description:
          "AI-powered workflow & operations for teams drowning in follow-up debt.",
        links: [{ label: "morrowgrid.com", href: "https://morrowgrid.com" }],
      },
    ],
    links: [{ label: "Email", href: "mailto:mutedscience@icloud.com" }],
  },
  {
    id: "projects",
    label: "Projects",
    title: "Current focus",
    subtitle: "Where the work is living right now.",
    projects: [
      {
        name: "Morrowgrid",
        description:
          "Co-building AI ops — cleaner execution, communication, automation.",
        links: [{ label: "Site", href: "https://morrowgrid.com" }],
      },
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
        description: "Code, experiments, portfolio, creative-tech builds.",
        links: [
          { label: "Profile", href: "https://github.com/moonman89" },
          { label: "Portfolio", href: "https://github.com/moonman89/moonman89" },
          { label: "framertochatgpt", href: "https://github.com/moonman89/framertochatgpt" },
          { label: "replitmutedscience", href: "https://github.com/moonman89/replitmutedscience" },
        ],
      },
    ],
    bullets: [
      "AI systems for creative businesses — leads, briefs, timelines, vendors, follow-ups",
      "Creative direction + production with strong visual identity",
    ],
  },
  {
    id: "stack",
    label: "Stack",
    title: "Tools & work areas",
    bullets: [
      "AI / Systems — workflow design, architecture, prompts, automation, GitHub, CRM",
      "Creative — photography, video direction, producing, campaigns, visual strategy",
      "Post — DaVinci Resolve, Photoshop, Capture One, Figma",
      "Business — lead gen, positioning, acquisition, outreach, production planning",
    ],
    tags: [
      "AI Workflows",
      "DaVinci",
      "Capture One",
      "Figma",
      "Lead Gen",
      "Documentary",
      "Fashion",
      "Creative Tech",
    ],
  },
  {
    id: "value",
    label: "Edge",
    title: "Where I add value",
    subtitle: "Taste + structure — concept through delivery.",
    bullets: [
      "Shape the visual idea, organize production, understand the business goal",
      "Design the system around execution — handoff, repeat, automate, scale",
      "Creative instinct + operational architecture in one operator",
    ],
    quote: "Build the vision. Architect the system. Execute clean.",
  },
  {
    id: "contact",
    label: "Contact",
    title: "Open to",
    subtitle: "Founders · agencies · artists · operators.",
    bullets: [
      "AI workflow architecture & business automation",
      "Internal tools, dashboards, creative technology",
      "Brand / photo / video campaigns",
      "Artist visuals · documentary · field production",
      "Strategic collaborations",
    ],
    links: [
      { label: "Email", href: "mailto:mutedscience@icloud.com", note: "mutedscience@icloud.com" },
      { label: "Instagram", href: "https://instagram.com/studyofnight", note: "@studyofnight" },
      { label: "Morrowgrid", href: "https://morrowgrid.com" },
      { label: "Muted Science", href: "https://mutedscience.com" },
      { label: "GitHub", href: "https://github.com/moonman89" },
      { label: "muted-science repo", href: "https://github.com/moonman89/muted-science" },
    ],
  },
];

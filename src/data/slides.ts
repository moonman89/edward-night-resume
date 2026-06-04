export type Slide = {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  links?: { label: string; href: string }[];
  quote?: string;
};

export const slides: Slide[] = [
  {
    id: "cover",
    label: "Index",
    title: "Edward Night",
    subtitle:
      "Producer · Photographer · Video Director · AI Systems Architect · Workflow Engineer",
    quote: "Co-Founder of Morrowgrid",
  },
  {
    id: "identity",
    label: "Identity",
    title: "Creative operator & AI systems builder",
    subtitle:
      "Part director, part producer, part architect, part workflow engineer.",
    bullets: [
      "Photography, video direction, commercial production, and brand storytelling",
      "AI-assisted workflows, automation, dashboards, and team execution via Morrowgrid",
      "Less hype, more structure — systems people can actually use",
    ],
  },
  {
    id: "ai-architecture",
    label: "AI Systems",
    title: "AI systems architecture",
    bullets: [
      "Map messy business processes into clear AI-assisted workflows",
      "Design systems for leads, task ownership, follow-ups, and client communication",
      "Structure dashboards for creative teams, agencies, and founders",
      "Translate business problems into system logic and build-ready requirements",
    ],
  },
  {
    id: "ai-workflows",
    label: "Workflows",
    title: "AI workflow engineering",
    bullets: [
      "Build workflows for operations, outreach, admin, and production management",
      "Prompt systems, intake flows, automation logic, and repeatable SOPs",
      "Prototype internal tools, dashboards, and AI-assisted workspaces",
      "Lead gen, client intake, production tracking, and knowledge organization",
    ],
  },
  {
    id: "creative",
    label: "Creative",
    title: "Creative production",
    bullets: [
      "Photography direction and commercial image-making",
      "Video direction for artists, brands, campaigns, and documentaries",
      "Shoot planning, visual concepts, and creative rollout",
      "Fashion, music, editorial, commercial, and documentary visuals",
      "Post-production: editing, color, selection, and delivery",
    ],
  },
  {
    id: "business",
    label: "Business",
    title: "Morrowgrid & execution",
    bullets: [
      "Custom AI workflow systems for businesses",
      "Lead generation, outreach, and follow-up structures",
      "Task ownership and production tracking dashboards",
      "Brand positioning, client acquisition, and timeline management",
      "Turning messy ideas into executable systems",
    ],
    links: [{ label: "morrowgrid.com", href: "https://morrowgrid.com" }],
  },
  {
    id: "projects",
    label: "Projects",
    title: "Current focus",
    bullets: [
      "Morrowgrid — AI-powered operations for companies that need cleaner execution",
      "Muted Science — creative technology, automation, and visual infrastructure",
      "AI systems for creative businesses: leads, briefs, timelines, follow-ups",
      "Creative direction + production with strong visual identity and clean delivery",
    ],
    links: [
      { label: "mutedscience.com", href: "https://mutedscience.com" },
      {
        label: "github.com/moonman89/muted-science",
        href: "https://github.com/moonman89/muted-science",
      },
    ],
  },
  {
    id: "stack",
    label: "Stack",
    title: "Tools & work areas",
    bullets: [
      "AI: workflow design, prompt systems, automation logic, GitHub, CRM/task systems",
      "Creative: photography, video direction, producing, campaign concepts",
      "Post: DaVinci Resolve, Photoshop, Capture One, Figma",
      "Business: lead gen, brand positioning, outreach, production planning",
    ],
  },
  {
    id: "contact",
    label: "Contact",
    title: "Open to collaborate",
    bullets: [
      "AI workflow architecture and business automation",
      "Internal tools, dashboards, and creative technology",
      "Brand, photo, and video campaigns",
      "Artist visuals, documentary, and field production",
      "Strategic work with founders, agencies, artists, and operators",
    ],
    links: [
      { label: "mutedscience@icloud.com", href: "mailto:mutedscience@icloud.com" },
      { label: "github.com/moonman89", href: "https://github.com/moonman89" },
    ],
    quote: "Build the vision. Architect the system. Execute clean.",
  },
];

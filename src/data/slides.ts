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
      "Producer · Photographer · Video Director · AI Systems Architect · Workflow Engineer · Co-Founder of Morrowgrid",
    manifesto:
      "I work at the intersection of creative production, visual storytelling, AI systems, and business operations - building visuals that land and workflows that help teams execute cleaner.",
    quote: "Build the vision. Architect the system. Execute clean.",
    tags: ["Creative Operator", "AI Systems", "Workflow Engineering", "Morrowgrid"],
    links: [
      { label: "Email", href: "mailto:mutedscience@icloud.com", note: "mutedscience@icloud.com" },
      { label: "Instagram", href: "https://instagram.com/studyofnight", note: "@studyofnight" },
      { label: "Muted Science", href: "https://mutedscience.com" },
      { label: "GitHub", href: "https://github.com/moonman89" },
    ],
  },
  {
    id: "identity",
    label: "Identity",
    title: "Creative operator & AI systems builder",
    subtitle: "Part director, part producer, part architect, part workflow engineer.",
    bullets: [
      "Creative production background across photography, video direction, commercial work, artist visuals, documentary work, and brand storytelling",
      "AI systems focus through Morrowgrid: workflows, automation, dashboards, outreach systems, internal tools, and clearer team execution",
      "Real-world AI use: less hype, more structure, better follow-up, cleaner handoffs, and usable systems",
      "Edge: connecting taste, production discipline, business logic, and operational architecture",
    ],
    links: [{ label: "GitHub Profile", href: "https://github.com/moonman89" }],
  },
  {
    id: "ai-architecture",
    label: "AI Architect",
    title: "AI systems architecture",
    subtitle: "Map how a business works, then turn the chaos into usable workflow logic.",
    bullets: [
      "Map messy business processes into clear AI-assisted workflows",
      "Design internal systems for lead management, task ownership, follow-ups, and client communication",
      "Structure dashboards and operating systems for creative teams, agencies, service businesses, and founders",
      "Plan how AI tools, automations, databases, and human review steps should connect",
      "Translate business problems into system logic, user flows, and build-ready requirements",
    ],
    tags: ["System Logic", "Human Review", "Dashboards", "Build Specs"],
  },
  {
    id: "ai-workflows",
    label: "Workflow Engineer",
    title: "AI workflow engineering",
    subtitle: "Build and refine practical workflows for operations, outreach, admin, and production management.",
    bullets: [
      "Prompt systems, intake flows, automation logic, and repeatable SOPs",
      "Internal tools, dashboards, and AI-assisted workspaces",
      "Lead generation, outbound preparation, client intake, production tracking, and knowledge organization",
      "Work with developers and technical partners to turn system ideas into real products",
    ],
    tags: ["Prompt Systems", "Automation Logic", "Internal Tools", "Operations"],
    links: [{ label: "Muted Science repo", href: "https://github.com/moonman89/muted-science" }],
  },
  {
    id: "creative",
    label: "Creative",
    title: "Creative production",
    subtitle: "Photography, video direction, production structure, and visual storytelling.",
    bullets: [
      "Photography direction and commercial image-making",
      "Video direction for artists, brands, campaigns, and documentaries",
      "Shoot planning, visual concepts, production structure, and creative rollout",
      "Fashion, music, editorial, commercial, and documentary visuals",
      "Post-production direction across editing, color, image selection, and delivery",
    ],
    links: [{ label: "Instagram", href: "https://instagram.com/studyofnight", note: "@studyofnight" }],
    tags: ["Study of Night", "Direction", "Production", "Post"],
  },
  {
    id: "stack",
    label: "Stack",
    title: "Tools + stack",
    subtitle: "The practical toolset behind the work.",
    stackGroups: [
      {
        category: "AI / Systems",
        items: ["AI workflow design", "AI systems architecture", "Prompt systems", "Automation logic", "Operations mapping"],
      },
      {
        category: "Creative",
        items: ["Photography", "Video direction", "Creative direction", "Producing", "Visual strategy"],
      },
      {
        category: "Post / Design",
        items: ["DaVinci Resolve", "Photoshop", "Capture One", "Figma"],
      },
      {
        category: "Business",
        items: ["Lead generation", "Brand positioning", "Client acquisition", "Outreach strategy", "Production planning"],
      },
    ],
    tags: ["GitHub", "React", "AI Systems", "Creative Ops"],
  },
  {
    id: "projects",
    label: "Projects",
    title: "Current projects",
    subtitle: "Morrowgrid, Muted Science, and creative technology builds.",
    projects: [
      {
        name: "Morrowgrid",
        description:
          "AI-powered workflow and operations systems for companies that need cleaner execution, better task ownership, stronger follow-up systems, and usable automation.",
        links: [{ label: "Website", href: "https://morrowgrid.com" }],
      },
      {
        name: "Muted Science",
        description:
          "Creative technology project focused on experimental systems, digital tools, automation, visual direction, and AI workflow exploration.",
        links: [
          { label: "Website", href: "https://mutedscience.com" },
          { label: "Repository", href: "https://github.com/moonman89/muted-science" },
        ],
      },
      {
        name: "GitHub Profile",
        description:
          "Public profile and project archive for AI workflow experiments, creative technology builds, and portfolio infrastructure.",
        links: [
          { label: "Profile", href: "https://github.com/moonman89" },
          { label: "README", href: "https://github.com/moonman89/moonman89" },
        ],
      },
    ],
  },
  {
    id: "value",
    label: "Edge",
    title: "Where I add value",
    subtitle: "Useful when a project needs both taste and structure.",
    bullets: [
      "Shape the visual idea, organize the production, understand the business goal, and design the system around execution",
      "Care about the final image and the operating system behind how the work gets done, delivered, repeated, automated, and scaled",
      "Connect creative instinct with operational architecture: concept, workflow, handoff, system, and final delivery",
    ],
    quote: "The concept matters. The system around the concept matters too.",
  },
  {
    id: "contact",
    label: "Contact",
    title: "Open to",
    subtitle: "AI workflow architecture, creative production, business automation, and strategic collaborations.",
    bullets: [
      "AI workflow architecture and systems design for business operations",
      "Business automation, internal tools, and dashboard planning",
      "Creative production, brand/photo/video campaigns, artist visual direction, and documentary work",
      "Strategic collaborations with founders, agencies, artists, and operators",
    ],
    links: [
      { label: "Email", href: "mailto:mutedscience@icloud.com", note: "mutedscience@icloud.com" },
      { label: "Instagram", href: "https://instagram.com/studyofnight", note: "@studyofnight" },
      { label: "Morrowgrid", href: "https://morrowgrid.com" },
      { label: "Muted Science", href: "https://mutedscience.com" },
      { label: "GitHub", href: "https://github.com/moonman89", note: "moonman89" },
    ],
  },
];

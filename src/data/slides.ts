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
    subtitle: "IT Engineer · AI Engineer · AI Systems Architect · Workflow Engineer",
    manifesto:
      "I build practical AI-powered systems, web tools, workflow systems, and cloud-based applications. AI and IT engineering are the main focus; photo and design are secondary skills that sharpen product taste and presentation.",
    quote: "Build the system. Ship the tool. Make it usable.",
    tags: ["IT Engineer", "AI Engineer", "React", "Firebase", "E-commerce"],
    links: [
      { label: "Email", href: "mailto:mutedscience@icloud.com", note: "mutedscience@icloud.com" },
      { label: "Instagram", href: "https://instagram.com/studyofnight", note: "@studyofnight" },
      { label: "GitHub", href: "https://github.com/moonman89" },
    ],
  },
  {
    id: "identity",
    label: "Identity",
    title: "IT engineer with AI systems focus",
    subtitle: "Frontend, backend, cloud, AI tools, and workflow design.",
    bullets: [
      "Builds web tools, AI-supported workflows, dashboards, and internal systems",
      "Turns messy operational problems into user flows, system logic, technical requirements, and usable products",
      "Works across React, Flutter, NodeJS, Python, Java, C# .NET, Firebase, Cloud Run, Vertex AI, and AI Studio",
      "Photography and design are secondary strengths that improve interface taste, product storytelling, and presentation",
    ],
    links: [{ label: "GitHub Profile", href: "https://github.com/moonman89" }],
  },
  {
    id: "ai-architecture",
    label: "AI Architect",
    title: "AI systems architecture",
    subtitle: "Map how a business works, then turn the chaos into usable workflow logic.",
    bullets: [
      "Design AI-supported workflows for business operations",
      "Map business processes into clear system logic and user flows",
      "Structure internal tools, dashboards, and human-review steps",
      "Translate practical problems into build-ready technical requirements",
      "Plan how frontend, backend, cloud services, AI tools, and databases connect",
    ],
    tags: ["System Logic", "Human Review", "Dashboards", "Build Specs"],
  },
  {
    id: "ai-workflows",
    label: "AI Engineer",
    title: "AI workflow engineering",
    subtitle: "Build and refine practical workflows for outreach, admin, intake, and production management.",
    bullets: [
      "Prompt systems, intake flows, workflow logic, and repeatable SOPs",
      "Internal tools, dashboards, and AI-supported workspaces",
      "Lead generation, client intake, task tracking, and knowledge organization",
      "Developer collaboration to move from system idea to shipped product",
    ],
    tags: ["Prompt Systems", "Workflow Logic", "Internal Tools", "Operations"],
  },
  {
    id: "stack",
    label: "Stack",
    title: "Technical stack",
    subtitle: "Main engineering tools and platforms.",
    stackGroups: [
      {
        category: "Web Frontend",
        items: ["React", "Flutter", "Vanilla Javascript / HTML", "Figma"],
      },
      {
        category: "Backend",
        items: ["NodeJS", "Python", "Java", "C# .NET"],
      },
      {
        category: "Google Cloud",
        items: ["Firebase", "Cloud Run", "Vertex AI", "AI Studio"],
      },
      {
        category: "AI Tools",
        items: ["Google AI coding tools", "Cursor", "Gemini 3.5", "Opus 4.8", "Sonnet 4.6"],
      },
    ],
    tags: ["React", "Flutter", "Firebase", "Vertex AI"],
  },
  {
    id: "projects",
    label: "Projects",
    title: "Current project focus",
    subtitle: "Client builds, e-commerce systems, AI assistants, and portfolio infrastructure.",
    projects: [
      {
        name: "Metelyk — Tea Shop & Catalog",
        description:
          "English-language upscale tea storefront and product archive for the Metelyk brand (rebuilt from Syorb). React + Vite + TypeScript catalog, Firebase Firestore and Storage, e-commerce-ready data model, and planned AI tea assistant.",
        links: [
          { label: "Repository", href: "https://github.com/moonman89/metelyk" },
        ],
      },
      {
        name: "GitHub Profile",
        description:
          "Public profile and project archive for AI workflow experiments, creative technology builds, frontend work, and portfolio infrastructure.",
        links: [
          { label: "Profile", href: "https://github.com/moonman89" },
          { label: "README", href: "https://github.com/moonman89/moonman89" },
        ],
      },
      {
        name: "Resume / Portfolio Website",
        description:
          "React-based presentation website with slide-style resume pages, technical stack sections, rotating UI elements, and portfolio navigation.",
        links: [
          { label: "Repository", href: "https://github.com/moonman89/edward-night-resume" },
        ],
      },
    ],
  },
  {
    id: "creative",
    label: "Secondary",
    title: "Photo, design, and visual direction",
    subtitle: "Second skill set - useful for product polish, UI taste, and presentation.",
    bullets: [
      "Photography direction and commercial image-making",
      "Video direction for artists, brands, campaigns, and documentaries",
      "Visual design, campaign concepts, and brand storytelling",
      "Post-production direction across editing, color, image selection, and delivery",
      "Creative tools: Figma, DaVinci Resolve, Photoshop, and Capture One",
    ],
    links: [{ label: "Instagram", href: "https://instagram.com/studyofnight", note: "@studyofnight" }],
    tags: ["Figma", "Photography", "Design", "Visual Direction"],
  },
  {
    id: "value",
    label: "Edge",
    title: "Where I add value",
    subtitle: "Technical structure with creative judgment.",
    bullets: [
      "Shape the system, understand the business goal, plan the user flow, and organize the build",
      "Bring engineering structure to AI workflows, internal tools, cloud builds, and business systems",
      "Use photo and design background as a secondary advantage for sharper UI, storytelling, and product presentation",
    ],
    quote: "The system matters. The way it feels matters too.",
  },
  {
    id: "contact",
    label: "Contact",
    title: "Open to",
    subtitle: "IT engineering, AI engineering, cloud builds, and creative technology work.",
    bullets: [
      "IT engineering and AI workflow architecture",
      "E-commerce and catalog systems (e.g. Metelyk tea shop)",
      "React / Flutter frontend projects",
      "Firebase, Cloud Run, Vertex AI, and AI Studio builds",
      "Backend projects using NodeJS, Python, Java, or C# .NET",
      "Internal tools, dashboards, business systems, and creative technology collaborations",
    ],
    links: [
      { label: "Email", href: "mailto:mutedscience@icloud.com", note: "mutedscience@icloud.com" },
      { label: "Instagram", href: "https://instagram.com/studyofnight", note: "@studyofnight" },
      { label: "GitHub", href: "https://github.com/moonman89", note: "moonman89" },
    ],
  },
];

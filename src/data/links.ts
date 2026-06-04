export type LinkItem = {
  label: string;
  href: string;
  note?: string;
};

export const profileLinks: LinkItem[] = [
  { label: "Email", href: "mailto:mutedscience@icloud.com", note: "mutedscience@icloud.com" },
  { label: "Instagram", href: "https://instagram.com/studyofnight", note: "@studyofnight" },
  { label: "Morrowgrid", href: "https://morrowgrid.com" },
  { label: "Muted Science", href: "https://mutedscience.com" },
  { label: "GitHub", href: "https://github.com/moonman89", note: "moonman89" },
  { label: "Portfolio README", href: "https://github.com/moonman89/moonman89" },
];

export const projectLinks: LinkItem[] = [
  { label: "Morrowgrid", href: "https://morrowgrid.com", note: "AI ops + workflows" },
  { label: "Muted Science", href: "https://mutedscience.com", note: "Creative tech" },
  {
    label: "muted-science",
    href: "https://github.com/moonman89/muted-science",
    note: "Repo",
  },
  {
    label: "framertochatgpt",
    href: "https://github.com/moonman89/framertochatgpt",
    note: "Framer → ChatGPT",
  },
  {
    label: "replitmutedscience",
    href: "https://github.com/moonman89/replitmutedscience",
    note: "Replit build",
  },
];

export type PortfolioImage = {
  src: string;
  alt: string;
};

export type PhotoSet = {
  id: string;
  title: string;
  year?: string;
  /** Filenames for rotating covers, e.g. ["01.png", "04.png"] — defaults to all */
  coverPool?: string[];
  images: PortfolioImage[];
};

const base = import.meta.env.BASE_URL;

function photo(setId: string, file: string, alt: string): PortfolioImage {
  return {
    src: `${base}photos/${setId}/${file}`,
    alt,
  };
}

/** Add new sets here — one folder per set under public/photos/ */
export const photoSets: PhotoSet[] = [
  {
    id: "study-of-night",
    title: "Study of Night",
    year: "2025",
    images: [
      photo("study-of-night", "01.png", "Motion blur — figure in landscape"),
      photo("study-of-night", "02.png", "Urban field — towers and silhouette"),
      photo("study-of-night", "03.png", "Portrait — black beanie, studio"),
      photo("study-of-night", "04.png", "Low angle — suit and architecture"),
      photo("study-of-night", "05.png", "Full length — grass and brutalist blocks"),
      photo("study-of-night", "06.png", "Abstract blur — lavender and grain"),
      photo("study-of-night", "07.png", "Silhouette — chain link and light"),
      photo("study-of-night", "08.png", "Editorial — chair, toothpick, all black"),
      photo("study-of-night", "09.png", "Wind — blazer motion, low angle"),
      photo("study-of-night", "10.png", "Profile silhouette — industrial frame"),
      photo("study-of-night", "11.png", "Studio — stool, black tie, ribbed socks"),
      photo("study-of-night", "12.png", "Backlit — tie adjustment, housing blocks"),
    ],
  },
  {
    id: "fashion-editorial",
    title: "Fashion & Editorial",
    year: "2024",
    images: [
      photo("fashion-editorial", "01.png", "ANIMAL sweatshirt — rope cord, faux fur jacket"),
      photo("fashion-editorial", "02.png", "Patchwork denim — 11:11 tee, silver chain"),
      photo("fashion-editorial", "03.png", "Full look — denim patchwork wall and chaps"),
      photo("fashion-editorial", "04.png", "Studio portrait — tattoos, chain, hand over eyes"),
      photo("fashion-editorial", "05.png", "Black & white — animals & gods hoodie, framed"),
      photo("fashion-editorial", "06.png", "Red hair — animals & gods hoodie, orange frames"),
      photo("fashion-editorial", "07.png", "Window light — deconstructed denim, chains"),
      photo("fashion-editorial", "08.png", "Studio floor — GOD tee, harness, flame mesh sleeve"),
      photo("fashion-editorial", "09.png", "Close portrait — GOD tee, flame gloves, buzz cut"),
      photo("fashion-editorial", "10.png", "BTS studio — ANIMAL jacket, patchwork jeans"),
      photo("fashion-editorial", "11.png", "Streetwear — red hair, animals & gods, silver chains"),
    ],
  },
];

export function pickRandomCover(set: PhotoSet): PortfolioImage {
  if (set.coverPool?.length) {
    const candidates = set.images.filter((img) =>
      set.coverPool!.some((file) => img.src.endsWith(`/${file}`)),
    );
    if (candidates.length > 0) {
      return candidates[Math.floor(Math.random() * candidates.length)];
    }
  }
  return set.images[Math.floor(Math.random() * set.images.length)];
}

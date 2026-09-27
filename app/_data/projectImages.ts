// app/_data/projectImages.ts

// Shared TypeScript shape for any project image across your site
export interface ProjectImage {
  src: string;
  caption: string;
}

// ==========================================
// 1. ALPHABAG PROJECT
// ==========================================
export const alphabagImages: ProjectImage[] = [
  {
    src: "/assets/alphabag/alphabag-1.jpg",
    caption:
      "Caption for Alphabag screenshot 1 — describe what this screen shows.",
  },
  {
    src: "/assets/alphabag/alphabag-2.jpg",
    caption:
      "Caption for Alphabag screenshot 2 — describe what this screen shows.",
  },
  {
    src: "/assets/alphabag/alphabag-3.jpg",
    caption:
      "Caption for Alphabag screenshot 3 — describe what this screen shows.",
  },
  {
    src: "/assets/alphabag/alphabag-4.jpg",
    caption:
      "Caption for Alphabag screenshot 4 — describe what this screen shows.",
  },
  {
    src: "/assets/alphabag/alphabag-5.jpg",
    caption:
      "Caption for Alphabag screenshot 5 — describe what this screen shows.",
  },
  {
    src: "/assets/alphabag/alphabag-6.jpg",
    caption:
      "Caption for Alphabag screenshot 6 — describe what this screen shows.",
  },
  {
    src: "/assets/alphabag/alphabag-7.jpg",
    caption:
      "Caption for Alphabag screenshot 7 — describe what this screen shows.",
  },
  {
    src: "/assets/alphabag/alphabag-8.jpg",
    caption:
      "Caption for Alphabag screenshot 8 — describe what this screen shows.",
  },
];

// ==========================================
// FUTURE PROJECTS (Uncomment and add when ready)
// ==========================================
/*
export const fitnessAppImages: ProjectImage[] = [
  { src: "/assets/fitness/dashboard.jpg", caption: "Workout tracking dashboard." },
];

export const eCommImages: ProjectImage[] = [
  { src: "/assets/ecommerce/cart.jpg", caption: "Shopping cart checkout flow." },
];
*/

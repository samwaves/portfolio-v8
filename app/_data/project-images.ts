import type { ProjectImage } from "@/types/project";

function createProjectImages(
  folder: string,
  images: [filename: string, caption: string][]
): ProjectImage[] {
  return images.map(([filename, caption]) => ({
    src: `/assets/${folder}/${filename}`,
    caption,
  }));
}

// internship projects

export const smsAlphabagImages = createProjectImages("sms-alphabag", [
  ["timetable.jpeg", "A timetable showing all courses in one place"],
  [
    "students.jpeg",
    "Shows information about all enrolled students, with the option to edit their personal details",
  ],
  [
    "enrollment.jpeg",
    "Enrollment for new students. Allows you to select a course for them to be enrolled in",
  ],
  [
    "requests.jpeg",
    "Allows you to approve or reject requests sent by parents from the parent portal to change course times",
  ],
  [
    "pdf-generator.jpeg",
    "Immediately generates a receipt just by inputting a student ID, and allows for download and saving",
  ],
  [
    "gallery.jpeg",
    "Allows you to upload or delete images that will show up in students' profile in the parent portal",
  ],
]);

export const avatarCreatorAlphabagImages = createProjectImages(
  "avatar-creator-alphabag",
  [
    ["body.jpeg", "Select eye color, hair style, and gender"],
    ["outfit-1.jpeg", "Select outfit"],
    ["outfit-2.jpeg", "Within each category, there are outfits to choose from"],
    ["background.jpeg", "Select background"],
    [
      "accessories.jpeg",
      "Decorate your avatar by freely placing accessories anywhere on the page",
    ],
    [
      "canvas.jpeg",
      "Students are allowed to use paintbrushes to draw custom things",
    ],
    ["export.jpeg", "The image can be exported and downloaded"],
  ]
);

// personal projects

export const handwritingClassifierImages = createProjectImages(
  "handwriting-classifier",
  [["file-structure.jpg", "Caption"]]
);

export const consoleAIChatImages = createProjectImages("console-ai-chat", [
  ["ai-chat.jpg", "Caption"],
]);

export const acneImpactPrototypeImages = createProjectImages(
  "acne-impact-prototype",
  [["acne-impact-home.jpg", "Caption"]]
);

// competitions

export const miniRovCompetitionImages = createProjectImages(
  "mini-rov-competition",
  [["rov-group-photo.jpg", "Caption"]]
);

export const vexV5CompetitionImages = createProjectImages(
  "vex-v5-competition",
  [["vex-v5-game.jpg", "Caption"]]
);

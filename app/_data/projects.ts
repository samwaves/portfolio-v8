import {
  acneImpactPrototypeImages,
  avatarCreatorAlphabagImages,
  consoleAIChatImages,
  handwritingClassifierImages,
  miniRovCompetitionImages,
  smsAlphabagImages,
  vexV5CompetitionImages,
} from "./project-images";
import type { ProjectCategory } from "@/types/project";

export const projectsData: ProjectCategory[] = [
  {
    title: "Selected Work",
    projects: [
      {
        id: "sms-alphabag",
        title: "Student Management System",
        subtitle: "Internship @ Alphabag Limited",
        technologies: ["Next.js", "Firebase"],
        description: "**Role: Software Engineering Intern**\n\nHi",
        images: smsAlphabagImages,
      },
      {
        id: "avatar-creator-alphabag",
        title: "Avatar Creator",
        subtitle: "Internship @ Alphabag Limited",
        technologies: ["Next.js"],
        description:
          "Designed and developed a full-stack student management system...",
        images: avatarCreatorAlphabagImages,
      },
      {
        id: "handwriting-classifier",
        title: "Handwriting Classifier",
        subtitle: "Personal Project",
        technologies: ["Next.js", "Firebase"],
        description:
          "Designed and developed a full-stack student management system...",
        images: handwritingClassifierImages,
      },
      {
        id: "console-ai-chat",
        title: "Console AI Chat",
        subtitle: "Personal Project",
        technologies: ["Next.js", "Firebase"],
        description:
          "Designed and developed a full-stack student management system...",
        images: consoleAIChatImages,
      },
      {
        id: "acne-impact-prototype",
        title: "Acne Impact Prototype",
        subtitle: "Personal Project",
        technologies: ["Next.js", "Firebase"],
        description:
          "Designed and developed a full-stack student management system...",
        images: acneImpactPrototypeImages,
      },
    ],
  },
  {
    title: "Competitions",
    projects: [
      {
        id: "mini-rov-competition",
        title: "Mini-ROV Competition",
        technologies: ["Arduino", "C++"],
        description:
          "Designed and developed a full-stack student management system...",
        images: miniRovCompetitionImages,
      },
      {
        id: "vex-v5-competition",
        title: "Vex V5 Robotics Competition",
        technologies: ["Next.js", "Firebase"],
        description:
          "Designed and developed a full-stack student management system...",
        images: vexV5CompetitionImages,
      },
    ],
  },
];

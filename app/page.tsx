import SocialMediaIcons from "./components/SocialMediaIcons";
import ProjectCard from "./components/ProjectCard";
import { alphabagImages } from "./_data/projectImages";

export default function Home() {
  const projects = [
    {
      title: "Internship Projects",
      projects: [
        {
          title: "Student Management System @ Alphabag Limited",
          technologies: ["Next.js", "Firebase"],
          description:
            "Designed and developed a full-stack student management system...",
          thumbnail: alphabagImages[0].src,
          modalImages: alphabagImages,
        },
        {
          title: "Student Management System @ Alphabag Limited",
          technologies: ["Next.js", "Firebase"],
          description:
            "Designed and developed a full-stack student management system...",
          thumbnail: alphabagImages[0].src,
          modalImages: alphabagImages,
        },
        {
          title: "Student Management System @ Alphabag Limited",
          technologies: ["Next.js", "Firebase"],
          description:
            "Designed and developed a full-stack student management system...",
          thumbnail: alphabagImages[0].src,
          modalImages: alphabagImages,
        },
      ],
    },
    {
      title: "Personal Projects",
      projects: [
        {
          title: "Student Management System @ Alphabag Limited",
          technologies: ["Next.js", "Firebase"],
          description:
            "Designed and developed a full-stack student management system...",
          thumbnail: alphabagImages[0].src,
          modalImages: alphabagImages,
        },
      ],
    },
    {
      title: "Competitions",
      projects: [
        {
          title: "Student Management System @ Alphabag Limited",
          technologies: ["Next.js", "Firebase"],
          description:
            "Designed and developed a full-stack student management system...",
          thumbnail: alphabagImages[0].src,
          modalImages: alphabagImages,
        },
      ],
    },
  ];

  return (
    <div className="mx-auto p-8 max-w-7xl flex flex-col gap-3 font-mono">
      <header>
        <nav className="flex justify-between items-center">
          <span>
            <a href="/">samwave.io</a>
          </span>
          <SocialMediaIcons />
        </nav>
      </header>
      <section className="my-10 space-y-4">
        <h1 className="text-5xl">Hi, I'm Samuel Lee</h1>
        <p>
          I'm a <span className="bg-sky-200 px-1">software engineer</span>, and
          I specialize in building full stack applications
        </p>
        <p>
          I'm currently a Year 2 student studying Information and Artificial
          Intelligence Engineering at PolyU in Hong Kong.
        </p>
      </section>
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((col, colIdx) => (
          <article key={colIdx} className="flex flex-col gap-3">
            <h2>{col.title}</h2>
            <div className="flex flex-col gap-4">
              {col.projects.map((project, projIdx) => (
                <ProjectCard key={projIdx} {...project} />
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

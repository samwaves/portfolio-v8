import SocialMediaIcons from "@/components/SocialMediaIcons";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "./_data/projects";
import profilePhoto from "@/public/assets/profile-photo.jpg";

export default function Home() {
  return (
    <div className="bg-page-pattern mx-auto flex min-h-dvh w-full max-w-400 flex-col">
      <header>
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between gap-4 p-6 sm:p-8"
        >
          <a
            href="/"
            aria-label="samwave.io home"
            className="focus-ring rounded-sm"
          >
            samwave.io
          </a>

          <SocialMediaIcons />
        </nav>
      </header>

      <main>
        <section
          aria-labelledby="intro-heading"
          className="flex flex-col gap-8 p-6 pb-16 sm:p-8 sm:pb-16 lg:flex-row lg:items-center"
        >
          <img
            src={profilePhoto.src}
            width={profilePhoto.width}
            height={profilePhoto.height}
            alt="Samuel Lee"
            className="size-30 shrink-0 rounded-xl border border-border-strong object-cover sm:size-50"
          />

          <div className="min-w-0 space-y-4">
            <h1
              id="intro-heading"
              className="font-sans text-6xl font-semibold tracking-[-0.05em] ml-[-3px] sm:text-8xl"
            >
              Samuel Lee
            </h1>

            <p>
              I'm a software engineer, and I specialize in building full stack
              applications.
            </p>

            <p className="text-sm text-subtle">
              Year 2 Information &amp; AI Engineering Student @ PolyU
            </p>
          </div>
        </section>

        <section
          aria-label="Projects"
          className="flex w-full flex-col gap-12 bg-surface p-6 sm:p-8"
        >
          {projectsData.map((category) => (
            <section
              key={category.title}
              aria-label={category.title}
              className="flex flex-col gap-4"
            >
              <h2 className="font-sans text-4xl font-semibold tracking-tight">
                {category.title}
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.projects.map((project) => (
                  <ProjectCard key={project.title} {...project} />
                ))}
              </div>
            </section>
          ))}
        </section>
      </main>

      <footer className="mt-auto p-6 text-sm sm:p-8">
        Built with Next.js ·{" "}
        <a
          href="https://github.com/samwaves/portfolio-v8"
          className="text-link"
        >
          View source
        </a>
      </footer>
    </div>
  );
}

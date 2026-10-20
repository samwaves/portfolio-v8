import SocialMediaIcons from "@/components/social-media-icons";
import ProjectCard from "@/components/project-card";
import ContactActions from "@/components/contact-actions";
import { projectsData } from "./_data/projects";
import profilePhoto from "@/public/assets/profile-photo.jpg";

export default function Home() {
  return (
    <div className="bg-page-pattern flex min-h-dvh w-full flex-col">
      <header>
        <nav
          aria-label="Main navigation"
          className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 p-6 sm:p-8"
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
          className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 pb-16 sm:p-8 sm:pb-16 lg:flex-row lg:items-center"
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
              className="ml-[-3px] font-sans text-5xl font-semibold tracking-[-0.05em] sm:text-6xl"
            >
              Samuel Lee
            </h1>

            <p>
              Software engineer with full-stack experience, exploring machine
              learning.
            </p>

            <p className="text-sm text-subtle">
              Year 2 Information &amp; AI Engineering Student @ PolyU
            </p>

            <ContactActions />
          </div>
        </section>

        <section aria-label="Projects" className="w-full bg-surface">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 p-6 sm:p-8">
            {projectsData.map((category) => (
              <section
                key={category.title}
                aria-label={category.title}
                className="flex flex-col gap-4"
              >
                <h2 className="font-sans text-4xl font-semibold tracking-tight">
                  {category.title}
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.projects.map((project) => (
                    <ProjectCard key={project.title} {...project} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-auto w-full max-w-7xl p-6 text-sm sm:p-8">
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

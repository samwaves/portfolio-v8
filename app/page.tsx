import SocialMediaIcons from "@/components/SocialMediaIcons";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "./_data/projects";

export default function Home() {
  return (
    <div className="p-8 max-w-400 mx-auto flex flex-col gap-10 font-mono text-sky-900 dark:text-sky-200">
      <header>
        <nav className="flex justify-between items-center">
          <span>
            <a href="/">samwave.io</a>
          </span>
          <SocialMediaIcons />
        </nav>
      </header>
      <section className="space-y-4">
        <h1 className="text-6xl sm:text-9xl font-semibold">Samuel Lee</h1>
        <p>
          I'm a{" "}
          <span className="bg-slate-200 dark:bg-slate-800 px-1">
            software engineer
          </span>
          , and I specialize in building full stack applications
        </p>
        <p className="text-sm opacity-70">
          Year 2 Information & AI Engineering Student @ PolyU
        </p>
      </section>
      <div className="w-full border border-0.5 border-slate-300 dark:border-slate-800"></div>
      <section className="flex w-full flex-col gap-12">
        {projectsData.map((category) => (
          <article key={category.title} className="flex flex-col gap-4">
            <h2 className="text-4xl font-semibold">{category.title}</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.projects.map((project, projIdx) => (
                <ProjectCard key={projIdx} {...project} />
              ))}
            </div>
          </article>
        ))}
      </section>
      <footer className="text-sm">
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

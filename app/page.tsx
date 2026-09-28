import SocialMediaIcons from "@/components/SocialMediaIcons";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "./_data/projects";

export default function Home() {
  return (
    <div className="mx-auto p-8 max-w-5xl flex flex-col gap-10 font-mono">
      <header>
        <nav className="flex justify-between items-center">
          <span>
            <a href="/">samwave.io</a>
          </span>
          <SocialMediaIcons />
        </nav>
      </header>
      <section className="space-y-4">
        <h1 className="text-5xl">Hi, I'm Samuel Lee</h1>
        <p>
          I'm a{" "}
          <span className="bg-slate-200 dark:bg-slate-800 px-1">
            software engineer
          </span>
          , and I specialize in building full stack applications
        </p>
        <p>
          I'm currently a Year 2 student studying Information and Artificial
          Intelligence Engineering at PolyU in Hong Kong.
        </p>
      </section>
      <section className="flex w-full flex-col gap-12">
        {projectsData.map((category) => (
          <article key={category.title} className="flex flex-col gap-4">
            <h2>{category.title}</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {category.projects.map((project, projIdx) => (
                <ProjectCard key={projIdx} {...project} />
              ))}
            </div>
          </article>
        ))}
      </section>
      <footer>
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

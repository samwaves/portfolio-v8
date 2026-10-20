import { buttonVariants } from "@/components/ui/button";

export default function ContactActions() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <a
        href="mailto:sam@samwave.io"
        className={buttonVariants({
          variant: "primary",
          className: "gap-2",
        })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
        Email me
      </a>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View résumé (opens in a new tab)"
        className="focus-ring inline-flex items-center gap-1.5 rounded-sm py-2 text-sm font-medium text-subtle underline-offset-4 transition-colors hover:text-link hover:underline motion-reduce:transition-none"
      >
        View résumé
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
          aria-hidden="true"
        >
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>
    </div>
  );
}

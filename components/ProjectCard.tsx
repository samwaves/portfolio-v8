"use client";

import type { Project } from "@/types/project";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";

const styles = {
  focus:
    "focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-sky-700 focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-white " +
    "dark:focus-visible:ring-sky-400 " +
    "dark:focus-visible:ring-offset-slate-950",

  tag:
    "max-w-full rounded bg-slate-300 px-2 py-0.5 " +
    "text-xs text-slate-700 " +
    "dark:bg-slate-800 dark:text-slate-300",

  link:
    "text-sky-700 transition-colors hover:text-sky-800 " +
    "hover:underline underline-offset-4 " +
    "dark:text-sky-400 dark:hover:text-sky-300",

  secondaryButton:
    "inline-flex items-center justify-center rounded-md " +
    "border border-slate-200 bg-slate-300 px-3 py-2 " +
    "text-sm font-medium text-slate-700 " +
    "transition-colors hover:border-slate-300 hover:bg-slate-100 " +
    "dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 " +
    "dark:hover:border-slate-600 dark:hover:bg-slate-800",

  primaryButton:
    "inline-flex items-center justify-center rounded-md " +
    "border border-transparent bg-sky-700 px-3 py-2 " +
    "text-sm font-medium text-white " +
    "transition-colors hover:bg-sky-800 " +
    "dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300",
};

const ProjectCard = ({
  title,
  subtitle,
  description,
  technologies,
  linkUrl,
  githubUrl,
  thumbnail,
  images,
}: Project) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const triggerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const firstImage = images[0];
  const thumbnailSrc =
    thumbnail ??
    (typeof firstImage === "string" ? firstImage : firstImage?.src);

  const galleryImages =
    images.length > 0 ? images : thumbnail ? [thumbnail] : [];

  const hasMultipleImages = galleryImages.length > 1;
  const safeImageIndex =
    activeImageIndex < galleryImages.length ? activeImageIndex : 0;

  const activeImage = galleryImages[safeImageIndex];
  const activeImageSrc =
    typeof activeImage === "string" ? activeImage : activeImage?.src;
  const activeImageCaption =
    typeof activeImage === "string" ? "" : activeImage?.caption;

  const openModal = () => {
    setActiveImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsModalOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  useLayoutEffect(() => {
    if (!isModalOpen || !hasMultipleImages) return;

    const button = thumbnailRefs.current[safeImageIndex];
    const strip = button?.parentElement;

    if (!button || !strip) return;

    const buttonLeft = button.offsetLeft - strip.offsetLeft;
    const buttonRight = buttonLeft + button.offsetWidth;
    const visibleLeft = strip.scrollLeft;
    const visibleRight = visibleLeft + strip.clientWidth;

    if (buttonLeft < visibleLeft) {
      strip.scrollLeft = buttonLeft;
    } else if (buttonRight > visibleRight) {
      strip.scrollLeft = buttonRight - strip.clientWidth;
    }
  }, [isModalOpen, hasMultipleImages, safeImageIndex]);

  return (
    <>
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`View ${title} project details`}
        onClick={openModal}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal();
          }
        }}
        className={`group relative flex h-auto min-h-40 cursor-pointer flex-col gap-2 rounded-xl text-slate-900 dark:text-slate-100 ${styles.focus}`}
      >
        {thumbnailSrc && (
          <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm transition-colors duration-200 group-hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:group-hover:border-slate-500">
            <img
              src={thumbnailSrc}
              className="block aspect-video h-auto w-full object-cover"
              loading="lazy"
              alt={`${title} screenshot`}
            />
          </div>
        )}

        <div className="mb-2 flex w-full min-w-0 flex-col gap-2">
          <div className="-mb-1.5 text-2xl font-medium underline-offset-4 group-hover:underline text-sky-800 dark:text-sky-200">
            {title}
          </div>

          {subtitle && (
            <span className="text-sm text-slate-500">{subtitle}</span>
          )}

          {technologies.length > 0 && (
            <div className="flex min-w-0 flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span key={`${tech}-${index}`} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 font-mono md:p-6 dark:bg-slate-950/80"
            onClick={closeModal}
          >
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className="flex max-h-[calc(100dvh-2rem)] w-full min-w-0 max-w-6xl cursor-default flex-col gap-5 overflow-y-auto overscroll-contain rounded-xl border border-slate-200 bg-slate-200 p-4 text-slate-900 shadow-2xl md:max-h-[calc(100dvh-3rem)] md:p-6 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex min-w-0 items-start justify-between gap-4">
                <div className="min-w-0 text-5xl text-sky-800 font-semibold">
                  {title}
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  aria-label={`Close ${title} details`}
                  className={`shrink-0 cursor-pointer rounded-md p-1 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 ${styles.focus}`}
                >
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="flex h-full min-w-0 flex-col justify-between gap-6">
                  <div className="flex flex-col gap-5">
                    {technologies.length > 0 && (
                      <div className="flex min-w-0 flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                          <span key={`${tech}-${index}`} className={styles.tag}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="min-w-0 break-words text-sm leading-7 text-slate-700 dark:text-slate-300">
                      <ReactMarkdown
                        components={{
                          a: ({ node: _node, ...props }) => (
                            <a
                              {...props}
                              className={`rounded-sm ${styles.link} ${styles.focus}`}
                            />
                          ),
                          h1: ({ node: _node, ...props }) => (
                            <h1
                              {...props}
                              className="mb-3 mt-5 text-xl font-semibold text-slate-900 dark:text-slate-100"
                            />
                          ),
                          h2: ({ node: _node, ...props }) => (
                            <h2
                              {...props}
                              className="mb-2 mt-5 text-lg font-semibold text-slate-900 dark:text-slate-100"
                            />
                          ),
                          h3: ({ node: _node, ...props }) => (
                            <h3
                              {...props}
                              className="mb-2 mt-4 text-base font-semibold text-slate-900 dark:text-slate-100"
                            />
                          ),
                          p: ({ node: _node, ...props }) => (
                            <p {...props} className="mb-3 last:mb-0" />
                          ),
                          ul: ({ node: _node, ...props }) => (
                            <ul
                              {...props}
                              className="mb-3 list-disc space-y-1 pl-5"
                            />
                          ),
                          ol: ({ node: _node, ...props }) => (
                            <ol
                              {...props}
                              className="mb-3 list-decimal space-y-1 pl-5"
                            />
                          ),
                          strong: ({ node: _node, ...props }) => (
                            <strong
                              {...props}
                              className="font-semibold text-slate-900 dark:text-slate-100"
                            />
                          ),
                          blockquote: ({ node: _node, ...props }) => (
                            <blockquote
                              {...props}
                              className="my-3 border-l-2 border-slate-300 pl-4 text-slate-600 dark:border-slate-700 dark:text-slate-400"
                            />
                          ),
                        }}
                      >
                        {description}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {(githubUrl || linkUrl) && (
                    <div className="flex w-full min-w-0 flex-col gap-3 md:flex-row">
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full min-w-0 ${styles.secondaryButton} ${styles.focus}`}
                        >
                          View on GitHub
                        </a>
                      )}

                      {linkUrl && (
                        <a
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full min-w-0 ${
                            linkUrl && !githubUrl
                              ? styles.primaryButton
                              : styles.primaryButton
                          } ${styles.focus}`}
                        >
                          Visit
                        </a>
                      )}
                    </div>
                  )}
                </div>
                {activeImageSrc && (
                  <div className="flex min-w-0 flex-col gap-3">
                    <figure className="m-0 min-w-0">
                      <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900">
                        <img
                          src={activeImageSrc}
                          alt={`${title} screenshot ${safeImageIndex + 1} of ${galleryImages.length}`}
                          className="block h-full w-full object-contain"
                        />
                      </div>

                      <figcaption
                        aria-live="polite"
                        className="mt-2 min-h-10 line-clamp-2 wrap-break-word text-xs text-slate-600 dark:text-slate-400"
                      >
                        {activeImageCaption || "\u00a0"}
                      </figcaption>
                    </figure>

                    {hasMultipleImages && (
                      <>
                        <div className="flex min-w-0 items-center justify-between gap-2 md:gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveImageIndex(
                                (index) =>
                                  (index - 1 + galleryImages.length) %
                                  galleryImages.length
                              )
                            }
                            aria-label="Previous image"
                            className={`shrink-0 cursor-pointer ${styles.secondaryButton} ${styles.focus}`}
                          >
                            Previous
                          </button>

                          <span
                            className="min-w-0 text-center text-xs text-slate-600 dark:text-slate-400"
                            aria-live="polite"
                          >
                            {safeImageIndex + 1} / {galleryImages.length}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setActiveImageIndex(
                                (index) => (index + 1) % galleryImages.length
                              )
                            }
                            aria-label="Next image"
                            className={`shrink-0 cursor-pointer ${styles.secondaryButton} ${styles.focus}`}
                          >
                            Next
                          </button>
                        </div>

                        <div
                          className="relative flex min-w-0 gap-2 overflow-x-auto"
                          aria-label={`${title} image thumbnails`}
                        >
                          {galleryImages.map((image, index) => {
                            const src =
                              typeof image === "string" ? image : image.src;
                            const caption =
                              typeof image === "string" ? "" : image.caption;
                            const isSelected = safeImageIndex === index;

                            return (
                              <button
                                key={`${src}-${index}`}
                                ref={(element) => {
                                  thumbnailRefs.current[index] = element;
                                }}
                                type="button"
                                onClick={() => setActiveImageIndex(index)}
                                aria-label={
                                  caption
                                    ? `Show image ${index + 1} of ${galleryImages.length}: ${caption}`
                                    : `Show image ${index + 1} of ${galleryImages.length}`
                                }
                                aria-pressed={isSelected}
                                className={`shrink-0 cursor-pointer overflow-hidden rounded-md border-2 p-0.5 transition-colors ${styles.focus} ${
                                  isSelected
                                    ? "border-sky-700 dark:border-sky-400"
                                    : "border-transparent hover:border-slate-300 dark:hover:border-slate-600"
                                }`}
                              >
                                <img
                                  src={src}
                                  alt=""
                                  loading="lazy"
                                  className="h-16 w-24 rounded-sm object-cover md:h-20 md:w-28"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ProjectCard;

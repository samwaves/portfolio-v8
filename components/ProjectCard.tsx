"use client";

import type { Project } from "@/types/project";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const styles = {
  tag:
    "max-w-full rounded bg-tag px-2 py-0.5 " +
    "text-xs text-on-tag [overflow-wrap:anywhere]",

  button:
    "focus-ring inline-flex min-w-0 cursor-pointer items-center " +
    "justify-center rounded-md border px-3 py-2 text-sm font-medium " +
    "transition-colors motion-reduce:transition-none",

  secondaryButton:
    "border-border bg-secondary text-on-secondary " +
    "hover:border-border-hover hover:bg-secondary-hover",

  primaryButton:
    "border-transparent bg-primary text-on-primary hover:bg-primary-hover",
};

export default function ProjectCard({
  title,
  subtitle,
  description,
  technologies,
  linkUrl,
  githubUrl,
  thumbnail,
  images,
}: Project) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const titleId = useId();

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

  function openModal() {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) return;

    setActiveImageIndex(0);
    dialog.showModal();
    setIsModalOpen(true);

    closeButtonRef.current?.focus({ preventScroll: true });
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  function showPreviousImage() {
    setActiveImageIndex(
      (index) => (index - 1 + galleryImages.length) % galleryImages.length
    );
  }

  function showNextImage() {
    setActiveImageIndex((index) => (index + 1) % galleryImages.length);
  }

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  useLayoutEffect(() => {
    if (!isModalOpen || !hasMultipleImages) return;

    const button = thumbnailRefs.current[safeImageIndex];
    const strip = button?.parentElement;

    if (!button || !strip) return;

    const buttonLeft = button.offsetLeft;
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
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`View ${title} project details`}
        onClick={openModal}
        className="focus-ring group flex h-full min-h-40 w-full min-w-0 cursor-pointer flex-col gap-2 rounded-xl text-left text-body"
      >
        {thumbnailSrc && (
          <span className="relative block w-full shrink-0 overflow-hidden rounded-xl border border-border-strong bg-surface-image shadow-sm transition-colors duration-200 group-hover:border-border-hover motion-reduce:transition-none">
            <img
              src={thumbnailSrc}
              alt={`${title} screenshot`}
              loading="lazy"
              decoding="async"
              className="block aspect-video w-full object-cover"
            />
          </span>
        )}

        <span className="mb-2 flex w-full min-w-0 flex-col gap-2">
          <span className="-mb-1.5 text-2xl font-medium text-heading underline-offset-4 group-hover:underline [overflow-wrap:anywhere]">
            {title}
          </span>

          {subtitle && <span className="text-sm text-muted">{subtitle}</span>}

          {technologies.length > 0 && (
            <span className="flex min-w-0 flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span key={`${tech}-${index}`} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </span>
          )}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setIsModalOpen(false)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;

          const rect = event.currentTarget.getBoundingClientRect();

          const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

          if (clickedOutside) {
            closeModal();
          }
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto overscroll-contain rounded-xl border border-border bg-surface-raised p-0 font-mono text-body shadow-2xl backdrop:bg-overlay md:max-h-[calc(100dvh-3rem)] md:w-[calc(100%-3rem)]"
      >
        <div className="flex min-w-0 flex-col gap-5 p-4 md:p-6">
          <div className="flex min-w-0 items-start justify-between gap-4">
            <h2
              id={titleId}
              className="min-w-0 font-sans text-3xl font-semibold tracking-tight text-heading [overflow-wrap:anywhere] sm:text-5xl"
            >
              {title}
            </h2>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              aria-label={`Close ${title} details`}
              className="focus-ring shrink-0 cursor-pointer rounded-md p-1 text-subtle transition-colors hover:bg-secondary-hover hover:text-body motion-reduce:transition-none"
            >
              <svg
                className="size-7"
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

          <div
            className={`grid min-w-0 grid-cols-1 gap-6 ${
              activeImageSrc ? "lg:grid-cols-2" : ""
            }`}
          >
            <div className="flex min-w-0 flex-col justify-between gap-6">
              <div className="flex min-w-0 flex-col gap-5">
                {technologies.length > 0 && (
                  <div className="flex min-w-0 flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <span key={`${tech}-${index}`} className={styles.tag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="min-w-0 leading-7 text-copy [overflow-wrap:anywhere] font-sans">
                  <ReactMarkdown
                    components={{
                      a: ({ node: _node, ...props }) => (
                        <a {...props} className="text-link" />
                      ),

                      h1: ({ node: _node, ...props }) => (
                        <h3
                          {...props}
                          className="mt-5 mb-3 font-sans text-xl font-semibold text-body"
                        />
                      ),

                      h2: ({ node: _node, ...props }) => (
                        <h3
                          {...props}
                          className="mt-5 mb-2 font-sans text-lg font-semibold text-body"
                        />
                      ),

                      h3: ({ node: _node, ...props }) => (
                        <h4
                          {...props}
                          className="mt-4 mb-2 font-sans text-base font-semibold text-body"
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
                          className="font-semibold text-body"
                        />
                      ),

                      blockquote: ({ node: _node, ...props }) => (
                        <blockquote
                          {...props}
                          className="my-3 border-l-2 border-border pl-4 text-subtle"
                        />
                      ),

                      code: ({ node: _node, ...props }) => (
                        <code
                          {...props}
                          className="rounded bg-surface px-1 py-0.5 font-mono text-[0.9em] text-body"
                        />
                      ),

                      pre: ({ node: _node, ...props }) => (
                        <pre
                          {...props}
                          className="my-3 overflow-x-auto rounded-lg border border-border bg-surface p-4 text-xs leading-6 [&>code]:bg-transparent [&>code]:p-0"
                        />
                      ),

                      hr: ({ node: _node, ...props }) => (
                        <hr {...props} className="my-5 border-border" />
                      ),

                      img: ({ node: _node, ...props }) => (
                        <img
                          {...props}
                          className="my-3 h-auto max-w-full rounded-lg border border-border"
                        />
                      ),
                    }}
                  >
                    {description}
                  </ReactMarkdown>
                </div>
              </div>

              {(githubUrl || linkUrl) && (
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full ${styles.button} ${styles.secondaryButton}`}
                    >
                      View on GitHub
                    </a>
                  )}

                  {linkUrl && (
                    <a
                      href={linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full ${styles.button} ${styles.primaryButton}`}
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
                  <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-image">
                    <img
                      src={activeImageSrc}
                      alt={`${title} screenshot ${safeImageIndex + 1} of ${galleryImages.length}`}
                      className="block h-full w-full object-contain"
                    />
                  </div>

                  <figcaption
                    aria-live="polite"
                    aria-atomic="true"
                    className="mt-2 min-h-10 text-xs leading-5 text-subtle [overflow-wrap:anywhere]"
                  >
                    {activeImageCaption || "\u00a0"}
                  </figcaption>
                </figure>

                {hasMultipleImages && (
                  <>
                    <div className="flex min-w-0 items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={showPreviousImage}
                        aria-label="Previous image"
                        className={`shrink-0 ${styles.button} ${styles.secondaryButton}`}
                      >
                        Previous
                      </button>

                      <span
                        aria-live="polite"
                        aria-atomic="true"
                        className="min-w-0 text-center text-xs text-subtle"
                      >
                        {safeImageIndex + 1} / {galleryImages.length}
                      </span>

                      <button
                        type="button"
                        onClick={showNextImage}
                        aria-label="Next image"
                        className={`shrink-0 ${styles.button} ${styles.secondaryButton}`}
                      >
                        Next
                      </button>
                    </div>

                    <div
                      aria-label={`${title} image thumbnails`}
                      className="relative flex min-w-0 gap-2 overflow-x-auto p-1"
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
                            className={`focus-ring shrink-0 cursor-pointer overflow-hidden rounded-md border-2 p-0.5 transition-colors motion-reduce:transition-none ${
                              isSelected
                                ? "border-focus"
                                : "border-transparent hover:border-border-hover"
                            }`}
                          >
                            <img
                              src={src}
                              alt=""
                              loading="lazy"
                              decoding="async"
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
      </dialog>
    </>
  );
}

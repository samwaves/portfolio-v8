"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../globals.css";

type ModalImage = string | { src: string; caption?: string };

type ProjectParams = {
  title: string;
  description: string;
  technologies?: string[];
  linkUrl?: string;
  githubUrl?: string;
  thumbnail?: string;
  modalImages?: ModalImage[];
};

const ProjectCard = ({
  title,
  description,
  technologies,
  linkUrl,
  githubUrl,
  thumbnail,
  modalImages,
}: ProjectParams) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const triggerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const images =
    modalImages && modalImages.length > 0
      ? modalImages
      : thumbnail
        ? [thumbnail]
        : [];

  const hasMultipleImages = images.length > 1;
  const safeImageIndex =
    activeImageIndex < images.length ? activeImageIndex : 0;

  const activeImage = images[safeImageIndex];
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
        closeModal();
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

  // Keep the selected thumbnail visible without scrolling the whole modal.
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
        className="group relative flex h-auto min-h-40 flex-col justify-between gap-5 bg-slate-100 p-5 cursor-pointer transition-all duration-300 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-sky-800"
      >
        {thumbnail && (
          <div className="relative w-full overflow-hidden">
            <img
              src={thumbnail}
              className="block aspect-video h-auto w-full object-cover"
              loading="lazy"
              alt={`${title} screenshot`}
            />
          </div>
        )}

        <div className="flex min-w-0 w-full flex-col gap-3">
          <div className="text-md text-sky-900">{title}</div>

          {technologies && technologies.length > 0 && (
            <div className="flex min-w-0 flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="max-w-full bg-sky-200 px-1 py-0.5 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <span aria-hidden="true" className="text-xs text-sky-700">
            View details ↗
          </span>
        </div>
      </div>

      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-6 font-mono"
            onClick={closeModal}
          >
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className="flex max-h-[calc(100dvh-2rem)] w-full max-w-6xl min-w-0 flex-col gap-5 overflow-y-auto overscroll-contain border border-sky-800 bg-neutral-100 p-4 shadow-2xl cursor-default md:max-h-[calc(100dvh-3rem)] md:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex min-w-0 items-start justify-between gap-4">
                <div className="min-w-0 text-2xl text-sky-900 md:text-3xl">
                  {title}
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  aria-label={`Close ${title} details`}
                  className="shrink-0 text-4xl leading-none text-sky-900 cursor-pointer transition-colors hover:text-sky-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-sky-800"
                >
                  &times;
                </button>
              </div>

              <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)] lg:items-start">
                {activeImageSrc && (
                  <div className="flex min-w-0 flex-col gap-3">
                    <figure className="m-0 min-w-0">
                      <div className="flex aspect-video w-full items-center justify-center overflow-hidden border border-neutral-300 bg-white">
                        <img
                          src={activeImageSrc}
                          alt={`${title} screenshot ${safeImageIndex + 1} of ${images.length}`}
                          className="block h-full w-full object-contain"
                        />
                      </div>
                      <figcaption
                        aria-live="polite"
                        className="mt-2 min-h-6 break-words text-xs text-sky-800"
                      >
                        {activeImageCaption || "\u00a0"}
                      </figcaption>
                    </figure>

                    {hasMultipleImages && (
                      <>
                        <div className="flex min-w-0 items-center justify-between gap-2 text-sm text-sky-900 md:gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveImageIndex(
                                (index) =>
                                  (index - 1 + images.length) % images.length
                              )
                            }
                            aria-label="Previous image"
                            className="shrink-0 border border-sky-800 px-2 py-2 cursor-pointer hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-sky-800 md:px-3"
                          >
                            Previous
                          </button>

                          <span
                            className="min-w-0 text-center"
                            aria-live="polite"
                          >
                            {safeImageIndex + 1} / {images.length}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setActiveImageIndex(
                                (index) => (index + 1) % images.length
                              )
                            }
                            aria-label="Next image"
                            className="shrink-0 border border-sky-800 px-2 py-2 cursor-pointer hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-sky-800 md:px-3"
                          >
                            Next
                          </button>
                        </div>

                        <div
                          className="flex min-w-0 gap-2 overflow-x-auto"
                          aria-label={`${title} image thumbnails`}
                        >
                          {images.map((image, index) => {
                            const src =
                              typeof image === "string" ? image : image.src;
                            const caption =
                              typeof image === "string" ? "" : image.caption;

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
                                    ? `Show image ${index + 1} of ${images.length}: ${caption}`
                                    : `Show image ${index + 1} of ${images.length}`
                                }
                                aria-pressed={safeImageIndex === index}
                                className={`shrink-0 border-2 p-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-800 ${
                                  safeImageIndex === index
                                    ? "border-sky-800"
                                    : "border-transparent hover:border-sky-400"
                                }`}
                              >
                                <img
                                  src={src}
                                  alt=""
                                  loading="lazy"
                                  className="h-16 w-24 object-cover md:h-20 md:w-28"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="flex h-full min-w-0 flex-col justify-between">
                  <div className="flex flex-col gap-5">
                    {technologies && technologies.length > 0 && (
                      <div className="flex min-w-0 flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                          <span
                            key={`${tech}-${index}`}
                            className="max-w-full bg-sky-200 px-2 py-1 text-sm text-sky-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="min-w-0 text-lg whitespace-pre-line text-sky-800">
                      {description}
                    </div>
                  </div>

                  {(githubUrl || linkUrl) && (
                    <div className="mt-2 flex w-full min-w-0 flex-col gap-3 md:flex-row">
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full min-w-0 bg-sky-300 px-2 py-2 text-center text-lg font-semibold text-black transition-opacity duration-300 hover:opacity-80"
                        >
                          View on GitHub
                        </a>
                      )}
                      {linkUrl && (
                        <a
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full min-w-0 bg-neutral-800 px-2 py-2 text-center text-lg font-semibold text-white transition-opacity duration-300 hover:opacity-80"
                        >
                          Visit
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ProjectCard;

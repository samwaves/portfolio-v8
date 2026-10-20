"use client";

import { useEffect, useRef, useState } from "react";

type CopyStatus = "idle" | "copied" | "error";

export default function EmailCopy() {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;

      if (resetTimeout.current !== null) {
        clearTimeout(resetTimeout.current);
      }
    };
  }, []);

  async function copyEmail() {
    if (resetTimeout.current !== null) {
      clearTimeout(resetTimeout.current);
      resetTimeout.current = null;
    }

    try {
      await navigator.clipboard.writeText("sam@samwave.io");

      if (!isMounted.current) return;

      setCopyStatus("copied");
    } catch {
      if (!isMounted.current) return;

      setCopyStatus("error");
    }

    resetTimeout.current = setTimeout(() => {
      setCopyStatus("idle");
      resetTimeout.current = null;
    }, 3000);
  }

  const statusMessage =
    copyStatus === "copied"
      ? "Email address copied."
      : copyStatus === "error"
        ? "Couldn't copy. Please select the email address manually."
        : "";

  return (
    <div className="flex flex-col items-start gap-1 text-subtle sm:items-end">
      <div className="flex items-center gap-1">
        <a
          href="mailto:sam@samwave.io"
          className="focus-ring select-all rounded-sm underline-offset-4 transition-colors hover:text-link hover:underline motion-reduce:transition-none"
        >
          sam@samwave.io
        </a>

        <button
          type="button"
          onClick={copyEmail}
          aria-label="Copy email address"
          title={
            copyStatus === "copied"
              ? "Email address copied"
              : "Copy email address"
          }
          className="focus-ring inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-secondary-hover hover:text-on-secondary motion-reduce:transition-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {copyStatus === "copied" ? (
              <path d="m5 12 4 4L19 6" />
            ) : (
              <>
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
              </>
            )}
          </svg>
        </button>
      </div>

      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {statusMessage}
      </span>

      {copyStatus === "error" && (
        <p aria-hidden="true" className="max-w-xs text-xs">
          Couldn&apos;t copy. Select the address to copy manually.
        </p>
      )}
    </div>
  );
}

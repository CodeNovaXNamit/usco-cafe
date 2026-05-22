"use client";

import type { HTMLAttributes } from "react";

type UscoLoaderProps = {
  message?: string;
  progress?: number;
  className?: string;
  contentClassName?: string;
  logoClassName?: string;
  taglineClassName?: string;
  progressClassName?: string;
  progressBarClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

function clampProgress(value: number) {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}

export function UscoLoader({
  message = "Always Brewing Something",
  progress,
  className = "",
  contentClassName = "",
  logoClassName = "",
  taglineClassName = "",
  progressClassName = "",
  progressBarClassName = "",
  ...rest
}: UscoLoaderProps) {
  const hasProgress = typeof progress === "number";
  const safeProgress = hasProgress ? clampProgress(progress) : 45;

  return (
    <div className={className} {...rest}>
      <div className={`site-loading-content ${contentClassName}`.trim()}>
        <div className={`site-loading-logo ${logoClassName}`.trim()}>
          <img
            src="/brand/usco-logo.png"
            alt="USCO"
            className="site-loading-logo-image"
          />
        </div>
        <p className={`site-loading-tagline ${taglineClassName}`.trim()}>{message}</p>
        <div className={`site-loading-progress ${progressClassName}`.trim()} aria-hidden>
          <div
            className={`site-loading-progress-bar ${progressBarClassName}`.trim()}
            style={{ width: `${safeProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

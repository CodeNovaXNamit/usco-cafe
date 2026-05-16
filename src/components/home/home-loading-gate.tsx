"use client";

import { useEffect, useRef, useState } from "react";

type HomeLoadingGateProps = {
  children: React.ReactNode;
};

const MIN_LOADING_MS = 1400;
const MAX_LOADING_MS = 8000;

function waitForWindowLoad() {
  if (typeof window === "undefined" || document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const onLoad = () => {
      window.removeEventListener("load", onLoad);
      resolve();
    };

    window.addEventListener("load", onLoad);
  });
}

function waitForImage(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const onDone = () => {
      image.removeEventListener("load", onDone);
      image.removeEventListener("error", onDone);
      resolve();
    };

    image.addEventListener("load", onDone);
    image.addEventListener("error", onDone);
  });
}

function waitForVideo(video: HTMLVideoElement) {
  if (video.readyState >= 2) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const onDone = () => {
      video.removeEventListener("loadeddata", onDone);
      video.removeEventListener("error", onDone);
      resolve();
    };

    video.addEventListener("loadeddata", onDone);
    video.addEventListener("error", onDone);
  });
}

export function HomeLoadingGate({ children }: HomeLoadingGateProps) {
  const [isLoading, setIsLoading] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const startedAt = performance.now();
    const forceReleaseTimer = window.setTimeout(() => {
      if (!cancelled) {
        setIsLoading(false);
      }
    }, MAX_LOADING_MS);

    const run = async () => {
      const container = rootRef.current;
      const mediaWaiters: Promise<void>[] = [];

      if (container) {
        const criticalMedia = Array.from(container.querySelectorAll("[data-loader-critical]"));

        for (const node of criticalMedia) {
          if (node instanceof HTMLImageElement) {
            mediaWaiters.push(waitForImage(node));
          } else if (node instanceof HTMLVideoElement) {
            mediaWaiters.push(waitForVideo(node));
          }
        }
      }

      await Promise.allSettled([waitForWindowLoad(), ...mediaWaiters]);

      const elapsed = performance.now() - startedAt;
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((resolve) => {
          window.setTimeout(resolve, MIN_LOADING_MS - elapsed);
        });
      }

      if (!cancelled) {
        setIsLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
      window.clearTimeout(forceReleaseTimer);
    };
  }, []);

  return (
    <div ref={rootRef}>
      {children}
      <div
        className={`loading-screen loading-screen--overlay ${isLoading ? "is-visible" : "is-hidden"}`}
        aria-hidden={!isLoading}
      >
        <div className="loading-screen__mark">USCO</div>
        <p className="loading-screen__label">Always Brewing Something</p>
        <div className="loading-screen__bar" aria-hidden>
          <div className="loading-screen__bar-fill" />
        </div>
      </div>
    </div>
  );
}

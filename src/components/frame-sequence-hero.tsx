/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import type { TouchEvent as ReactTouchEvent, WheelEvent as ReactWheelEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getFrameAssetUrl, totalFrames } from "@/data/site";

const mobilePlaybackDurationMs = 4000;

function getFrameUrl(index: number) {
  return getFrameAssetUrl(index);
}

function drawCoverImage(canvas: HTMLCanvasElement, image: HTMLImageElement, devicePixelRatio: number) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * devicePixelRatio);
  canvas.height = Math.round(height * devicePixelRatio);
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const imageRatio = image.width / image.height;
  const canvasRatio = width / height;
  let drawWidth = width;
  let drawHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = drawHeight * imageRatio;
    offsetX = (width - drawWidth) / 2;
  } else {
    drawWidth = width;
    drawHeight = drawWidth / imageRatio;
    offsetY = (height - drawHeight) / 2;
  }

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

function drawCoverImages(
  canvas: HTMLCanvasElement,
  currentImage: HTMLImageElement,
  nextImage: HTMLImageElement | null,
  blend: number,
  devicePixelRatio: number,
) {
  drawCoverImage(canvas, currentImage, devicePixelRatio);

  if (!nextImage || blend <= 0) {
    return;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  const { width, height } = canvas.getBoundingClientRect();
  const imageRatio = nextImage.width / nextImage.height;
  const canvasRatio = width / height;
  let drawWidth = width;
  let drawHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = drawHeight * imageRatio;
    offsetX = (width - drawWidth) / 2;
  } else {
    drawWidth = width;
    drawHeight = drawWidth / imageRatio;
    offsetY = (height - drawHeight) / 2;
  }

  ctx.save();
  ctx.globalAlpha = blend;
  ctx.drawImage(nextImage, offsetX, offsetY, drawWidth, drawHeight);
  ctx.restore();
}

export function FrameSequenceHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sequenceStarted, setSequenceStarted] = useState(false);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const devicePixelRatioRef = useRef(1);
  const playbackRef = useRef<number | null>(null);

  const overlay = useMemo(() => {
    if (progress < 0.2) {
      return {
        kicker: "Coffee + Quiet",
        line: "A narrow door. A warm light. Come in.",
        cta: isMobile ? "Begin" : "Scroll slowly",
      };
    }

    if (progress < 0.75) {
      return {
        kicker: "Somewhere between your first sip and your last thought.",
        line: "The walk in becomes part of the ritual.",
        cta: isMobile ? "Playing" : "Keep going",
      };
    }

    return {
      kicker: "At No. 4",
      line: "The door is usually open.",
      cta: "Explore",
    };
  }, [isMobile, progress]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMedia = () => {
      const nextIsMobile = media.matches;
      setIsMobile(nextIsMobile);
      setReducedMotion(motionMedia.matches);

      if (!nextIsMobile) {
        setSequenceStarted(false);
        setSequenceComplete(false);
        setProgress(0);
      }
    };

    updateMedia();
    media.addEventListener("change", updateMedia);
    motionMedia.addEventListener("change", updateMedia);

    return () => {
      media.removeEventListener("change", updateMedia);
      motionMedia.removeEventListener("change", updateMedia);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let cancelled = false;
    let loaded = 0;
    imagesRef.current = new Array(totalFrames).fill(null);

    for (let index = 0; index < totalFrames; index += 1) {
      const image = new window.Image();
      image.src = getFrameUrl(index);
      image.onload = () => {
        if (cancelled) {
          return;
        }

        imagesRef.current[index] = image;
        loaded += 1;
        setLoadedCount(loaded);

        if (loaded === 1 && canvasRef.current) {
          drawCoverImage(canvasRef.current, image, devicePixelRatioRef.current);
        }
      };
    }

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  useEffect(() => {
    devicePixelRatioRef.current = window.devicePixelRatio || 1;

    if (isMobile || reducedMotion) {
      return;
    }

    const updateProgress = () => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const total = Math.max(container.offsetHeight - window.innerHeight, 1);
      const nextProgress = Math.min(Math.max(-rect.top / total, 0), 1);

      setProgress(nextProgress);
    };

    updateProgress();
    let scrollFrame = 0;

    const onScroll = () => {
      if (scrollFrame) {
        return;
      }

      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        updateProgress();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    if (!isMobile || reducedMotion || !sequenceStarted || sequenceComplete) {
      return;
    }

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const nextProgress = Math.min(elapsed / mobilePlaybackDurationMs, 1);
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        setSequenceComplete(true);
        playbackRef.current = null;
        return;
      }

      playbackRef.current = window.requestAnimationFrame(tick);
    };

    playbackRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (playbackRef.current) {
        window.cancelAnimationFrame(playbackRef.current);
        playbackRef.current = null;
      }
    };
  }, [isMobile, reducedMotion, sequenceComplete, sequenceStarted]);

  useEffect(() => {
    if (!isMobile || reducedMotion || sequenceComplete || !sequenceStarted) {
      return;
    }

    const lockScroll = (event: Event) => {
      event.preventDefault();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", lockScroll, { passive: false });
    window.addEventListener("touchmove", lockScroll, { passive: false });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", lockScroll);
      window.removeEventListener("touchmove", lockScroll);
    };
  }, [isMobile, reducedMotion, sequenceComplete, sequenceStarted]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const devicePixelRatio = window.devicePixelRatio || 1;
    devicePixelRatioRef.current = devicePixelRatio;

    const exactFrame = progress * (totalFrames - 1);
    const currentIndex = Math.floor(exactFrame);
    const blend = exactFrame - currentIndex;
    const currentImage = imagesRef.current[Math.min(currentIndex, totalFrames - 1)];
    const nextImage = imagesRef.current[Math.min(currentIndex + 1, totalFrames - 1)];

    if (!currentImage) {
      return;
    }

    if (isMobile) {
      drawCoverImages(canvas, currentImage, nextImage ?? null, blend, devicePixelRatio);
      return;
    }

    drawCoverImage(canvas, currentImage, devicePixelRatio);
  }, [isMobile, loadedCount, progress, reducedMotion]);

  const startSequence = () => {
    if (!isMobile || reducedMotion || sequenceStarted || loadedCount < totalFrames) {
      return;
    }

    setSequenceStarted(true);
    setSequenceComplete(false);
    setProgress(0);
  };

  const scrollStep = () => {
    if (isMobile && !sequenceStarted) {
      startSequence();
      return;
    }

    window.scrollBy({
      top: Math.max(window.innerHeight * (isMobile ? 0.72 : 0.88), 320),
      behavior: "smooth",
    });
  };

  const handleInitialMobileWheel = (event: ReactWheelEvent<HTMLElement>) => {
    if (!isMobile || reducedMotion || sequenceStarted) {
      return;
    }

    event.preventDefault();
    startSequence();
  };

  const handleInitialMobileTouchStart = (event: ReactTouchEvent<HTMLElement>) => {
    if (!isMobile || reducedMotion || sequenceStarted) {
      return;
    }

    event.preventDefault();
    startSequence();
  };

  const handleInitialMobileTouchMove = (event: ReactTouchEvent<HTMLElement>) => {
    if (!isMobile || reducedMotion || sequenceStarted) {
      return;
    }

    event.preventDefault();
    startSequence();
  };

  const ready = reducedMotion || loadedCount >= totalFrames;
  const loadingProgress = ready ? 100 : Math.round((loadedCount / totalFrames) * 100);
  const isCompactHero = isMobile || reducedMotion;
  const heroHeightClass = isCompactHero
    ? "h-[calc(100svh+5rem)] sm:h-[calc(100svh+88px)]"
    : "h-[420vh] lg:h-[600vh]";

  return (
    <section
      ref={containerRef}
      onWheel={handleInitialMobileWheel}
      onTouchStart={handleInitialMobileTouchStart}
      onTouchMove={handleInitialMobileTouchMove}
      className={`relative ${heroHeightClass}`}
    >
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden bg-[#f6f3ec] sm:top-[72px] sm:h-[calc(100svh-72px)]">
        {!ready ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white text-matcha-deep">
            <div className="px-4 text-center font-display text-5xl tracking-[0.12em] sm:text-6xl">USCO</div>
            <p className="mt-3 px-4 text-center font-accent text-xs uppercase tracking-[0.35em] text-matcha-mid sm:text-sm">
              Brewing something...
            </p>
            <div className="mt-8 h-px w-48 overflow-hidden bg-matcha-light sm:mt-10 sm:w-60">
              <div
                className="h-full bg-matcha-mid transition-[width] duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        ) : null}

        {reducedMotion ? (
          <div className="absolute inset-0">
            <img
              src={getFrameUrl(0)}
              alt="USCO cafe exterior"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : (
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-white/82 via-white/18 to-black/26" />

        <div className="absolute left-4 right-4 top-6 flex items-start justify-between sm:left-8 sm:right-8 sm:top-8">
          <div>
            <div className="font-display text-4xl tracking-[0.08em] text-matcha-deep sm:text-6xl">USCO</div>
            <div className="font-accent text-[10px] uppercase tracking-[0.38em] text-matcha-mid sm:text-sm">
              Coffee + Quiet
            </div>
          </div>
          <div className="hidden font-sans text-xs uppercase tracking-[0.25em] text-matcha-mid sm:block">
            No. 4 / Warm light ahead
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 px-4 sm:bottom-14 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl p-0">
              <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-matcha-mid sm:text-xs">
                {overlay.kicker}
              </p>
              <h1 className="mt-3 max-w-3xl text-balance font-display text-[2.35rem] leading-[0.95] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.18)] sm:mt-4 sm:text-7xl lg:text-[6rem]">
                {overlay.line}
              </h1>
              <div className="mt-6 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="/menu"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/50 bg-white/20 px-5 py-3 font-sans text-[11px] uppercase tracking-[0.28em] text-white hover:scale-[1.02] hover:bg-white/30 sm:w-auto sm:px-6 sm:text-xs"
                >
                  {isMobile && sequenceComplete ? "Explore" : overlay.cta}
                </Link>
                <Link
                  href="/find-us"
                  className="font-sans text-[11px] uppercase tracking-[0.28em] text-white/85 hover:text-white sm:text-xs"
                >
                  Find Us
                </Link>
              </div>
              <button
                type="button"
                onClick={scrollStep}
                className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/35 bg-black/12 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.3em] text-white/88 hover:bg-black/20 sm:mt-6 sm:text-[11px]"
              >
                <span>{isMobile && !sequenceStarted ? "Start" : "Scroll"}</span>
                <span className="hero-scroll-cue block h-3.5 w-3.5 rounded-full border border-white/55" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

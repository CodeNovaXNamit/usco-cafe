/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getFrameAssetUrl, totalFrames } from "@/data/site";

function getFrameUrl(index: number) {
  return getFrameAssetUrl(index);
}

export function FrameSequenceHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const devicePixelRatioRef = useRef(1);

  const overlay = useMemo(() => {
    if (progress < 0.2) {
      return {
        kicker: "Coffee + Quiet",
        line: "A narrow door. A warm light. Come in.",
        cta: "Scroll slowly",
      };
    }

    if (progress < 0.75) {
      return {
        kicker: "Somewhere between your first sip and your last thought.",
        line: "The walk in becomes part of the ritual.",
        cta: "Keep going",
      };
    }

    return {
      kicker: "At No. 4",
      line: "The door is usually open.",
      cta: "Explore",
    };
  }, [progress]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMedia = () => {
      setIsMobile(media.matches);
      setReducedMotion(motionMedia.matches);
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
    devicePixelRatioRef.current = window.devicePixelRatio || 1;

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
    let frame = 0;
    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateProgress();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (isMobile || reducedMotion) {
      return;
    }

    let cancelled = false;
    let loaded = 0;
    imagesRef.current = new Array(totalFrames).fill(null);

    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;
      const image = imagesRef.current[index];

      if (!canvas || !image) {
        return;
      }

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      const { width, height } = canvas.getBoundingClientRect();
      const devicePixelRatio = devicePixelRatioRef.current;
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
    };

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

        if (loaded === 1) {
          drawFrame(0);
        }

        if (loaded === totalFrames) {
          setLoadedCount(totalFrames);
        }
      };
    }

    return () => {
      cancelled = true;
    };
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    if (isMobile || reducedMotion || loadedCount === 0) {
      return;
    }

    const canvas = canvasRef.current;
    const image = imagesRef.current[Math.min(totalFrames - 1, Math.floor(progress * (totalFrames - 1)))];

    if (!canvas || !image) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const { width, height } = canvas.getBoundingClientRect();
    const devicePixelRatio = window.devicePixelRatio || 1;
    devicePixelRatioRef.current = devicePixelRatio;
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
  }, [isMobile, loadedCount, progress, reducedMotion]);

  const ready = isMobile || reducedMotion || loadedCount >= totalFrames;
  const loadingProgress = ready ? 100 : Math.round((loadedCount / totalFrames) * 100);
  const isCompactHero = isMobile || reducedMotion;

  return (
    <section
      ref={containerRef}
      className={`relative ${isCompactHero ? "h-[220svh] sm:h-[260svh]" : "h-[420vh] lg:h-[600vh]"}`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#f6f3ec]">
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

        {isCompactHero ? (
          <div className="absolute inset-0">
            <img
              src={getFrameUrl(0)}
              alt="USCO cafe exterior"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 1 - progress * 0.72 }}
            />
            <img
              src={getFrameUrl(totalFrames - 1)}
              alt="USCO cafe entrance"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 0.18 + progress * 0.82 }}
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
              <h1 className="mt-3 max-w-3xl text-balance font-display text-[2.6rem] leading-[0.95] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.18)] sm:mt-4 sm:text-7xl lg:text-[6rem]">
                {overlay.line}
              </h1>
              <div className="mt-6 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="/menu"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/50 bg-white/20 px-5 py-3 font-sans text-[11px] uppercase tracking-[0.28em] text-white backdrop-blur hover:scale-[1.02] hover:bg-white/30 sm:px-6 sm:text-xs"
                >
                  {overlay.cta}
                </Link>
                <Link
                  href="/find-us"
                  className="font-sans text-[11px] uppercase tracking-[0.28em] text-white/85 hover:text-white sm:text-xs"
                >
                  Find Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

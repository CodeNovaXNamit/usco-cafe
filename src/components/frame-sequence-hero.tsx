/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getFrameAssetUrl, totalFrames } from "@/data/site";

function getFrameUrl(index: number) {
  return getFrameAssetUrl(index);
}

function getCoveredFrameBounds(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
) {
  const { width, height } = canvas.getBoundingClientRect();
  const imageRatio = image.width / image.height;
  let drawWidth = width;
  let drawHeight = width / imageRatio;

  if (drawHeight < height) {
    drawHeight = height;
    drawWidth = drawHeight * imageRatio;
  }

  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;

  return { width, height, drawWidth, drawHeight, offsetX, offsetY };
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
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f6f3ec";
  ctx.fillRect(0, 0, width, height);

  const { drawWidth, drawHeight, offsetX, offsetY } = getCoveredFrameBounds(canvas, image);

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

  const { drawWidth, drawHeight, offsetX, offsetY } = getCoveredFrameBounds(canvas, nextImage);

  ctx.save();
  ctx.globalAlpha = blend;
  ctx.drawImage(nextImage, offsetX, offsetY, drawWidth, drawHeight);
  ctx.restore();
}

function detectForegroundMode(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  if (!ctx) {
    return "light" as const;
  }

  const { width, height } = canvas;
  if (width === 0 || height === 0) {
    return "light" as const;
  }

  const sampleSize = 24;
  const startX = Math.max(Math.floor(width * 0.16), 0);
  const startY = Math.max(Math.floor(height * 0.14), 0);
  const sampleWidth = Math.min(sampleSize, Math.max(width - startX, 1));
  const sampleHeight = Math.min(sampleSize, Math.max(height - startY, 1));
  const pixels = ctx.getImageData(startX, startY, sampleWidth, sampleHeight).data;

  let totalLuma = 0;
  let count = 0;

  for (let index = 0; index < pixels.length; index += 16) {
    const red = pixels[index] ?? 0;
    const green = pixels[index + 1] ?? 0;
    const blue = pixels[index + 2] ?? 0;
    totalLuma += red * 0.299 + green * 0.587 + blue * 0.114;
    count += 1;
  }

  const averageLuma = count > 0 ? totalLuma / count : 0;
  return averageLuma > 150 ? ("dark" as const) : ("light" as const);
}

function sampleCharacterTone(
  canvas: HTMLCanvasElement,
  element: HTMLSpanElement,
  container: HTMLDivElement,
) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  if (!ctx) {
    return "text-white";
  }

  const charRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const scaleX = canvas.width / Math.max(containerRect.width, 1);
  const scaleY = canvas.height / Math.max(containerRect.height, 1);
  const sampleX = Math.max(Math.floor((charRect.left - containerRect.left) * scaleX), 0);
  const sampleY = Math.max(Math.floor((charRect.top - containerRect.top) * scaleY), 0);
  const sampleWidth = Math.max(Math.floor(charRect.width * scaleX), 1);
  const sampleHeight = Math.max(Math.floor(charRect.height * scaleY), 1);
  const safeWidth = Math.min(sampleWidth, Math.max(canvas.width - sampleX, 1));
  const safeHeight = Math.min(sampleHeight, Math.max(canvas.height - sampleY, 1));
  const pixels = ctx.getImageData(sampleX, sampleY, safeWidth, safeHeight).data;

  let totalLuma = 0;
  let count = 0;

  for (let index = 0; index < pixels.length; index += 16) {
    const red = pixels[index] ?? 0;
    const green = pixels[index + 1] ?? 0;
    const blue = pixels[index + 2] ?? 0;
    totalLuma += red * 0.299 + green * 0.587 + blue * 0.114;
    count += 1;
  }

  const averageLuma = count > 0 ? totalLuma / count : 0;

  if (averageLuma > 170) {
    return "text-black";
  }

  if (averageLuma > 100) {
    return "text-matcha-mid";
  }

  return "text-white";
}

export function FrameSequenceHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textLayerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [foregroundMode, setForegroundMode] = useState<"dark" | "light">("light");
  const [brandColors, setBrandColors] = useState<string[]>([]);
  const [taglineColors, setTaglineColors] = useState<string[]>([]);
  const [kickerColors, setKickerColors] = useState<string[]>([]);
  const [lineColors, setLineColors] = useState<string[]>([]);
  const [asideColors, setAsideColors] = useState<string[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const devicePixelRatioRef = useRef(1);
  const scrollAnimationRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const progressRef = useRef(0);
  const visualSampleRef = useRef({ key: -1, time: 0 });
  const foregroundModeRef = useRef<"dark" | "light">("light");
  const posterFrameIndex = 0;
  const overlay = useMemo(() => {
    if (progress < 0.2) {
      return {
        kicker: "Coffee + Quiet",
        line: "A narrow door. A warm light. Come in.",
        cta: isMobile ? "Explore Menu" : "Scroll slowly",
      };
    }

    if (progress < 0.75) {
      return {
        kicker: "Somewhere between your first sip and your last thought.",
        line: "The walk in becomes part of the ritual.",
        cta: isMobile ? "Explore Menu" : "Keep going",
      };
    }

    return {
      kicker: "At No. 4",
      line: "The door is usually open.",
      cta: "Explore",
    };
  }, [isMobile, progress]);

  const taglineText = "Coffee + Quiet";
  const asideText = "No. 4 / Warm light ahead";

  const applyCharacterColors = (
    group: string,
    setColors: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (!canvasRef.current || !textLayerRef.current) {
      return;
    }

    const nextColors = Array.from(
      textLayerRef.current.querySelectorAll<HTMLSpanElement>(`[data-char-group="${group}"]`),
    ).map((element) => {
      if (!element || element.dataset.space === "true") {
        return "";
      }

      return sampleCharacterTone(canvasRef.current as HTMLCanvasElement, element, textLayerRef.current as HTMLDivElement);
    });

    setColors((current) => {
      if (current.length === nextColors.length && current.every((value, index) => value === nextColors[index])) {
        return current;
      }

      return nextColors;
    });
  };

  const renderCharacterText = (
    text: string,
    group: string,
    colors: string[],
    className: string,
  ) =>
    text.split("").map((character, index) => (
      <span
        key={`${text}-${index}-${character === " " ? "space" : character}`}
        data-char-group={group}
        data-char-index={index}
        data-space={character === " " ? "true" : "false"}
        className={`${className} ${character === " " ? "inline-block w-[0.28em]" : colors[index] ?? "text-white"}`}
      >
        {character === " " ? "\u00A0" : character}
      </span>
    ));

  const useCharacterContrast = !isMobile && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMedia = () => {
      const nextIsMobile = media.matches;
      setIsMobile(nextIsMobile);
      setReducedMotion(motionMedia.matches);

      if (!nextIsMobile) {
        setProgress(0);
        progressRef.current = 0;
        targetProgressRef.current = 0;
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
      image.decoding = "async";
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
          const nextMode = detectForegroundMode(canvasRef.current);
          foregroundModeRef.current = nextMode;
          setForegroundMode(nextMode);

          if (useCharacterContrast) {
            applyCharacterColors("brand", setBrandColors);
            applyCharacterColors("tagline", setTaglineColors);
            applyCharacterColors("kicker", setKickerColors);
            applyCharacterColors("line", setLineColors);
            applyCharacterColors("aside", setAsideColors);
          }
        }
      };
    }

    return () => {
      cancelled = true;
    };
  }, [reducedMotion, useCharacterContrast]);

  useEffect(() => {
    devicePixelRatioRef.current = Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.35);

    if (reducedMotion) {
      return;
    }

    const updateProgress = () => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const headerHeight =
        document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect().height ??
        (window.innerWidth >= 640 ? 72 : 64);
      const rect = container.getBoundingClientRect();
      const stickyViewportHeight = Math.max(window.innerHeight - headerHeight, 1);
      const total = Math.max(container.offsetHeight - stickyViewportHeight, 1);
      const nextProgress = Math.min(Math.max((headerHeight - rect.top) / total, 0), 1);
      targetProgressRef.current = nextProgress;

      if (scrollAnimationRef.current) {
        return;
      }

      const animate = () => {
        const currentProgress = progressRef.current;
        const delta = targetProgressRef.current - currentProgress;
        const easing = isMobile ? 0.085 : 0.11;

        if (Math.abs(delta) < 0.0015) {
          progressRef.current = targetProgressRef.current;
          setProgress(targetProgressRef.current);
          scrollAnimationRef.current = null;
          return;
        }

        const nextValue = currentProgress + delta * easing;
        progressRef.current = nextValue;
        setProgress(nextValue);
        scrollAnimationRef.current = window.requestAnimationFrame(animate);
      };

      scrollAnimationRef.current = window.requestAnimationFrame(animate);
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
      if (scrollAnimationRef.current) {
        window.cancelAnimationFrame(scrollAnimationRef.current);
        scrollAnimationRef.current = null;
      }

      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const exactFrame = progress * (totalFrames - 1);
    const currentIndex = Math.floor(exactFrame);
    const blend = exactFrame - currentIndex;
    const currentImage = imagesRef.current[Math.min(currentIndex, totalFrames - 1)];
    const nextImage = imagesRef.current[Math.min(currentIndex + 1, totalFrames - 1)];

    if (!currentImage) {
      return;
    }

    drawCoverImages(canvas, currentImage, nextImage ?? null, blend, devicePixelRatioRef.current);

    const sampleKey = Math.round(exactFrame * (isMobile ? 3 : 2));
    const now = performance.now();
    const shouldRefreshVisualSampling =
      sampleKey !== visualSampleRef.current.key || now - visualSampleRef.current.time >= 160;

    if (shouldRefreshVisualSampling) {
      visualSampleRef.current = { key: sampleKey, time: now };

      const nextMode = detectForegroundMode(canvas);
      if (nextMode !== foregroundModeRef.current) {
        foregroundModeRef.current = nextMode;
        setForegroundMode(nextMode);
      }

      if (useCharacterContrast) {
        applyCharacterColors("brand", setBrandColors);
        applyCharacterColors("tagline", setTaglineColors);
        applyCharacterColors("kicker", setKickerColors);
        applyCharacterColors("line", setLineColors);
        applyCharacterColors("aside", setAsideColors);
      }
    }
  }, [isMobile, loadedCount, progress, reducedMotion, useCharacterContrast]);

  const scrollStep = () => {
    window.scrollBy({
      top: Math.max(window.innerHeight * (isMobile ? 0.42 : 0.88), 220),
      behavior: "smooth",
    });
  };

  const ready = reducedMotion || loadedCount >= totalFrames;
  const loadingProgress = reducedMotion ? 100 : Math.round((loadedCount / totalFrames) * 100);
  const heroHeightClass = reducedMotion
    ? "h-[calc(100svh+2.5rem)]"
    : isMobile
      ? "h-[240svh]"
      : "h-[560vh] xl:h-[600vh]";
  const usesDarkForeground = foregroundMode === "dark";
  const primaryTextClass = usesDarkForeground ? "text-matcha-deep" : "text-white";
  const accentTextClass = usesDarkForeground ? "text-matcha-mid" : "text-white/88";
  const asideTextClass = usesDarkForeground ? "text-matcha-deep/80" : "text-white/82";
  const buttonClass = usesDarkForeground
    ? "border-matcha-deep/20 bg-white/88 text-matcha-deep hover:bg-white"
    : "border-white/50 bg-white/20 text-white hover:bg-white/30";
  const secondaryLinkClass = usesDarkForeground ? "text-matcha-deep/80 hover:text-matcha-deep" : "text-white/85 hover:text-white";

  return (
    <section ref={containerRef} className={`home-hero ${heroHeightClass}`}>
      <div className="home-hero__viewport">
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
          <div className="home-hero__media absolute inset-0">
            <img
              src={getFrameUrl(posterFrameIndex)}
              alt="USCO cafe exterior"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="home-hero__media absolute inset-0">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-white/82 via-white/18 to-black/26" />

        <div
          ref={textLayerRef}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute left-4 right-4 top-6 flex items-start justify-between sm:left-8 sm:right-8 sm:top-8">
          <div>
            <div
              className={`font-display text-4xl tracking-[0.08em] sm:text-6xl ${useCharacterContrast ? "" : primaryTextClass}`}
            >
              {useCharacterContrast ? renderCharacterText("USCO", "brand", brandColors, "transition-colors duration-300") : "USCO"}
            </div>
            <div
              className={`font-accent text-[10px] uppercase tracking-[0.38em] sm:text-sm ${useCharacterContrast ? "" : accentTextClass}`}
            >
              {useCharacterContrast ? renderCharacterText(taglineText, "tagline", taglineColors, "transition-colors duration-300") : taglineText}
            </div>
          </div>
          <div
            className={`hidden font-sans text-xs uppercase tracking-[0.25em] sm:block ${useCharacterContrast ? "" : asideTextClass}`}
          >
            {useCharacterContrast ? renderCharacterText(asideText, "aside", asideColors, "transition-colors duration-300") : asideText}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 px-4 sm:bottom-14 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl p-0 pointer-events-auto">
              <p
                className={`font-sans text-[10px] uppercase tracking-[0.28em] sm:text-xs ${useCharacterContrast ? "" : accentTextClass}`}
              >
                {useCharacterContrast ? renderCharacterText(overlay.kicker, "kicker", kickerColors, "transition-colors duration-300") : overlay.kicker}
              </p>
              <h1
                className={`mt-3 max-w-3xl text-balance font-display text-[2.35rem] leading-[0.95] sm:mt-4 sm:text-7xl lg:text-[6rem] ${useCharacterContrast ? "" : primaryTextClass}`}
              >
                {useCharacterContrast ? renderCharacterText(overlay.line, "line", lineColors, "transition-colors duration-300") : overlay.line}
              </h1>
              <div className="mt-6 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="/menu"
                  className={`inline-flex min-h-11 w-full items-center justify-center rounded-full border px-5 py-3 font-sans text-[11px] uppercase tracking-[0.28em] transition-[transform,color,background-color,border-color] duration-300 hover:scale-[1.02] sm:w-auto sm:px-6 sm:text-xs ${buttonClass}`}
                >
                  {overlay.cta}
                </Link>
                <Link
                  href="/find-us"
                  className={`font-sans text-[11px] uppercase tracking-[0.28em] transition-colors duration-300 sm:text-xs ${secondaryLinkClass}`}
                >
                  Find Us
                </Link>
              </div>
              <button
                type="button"
                onClick={scrollStep}
                className={`mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 font-sans text-[10px] uppercase tracking-[0.3em] transition-[color,background-color,border-color] duration-300 sm:mt-6 sm:text-[11px] ${
                  usesDarkForeground
                    ? "border-matcha-deep/20 bg-white/82 text-matcha-deep hover:bg-white"
                    : "border-white/35 bg-black/12 text-white/88 hover:bg-black/20"
                }`}
              >
                <span>{isMobile ? "See More" : "Scroll"}</span>
                <span
                  className={`hero-scroll-cue block h-3.5 w-3.5 rounded-full ${
                    usesDarkForeground ? "border border-matcha-deep/35" : "border border-white/55"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

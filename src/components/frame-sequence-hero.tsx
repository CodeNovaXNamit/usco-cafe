/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getFrameAssetUrl, totalFrames } from "@/data/site";

function getFrameUrl(index: number) {
  return getFrameAssetUrl(index);
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function drawCoverFrame(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const canvasRatio = canvas.width / canvas.height;
  const imageRatio = image.width / image.height;

  let drawWidth = 0;
  let drawHeight = 0;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    drawHeight = canvas.height;
    drawWidth = image.width * (canvas.height / image.height);
    offsetX = (canvas.width - drawWidth) / 2;
  } else {
    drawWidth = canvas.width;
    drawHeight = image.height * (canvas.width / image.width);
    offsetY = (canvas.height - drawHeight) / 2;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

export function FrameSequenceHero() {
  // Desktop-only component: keep this mount isolated from phones because it preloads all WebP frames.
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startOverlayRef = useRef<HTMLDivElement | null>(null);
  const endOverlayRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pinMode, setPinMode] = useState<"before" | "fixed" | "bottom">("before");
  const hasLoggedFrameInfoRef = useRef(false);
  const debugFrameRef = useRef<number | null>(null);
  const hasLoggedDebugFrameRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const debugFrameParam = params.get("debugFrame");

    if (debugFrameParam === null) {
      debugFrameRef.current = null;
      return;
    }

    const parsed = Number(debugFrameParam);
    const safeFrame = Number.isFinite(parsed)
      ? Math.max(0, Math.min(totalFrames - 1, Math.floor(parsed)))
      : 0;
    debugFrameRef.current = safeFrame;

    if (process.env.NODE_ENV !== "production" && !hasLoggedDebugFrameRef.current) {
      hasLoggedDebugFrameRef.current = true;
      console.log({ debugFrameLocked: safeFrame });
    }
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" || hasLoggedFrameInfoRef.current) {
      return;
    }

    hasLoggedFrameInfoRef.current = true;
    console.log({
      totalFrames,
      firstFrame: getFrameUrl(0),
      lastFrame: getFrameUrl(totalFrames - 1),
    });
  }, []);

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionMedia.matches);

    updateMotion();
    motionMedia.addEventListener("change", updateMotion);

    return () => {
      motionMedia.removeEventListener("change", updateMotion);
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
      };
    }

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const section = sectionRef.current;
    const pin = pinRef.current;
    const canvas = canvasRef.current;
    const startOverlay = startOverlayRef.current;
    const endOverlay = endOverlayRef.current;
    if (!section || !pin || !canvas || !startOverlay || !endOverlay) {
      return;
    }

    let raf = 0;

    const resizeCanvasToPin = () => {
      const rect = pin.getBoundingClientRect();
      const width = Math.max(Math.round(rect.width), 1);
      const height = Math.max(Math.round(rect.height), 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const renderCurrentFrame = () => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(sectionHeight - viewportHeight, 1);
      const localScroll = window.scrollY - sectionTop;
      const rawProgress = localScroll / scrollableDistance;
      const nextProgress = clamp(rawProgress);

      if (window.scrollY < sectionTop) {
        setPinMode("before");
      } else if (window.scrollY <= sectionTop + scrollableDistance) {
        setPinMode("fixed");
      } else {
        setPinMode("bottom");
      }

      const frameIndex = debugFrameRef.current !== null
        ? debugFrameRef.current
        : Math.min(
            totalFrames - 1,
            Math.floor(nextProgress * (totalFrames - 1)),
          );
      const frame = imagesRef.current[frameIndex];

      if (!frame) {
        return;
      }

      drawCoverFrame(canvas, frame);

      const startExit = clamp(nextProgress / 0.14);
      const startOpacity = 1 - startExit;
      const startY = -90 * startExit;
      const startBlur = 8 * startExit;
      const startScale = 1 - 0.04 * startExit;

      startOverlay.style.opacity = String(startOpacity);
      startOverlay.style.transform = `translate3d(0, ${startY}px, 0) scale(${startScale})`;
      startOverlay.style.filter = `blur(${startBlur}px)`;
      startOverlay.style.pointerEvents = startOpacity > 0.2 ? "auto" : "none";

      const endEnter = clamp((nextProgress - 0.78) / 0.16);
      const easedEnd = 1 - Math.pow(1 - endEnter, 3);
      const endOpacity = easedEnd;
      const endY = 55 * (1 - easedEnd);
      const endScale = 0.94 + 0.06 * easedEnd;
      const endBlur = 10 * (1 - easedEnd);

      endOverlay.style.opacity = String(endOpacity);
      endOverlay.style.transform = `translate3d(0, ${endY}px, 0) scale(${endScale})`;
      endOverlay.style.filter = `blur(${endBlur}px)`;
      endOverlay.style.pointerEvents = endOpacity > 0.6 ? "auto" : "none";
    };

    const scheduleRender = () => {
      if (raf) {
        return;
      }

      raf = window.requestAnimationFrame(() => {
        raf = 0;
        renderCurrentFrame();
      });
    };

    const onResize = () => {
      resizeCanvasToPin();
      scheduleRender();
    };

    resizeCanvasToPin();
    renderCurrentFrame();

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", scheduleRender, { passive: true });

    return () => {
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", onResize);
    };
  }, [loadedCount, reducedMotion]);

  const ready = reducedMotion || loadedCount >= totalFrames;
  const loadingProgress = reducedMotion ? 100 : Math.round((loadedCount / totalFrames) * 100);
  const pinClassName = useMemo(() => {
    if (pinMode === "fixed") {
      return "frame-sequence-pin is-fixed";
    }
    if (pinMode === "bottom") {
      return "frame-sequence-pin is-bottom";
    }
    return "frame-sequence-pin";
  }, [pinMode]);

  return (
    <section ref={sectionRef} className={`frame-sequence-section ${reducedMotion ? "frame-sequence-section--reduced" : ""}`}>
      <div ref={pinRef} className={pinClassName}>
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
          <img
            src={getFrameUrl(0)}
            alt="USCO cafe exterior"
            className="frame-sequence-canvas object-cover"
          />
        ) : (
          <canvas ref={canvasRef} className="frame-sequence-canvas" aria-hidden />
        )}

        <div className="frame-sequence-vignette" aria-hidden="true" />

        <div ref={startOverlayRef} className="frame-sequence-start-overlay">
          <article className="frame-glass-card frame-glass-card--left">
            <p className="frame-glass-kicker">COFFEE + TOAST + WORK</p>
            <h2>Somewhere softer than the usual rush.</h2>
            <p>A calm little stop in Shahpur Jat for slow sips, warm lights, and quiet conversations.</p>
          </article>

          <article className="frame-glass-card frame-glass-card--right">
            <p className="frame-glass-kicker">USCO RITUAL</p>
            <h2>Walk in slow. Leave lighter.</h2>
            <p>From matcha mornings to evening coffee, the space is made to feel peaceful before the first sip.</p>
          </article>
        </div>

        <div ref={endOverlayRef} className="frame-sequence-end-overlay">
          <article className="frame-glass-card frame-glass-card--end">
            <p className="frame-glass-kicker">A LITTLE CUP FOR YOU</p>
            <h2>Coffee for you.</h2>
            <p>Hot, iced, creamy, quiet - pick the mood and let the day slow down for a minute.</p>
            <div className="frame-glass-actions">
              <Link href="/menu">Explore Menu</Link>
              <Link href="/find-us">Find Us</Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

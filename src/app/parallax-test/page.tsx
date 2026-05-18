"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getFrameAssetUrl, totalFrames } from "@/data/site";

function getFrameUrl(index: number) {
  return getFrameAssetUrl(index);
}

function clamp(value: number, min: number, max: number) {
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

export default function ParallaxTestPage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0, cssWidth: 0, cssHeight: 0 });
  const [pinMode, setPinMode] = useState<"before" | "fixed" | "bottom">("before");
  const [scrollYValue, setScrollYValue] = useState(0);
  const [sectionTopValue, setSectionTopValue] = useState(0);
  const hasLoggedFrameInfoRef = useRef(false);

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
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const canvas = canvasRef.current;

    if (!section || !pin || !canvas) {
      return;
    }

    let raf = 0;

    const resizeCanvas = () => {
      const width = Math.max(Math.round(window.innerWidth), 1);
      const height = Math.max(Math.round(window.innerHeight), 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      setCanvasSize({ width: canvas.width, height: canvas.height, cssWidth: width, cssHeight: height });
    };

    const renderByScroll = () => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollable = Math.max(sectionHeight - viewportHeight, 1);
      const localScroll = window.scrollY - sectionTop;
      const p = clamp(localScroll / scrollable, 0, 1);
      const idx = Math.min(totalFrames - 1, Math.floor(p * (totalFrames - 1)));

      if (window.scrollY < sectionTop) {
        setPinMode("before");
      } else if (window.scrollY >= sectionTop && window.scrollY <= sectionTop + scrollable) {
        setPinMode("fixed");
      } else {
        setPinMode("bottom");
      }

      setProgress(p);
      setFrameIndex(idx);
      setScrollYValue(window.scrollY);
      setSectionTopValue(sectionTop);

      const frame = imagesRef.current[idx];
      if (!frame) {
        return;
      }

      drawCoverFrame(canvas, frame);
    };

    const scheduleRender = () => {
      if (raf) {
        return;
      }
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        renderByScroll();
      });
    };

    resizeCanvas();
    renderByScroll();

    const onResize = () => {
      resizeCanvas();
      scheduleRender();
    };

    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", onResize);
    };
  }, [loadedCount]);

  const pinClassName = useMemo(() => {
    if (pinMode === "fixed") {
      return "pin-test-pin is-fixed";
    }
    if (pinMode === "bottom") {
      return "pin-test-pin is-bottom";
    }
    return "pin-test-pin";
  }, [pinMode]);

  return (
    <main className="pin-test-page">
      <section ref={sectionRef} className="pin-test-section">
        <div ref={pinRef} className={pinClassName}>
          <canvas ref={canvasRef} className="pin-test-canvas" />
          <div className="pin-test-debug">
            <div>mode: {pinMode}</div>
            <div>scrollY: {Math.round(scrollYValue)}</div>
            <div>sectionTop: {Math.round(sectionTopValue)}</div>
            <div>progress: {progress.toFixed(4)}</div>
            <div>frameIndex: {frameIndex}</div>
            <div>totalFrames: {totalFrames}</div>
            <div>
              canvas: {canvasSize.width} x {canvasSize.height}
            </div>
            <div>
              canvasCss: {canvasSize.cssWidth} x {canvasSize.cssHeight}
            </div>
            <div>
              loaded: {loadedCount}/{totalFrames}
            </div>
          </div>
        </div>
      </section>

      <section className="pin-test-after">
        <h1>Animation finished</h1>
      </section>
    </main>
  );
}

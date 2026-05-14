"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type MotionInViewProps = {
  children: ReactNode;
  className?: string;
  delay?: string;
  direction?: "left" | "right" | "bottom";
};

export function MotionInView({
  children,
  className = "",
  delay = "0s",
  direction = "left",
}: MotionInViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`motion-in-view motion-in-view--${direction} ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ "--in-view-delay": delay } as CSSProperties}
    >
      {children}
    </div>
  );
}

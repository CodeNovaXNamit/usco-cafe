"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type GallerySourceItem = {
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  mediaType?: "image" | "video";
  preview?: string;
  poster?: string;
  alt: string;
};

const galleryItems: GallerySourceItem[] = [
  {
    title: "Slow table days",
    eyebrow: "Featured Video",
    description: "Quiet corners, warm wood, and a softer kind of pause.",
    href: "https://www.instagram.com/p/DVAr42pD4PY/",
    mediaType: "video",
    preview: "/gallery/insta-01.mp4",
    poster: "/gallery/insta-05.jpg",
    alt: "USCO table-side video moment",
  },
  {
    title: "Warm light outside",
    eyebrow: "Instagram Post",
    description: "The lane, the plants, and the small yellow sign waiting quietly.",
    href: "https://www.instagram.com/p/DJPI1iYys4j/",
    mediaType: "video",
    preview: "/gallery/warm-light-outside-ios.mp4",
    poster: "/gallery/warm-light-outside.jpg",
    alt: "USCO exterior and lane atmosphere",
  },
  {
    title: "A drawn little corner",
    eyebrow: "Instagram Post",
    description: "A softer frame that feels hand-touched and warm.",
    href: "https://www.instagram.com/p/DHNh6UfvhOT/",
    mediaType: "video",
    preview: "/gallery/Insta_03.mp4",
    poster: "/gallery/insta-05.jpg",
    alt: "Stylized corner view from USCO",
  },
  {
    title: "Small rituals",
    eyebrow: "Instagram Post",
    description: "Moments from the bar, from first pour to final sip.",
    href: "https://www.instagram.com/p/DGinPYyTeU_/",
    mediaType: "video",
    preview: "/gallery/insta-04.mp4",
    poster: "/gallery/insta-05.jpg",
    alt: "Coffee ritual clip from USCO",
  },
  {
    title: "Coffee corners",
    eyebrow: "Instagram Post",
    description: "A quiet detail that feels like a pause you can keep.",
    href: "https://www.instagram.com/p/DBbW8GWP-3F/",
    mediaType: "image",
    preview: "/gallery/insta-05.jpg",
    alt: "Cafe corner photograph from USCO",
  },
  {
    title: "Quiet moments",
    eyebrow: "Instagram Post",
    description: "A gentle frame from the day, saved quietly.",
    href: "https://www.instagram.com/p/C_ueIFCzol3/",
    alt: "Quiet moment from USCO Instagram",
  },
  {
    title: "Warm pause",
    eyebrow: "Instagram Post",
    description: "When a cup, a chair, and a little time are enough.",
    href: "https://www.instagram.com/p/DDcDtdiPOnr/",
    alt: "Warm pause frame from USCO Instagram",
  },
  {
    title: "USCO frame",
    eyebrow: "Instagram Post",
    description: "One still from the space before the next visit.",
    href: "https://www.instagram.com/p/DD1KK2TTtWy/",
    alt: "USCO frame from Instagram",
  },
  {
    title: "A softer frame from the lane",
    eyebrow: "Instagram Post",
    description: "Little textures, leaves, and slow light from outside.",
    href: "https://www.instagram.com/p/DUxufvTjywT/?img_index=7",
    alt: "Lane-side frame from USCO Instagram",
  },
  {
    title: "Little rituals, saved quietly",
    eyebrow: "Instagram Post",
    description: "A small memory from the counter and table flow.",
    href: "https://www.instagram.com/p/DEDEMsYPzcG/",
    alt: "Quiet ritual frame from USCO Instagram",
  },
  {
    title: "A quiet post from USCO",
    eyebrow: "Instagram Post",
    description: "Warm corners and small pauses gathered in one post.",
    href: "https://www.instagram.com/p/DN4_qN_EluH/",
    alt: "Quiet post from USCO Instagram",
  },
];

function inferMediaType(item: GallerySourceItem): "image" | "video" | null {
  if (item.mediaType) {
    return item.mediaType;
  }

  const { preview } = item;
  if (!preview) {
    return null;
  }

  const lower = preview.toLowerCase();
  if (lower.endsWith(".mp4") || lower.endsWith(".webm")) {
    return "video";
  }

  if (
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".png") ||
    lower.endsWith(".webp")
  ) {
    return "image";
  }

  return null;
}

function GalleryMedia({ item, isFirst }: { item: GallerySourceItem; isFirst: boolean }) {
  const mediaType = inferMediaType(item);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaType !== "video") {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Keep poster fallback available without breaking layout.
      });
    }
  }, [mediaType, item.preview]);

  if (mediaType === "video" && item.preview && !videoFailed) {
    return (
      <video
        ref={videoRef}
        className="gallery-premium-video"
        src={item.preview}
        poster={item.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        aria-label={item.alt}
        onError={() => setVideoFailed(true)}
      />
    );
  }

  if (mediaType === "image" && item.preview) {
    return (
      <Image
        className="gallery-premium-image"
        src={item.preview}
        alt={item.alt}
        fill
        sizes="(max-width: 1023px) 100vw, 33vw"
        loading={isFirst ? "eager" : "lazy"}
        fetchPriority={isFirst ? "high" : "auto"}
      />
    );
  }

  if ((mediaType === "video" || mediaType === "image") && (item.poster || item.preview)) {
    return (
      <Image
        className="gallery-premium-image"
        src={item.poster || item.preview || ""}
        alt={item.alt}
        fill
        sizes="(max-width: 1023px) 100vw, 33vw"
        loading={isFirst ? "eager" : "lazy"}
        fetchPriority={isFirst ? "high" : "auto"}
      />
    );
  }

  return null;
}

export function GalleryExperience() {
  const visibleItems = galleryItems.filter((item) => inferMediaType(item) !== null);

  return (
    <section className="gallery-experience-premium">
      <div className="gallery-premium-grid">
        {visibleItems.map((item, index) => {
          const mediaType = inferMediaType(item);
          if (!mediaType) {
            return null;
          }

          return (
            <article
              key={item.href}
              className={`gallery-premium-card ${index === 0 ? "gallery-premium-card--featured" : ""}`}
            >
              <a href={item.href} target="_blank" rel="noreferrer noopener">
                <div className="gallery-premium-media">
                  <GalleryMedia item={item} isFirst={index === 0} />

                  <span className="gallery-premium-badge">{item.eyebrow}</span>
                </div>

                <div className="gallery-premium-content">
                  <p className="home-section-kicker">{item.eyebrow}</p>
                  {index === 0 ? <h2>{item.title}</h2> : <h3>{item.title}</h3>}
                  <p>{item.description}</p>
                  <span className="gallery-premium-cta">Open on Instagram</span>
                </div>
              </a>
            </article>
          );
        })}
      </div>
      <div className="mt-8 text-center">
        <a
          href="https://www.instagram.com/uscocafe/"
          target="_blank"
          rel="noreferrer noopener"
          className="gallery-premium-cta"
        >
          Prefer the live feed? Open USCO on Instagram
        </a>
      </div>
    </section>
  );
}

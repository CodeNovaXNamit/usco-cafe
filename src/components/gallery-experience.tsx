import Image from "next/image";

type GallerySourceItem = {
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  preview?: string;
  alt: string;
};

const galleryItems: GallerySourceItem[] = [
  {
    title: "Slow table days",
    eyebrow: "Featured Video",
    description: "Quiet corners, warm wood, and a softer kind of pause.",
    href: "https://www.instagram.com/p/DVAr42pD4PY/",
    preview: "/gallery/insta-01.mp4",
    alt: "USCO table-side video moment",
  },
  {
    title: "Warm light outside",
    eyebrow: "Instagram Post",
    description: "The lane, the plants, and the small yellow sign waiting quietly.",
    href: "https://www.instagram.com/p/DJPI1iYys4j/",
    preview: "/gallery/Insta_02.mp4",
    alt: "USCO exterior and lane atmosphere",
  },
  {
    title: "A drawn little corner",
    eyebrow: "Instagram Post",
    description: "A softer frame that feels hand-touched and warm.",
    href: "https://www.instagram.com/p/DHNh6UfvhOT/",
    preview: "/gallery/Insta_03.mp4",
    alt: "Stylized corner view from USCO",
  },
  {
    title: "Small rituals",
    eyebrow: "Instagram Post",
    description: "Moments from the bar, from first pour to final sip.",
    href: "https://www.instagram.com/p/DGinPYyTeU_/",
    preview: "/gallery/insta-04.mp4",
    alt: "Coffee ritual clip from USCO",
  },
  {
    title: "Coffee corners",
    eyebrow: "Instagram Post",
    description: "A quiet detail that feels like a pause you can keep.",
    href: "https://www.instagram.com/p/DBbW8GWP-3F/",
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

function inferMediaType(preview?: string): "image" | "video" | null {
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

export function GalleryExperience() {
  const visibleItems = galleryItems.filter((item) => inferMediaType(item.preview) !== null);

  return (
    <section className="gallery-experience-premium">
      <div className="gallery-premium-grid">
        {visibleItems.map((item, index) => {
          const mediaType = inferMediaType(item.preview);
          if (!mediaType || !item.preview) {
            return null;
          }

          return (
            <article
              key={item.href}
              className={`gallery-premium-card ${index === 0 ? "gallery-premium-card--featured" : ""}`}
            >
              <a href={item.href} target="_blank" rel="noreferrer noopener">
                <div className="gallery-premium-media">
                  {mediaType === "video" ? (
                    <video
                      src={item.preview}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload={index === 0 ? "metadata" : "none"}
                      aria-label={item.alt}
                    />
                  ) : null}

                  {mediaType === "image" ? (
                    <Image
                      src={item.preview}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 33vw"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                    />
                  ) : null}

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

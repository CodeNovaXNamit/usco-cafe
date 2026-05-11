const instagramPosts = [
  "https://www.instagram.com/p/DVAr42pD4PY/",
  "https://www.instagram.com/p/DJPI1iYys4j/",
  "https://www.instagram.com/p/DHNh6UfvhOT/",
  "https://www.instagram.com/p/DGinPYyTeU_/",
  "https://www.instagram.com/p/DBbW8GWP-3F/",
  "https://www.instagram.com/p/C_ueIFCzol3/",
  "https://www.instagram.com/p/DDcDtdiPOnr/",
  "https://www.instagram.com/p/DD1KK2TTtWy/",
] as const;

function toEmbedUrl(url: string) {
  return `${url.replace(/\/?$/, "/")}embed/captioned/`;
}

export function GalleryExperience() {

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {instagramPosts.map((postUrl, index) => (
        <article
          key={postUrl}
          className="overflow-hidden rounded-[30px] border border-white/55 bg-white/78 p-3 shadow-[0_18px_50px_rgba(74,94,56,0.08)]"
        >
          <div className="mb-3 flex items-center justify-between gap-3 px-2 pt-1">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-matcha-mid">Instagram Post</p>
              <h3 className="mt-1 font-display text-[1.9rem] text-matcha-deep sm:text-[2.2rem]">
                {index === 0 ? "Featured Video" : `Post ${index + 1}`}
              </h3>
            </div>
            <a
              href={postUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-matcha-light bg-matcha-light/40 px-3 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-matcha-deep hover:bg-matcha-light/65"
            >
              Open
            </a>
          </div>
          <div className="overflow-hidden rounded-[24px] bg-[#f6f3ec]">
            <iframe
              src={toEmbedUrl(postUrl)}
              title={`Instagram post ${index + 1}`}
              className="min-h-[38rem] w-full border-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              loading="lazy"
            />
          </div>
        </article>
      ))}
    </div>
  );
}

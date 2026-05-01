import { GalleryExperience } from "@/components/gallery-experience";
import { SectionIntro } from "@/components/section-intro";
import { SiteShell } from "@/components/site-shell";
import { getGalleryItems } from "@/lib/site-content";

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();

  return (
    <SiteShell currentPath="/gallery">
      <section className="px-4 pb-24 pt-18 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Gallery"
            title="Every corner has a story. Most of them are quiet ones."
            body="Photographs from inside USCO."
          />
          <div className="mt-16">
            <GalleryExperience items={galleryItems} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

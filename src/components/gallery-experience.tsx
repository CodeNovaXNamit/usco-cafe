/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  frameStrip,
  galleryItems as fallbackGalleryItems,
  galleryTabs,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/site";

export function GalleryExperience({ items: sourceItems }: { items: GalleryItem[] }) {
  const [activeTab, setActiveTab] = useState<GalleryCategory>("all");
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  const items = useMemo(() => {
    const collection = sourceItems.length > 0 ? sourceItems : fallbackGalleryItems;

    if (activeTab === "all") {
      return collection;
    }

    return collection.filter((item) => item.category === activeTab);
  }, [activeTab, sourceItems]);

  const activeImage =
    (sourceItems.length > 0 ? sourceItems : fallbackGalleryItems).find(
      (item) => item.id === activeImageId,
    ) ?? null;

  useEffect(() => {
    if (!activeImageId) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImageId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageId]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {galleryTabs.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full border px-3 py-2 font-sans text-[11px] uppercase tracking-[0.2em] sm:px-4 sm:text-xs sm:tracking-[0.24em] ${
                active
                  ? "border-matcha-mid bg-matcha-mid text-white"
                  : "border-matcha-light bg-white/80 text-matcha-deep hover:border-matcha-mid"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 columns-1 gap-4 sm:mt-10 md:columns-2 xl:columns-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveImageId(item.id)}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[28px] border border-white/40 bg-white/80 text-left shadow-[0_18px_50px_rgba(74,94,56,0.08)]"
          >
            <div className={`overflow-hidden ${item.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
              <img
                src={item.image}
                alt={item.alt}
                className="h-full w-full object-cover saturate-[0.86] transition duration-700 group-hover:scale-[1.02] group-hover:saturate-100"
              />
            </div>
            <div className="p-4 sm:p-5">
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-matcha-mid sm:text-[11px] sm:tracking-[0.24em]">
                {galleryTabs.find((tab) => tab.key === item.category)?.label}
              </p>
              <h3 className="mt-2 font-display text-[2rem] text-matcha-deep sm:text-3xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-charcoal/75 sm:text-base sm:leading-7">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>

      <section className="mt-18 rounded-[36px] border border-matcha-light bg-white/75 p-6 shadow-[0_18px_50px_rgba(74,94,56,0.06)] sm:mt-24 sm:p-10">
        <div className="max-w-2xl">
          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-matcha-mid sm:text-xs sm:tracking-[0.32em]">
            Frame by Frame
          </p>
          <h3 className="mt-3 font-display text-[2.7rem] leading-[0.96] text-matcha-deep sm:text-5xl">
            The walk in. As you remember it.
          </h3>
        </div>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
          {frameStrip.map((frame) => (
            <div key={frame.index} className="min-w-48 overflow-hidden rounded-[22px] border border-matcha-light bg-white sm:min-w-56">
              <img
                src={frame.image}
                alt={`USCO approach frame ${frame.index}`}
                className="aspect-video h-auto w-full object-cover"
              />
              <div className="px-4 py-3 font-sans text-[11px] uppercase tracking-[0.24em] text-matcha-deep">
                Frame {String(frame.index).padStart(3, "0")}
              </div>
            </div>
          ))}
        </div>
      </section>

      {activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/80 p-4 backdrop-blur"
          onClick={() => setActiveImageId(null)}
        >
          <div
            className="max-w-5xl overflow-hidden rounded-[28px] bg-[#f6f3ec] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={activeImage.image} alt={activeImage.alt} className="max-h-[70vh] w-full object-cover" />
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:p-6">
              <div>
                <h4 className="font-display text-3xl text-matcha-deep sm:text-4xl">{activeImage.title}</h4>
                <p className="mt-3 max-w-2xl text-base leading-7 text-charcoal/80 sm:text-lg sm:leading-8">
                  {activeImage.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveImageId(null)}
                className="self-start font-sans text-xs uppercase tracking-[0.24em] text-matcha-mid"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

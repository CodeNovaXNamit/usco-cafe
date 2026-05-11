"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { menuTabs, type MenuCategory, type MenuItem } from "@/data/site";

function categoryLabel(category: Exclude<MenuCategory, "all">) {
  switch (category) {
    case "coffee":
      return "Slow Pour";
    case "cold-drinks":
      return "Cold Ritual";
    case "food-snacks":
      return "From the Counter";
    case "seasonal":
      return "Seasonal Note";
    default:
      return "Quiet Serving";
  }
}

export function MenuTabs({ items: sourceItems }: { items: MenuItem[] }) {
  const [activeTab, setActiveTab] = useState<MenuCategory>("all");
  const availableTabs = useMemo(() => {
    const categories = new Set(sourceItems.filter((item) => item.visible).map((item) => item.category));
    return menuTabs.filter((tab) => tab.key === "all" || categories.has(tab.key));
  }, [sourceItems]);

  const items = useMemo(() => {
    const visible = sourceItems.filter((item) => item.visible);
    if (activeTab === "all") {
      return visible.sort((a, b) => a.category.localeCompare(b.category) || a.sortOrder - b.sortOrder);
    }

    return visible
      .filter((item) => item.category === activeTab)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [activeTab, sourceItems]);

  return (
    <div className="section-fade">
      <div className="rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(248,246,241,0.92),rgba(240,243,233,0.88))] p-3 shadow-[0_24px_60px_rgba(74,94,56,0.08)] sm:p-4">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {availableTabs.map((tab) => {
            const active = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full border px-3 py-2 font-sans text-[11px] uppercase tracking-[0.22em] sm:px-4 sm:text-xs sm:tracking-[0.25em] ${
                  active
                    ? "border-matcha-mid bg-matcha-mid text-white shadow-[0_12px_24px_rgba(74,94,56,0.18)]"
                    : "border-matcha-light bg-white/80 text-matcha-deep hover:border-matcha-mid hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:gap-6 xl:grid-cols-2">
        {items.map((item) => {
          return (
            <article
              key={item.id}
              className="group isolate overflow-hidden rounded-[26px] border border-white/70 bg-[linear-gradient(180deg,rgba(248,246,241,0.98),rgba(240,243,233,0.92))] shadow-[0_14px_30px_rgba(74,94,56,0.08)] sm:rounded-[30px] sm:shadow-[0_24px_60px_rgba(74,94,56,0.10)]"
            >
              <div className="grid min-w-0 gap-0 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] xl:grid-cols-[minmax(240px,300px)_minmax(0,1fr)]">
                <div className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),rgba(212,223,192,0.40)_58%,rgba(212,223,192,0.16)_100%)] p-2.5 sm:p-6">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,246,241,0.82),transparent_45%)]" />
                  <div className="pointer-events-none absolute left-2.5 top-2.5 z-20 rounded-full border border-white/70 bg-white/68 px-2 py-1 font-sans text-[8px] uppercase tracking-[0.15em] text-matcha-mid backdrop-blur-sm sm:left-6 sm:top-6 sm:px-3 sm:text-[10px] sm:tracking-[0.22em]">
                    {categoryLabel(item.category)}
                  </div>
                  <div className="relative z-10 mx-auto mt-7 w-full max-w-[280px] sm:mt-10 sm:max-w-[312px] md:mt-12">
                    <div className="aspect-square overflow-hidden rounded-[20px] border border-white/80 bg-[linear-gradient(180deg,rgba(248,246,241,0.98),rgba(233,239,223,0.94))] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_14px_28px_rgba(74,94,56,0.08)] sm:rounded-[38px] sm:p-4 sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_22px_42px_rgba(74,94,56,0.10)]">
                      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[15px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(244,241,234,0.84)_56%,rgba(222,232,204,0.64)_100%)] sm:rounded-[28px]">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={720}
                            height={720}
                            className="relative z-10 h-auto w-full object-contain drop-shadow-[0_10px_18px_rgba(74,94,56,0.12)] transition duration-700 group-hover:-translate-y-1 group-hover:scale-[1.03] sm:w-[96%] sm:drop-shadow-[0_22px_36px_rgba(74,94,56,0.16)]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-[18px] border border-dashed border-matcha-light/80 bg-white/35 px-3 text-center text-[11px] italic text-charcoal/55 sm:rounded-[28px] sm:px-6 sm:text-sm">
                            Serving image coming in quietly.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative min-w-0 flex flex-col justify-between p-3 sm:p-6 lg:p-7">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70" />
                  <div>
                    <div className="flex flex-col gap-4 sm:gap-6">
                      <div className="min-w-0">
                        <div className="min-w-0 max-w-[34rem]">
                          <h3 className="break-words font-display text-[1.02rem] leading-[0.95] text-matcha-deep sm:text-[2.35rem] lg:text-[2.7rem]">
                            {item.name}
                          </h3>
                          <p className="mt-2 break-words line-clamp-2 text-[12px] leading-4.5 text-charcoal/72 sm:line-clamp-3 sm:text-lg sm:leading-8">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {item.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-matcha-light/70 bg-white/70 px-2 py-1 font-sans text-[9px] uppercase tracking-[0.12em] text-matcha-deep shadow-[0_6px_16px_rgba(74,94,56,0.06)] sm:px-3 sm:text-[11px] sm:tracking-[0.2em]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 border-t border-matcha-light/50 pt-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-4">
                    <p className="font-sans text-[8px] uppercase tracking-[0.14em] text-matcha-mid sm:text-[11px] sm:tracking-[0.22em]">
                      Soft cream. Matcha light. Quiet detail.
                    </p>
                    <div className="h-px w-full bg-[linear-gradient(90deg,rgba(143,169,107,0.1),rgba(143,169,107,0.5),rgba(143,169,107,0.1))] sm:w-auto sm:flex-1" />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

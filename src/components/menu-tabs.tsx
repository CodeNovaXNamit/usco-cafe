"use client";

import { useMemo, useState } from "react";
import { menuTabs, type MenuCategory, type MenuItem } from "@/data/site";

function formatPrice(price: number) {
  return price === 0 ? "TBD" : `INR ${price}`;
}

export function MenuTabs({ items: sourceItems }: { items: MenuItem[] }) {
  const [activeTab, setActiveTab] = useState<MenuCategory>("all");

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
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {menuTabs.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full border px-3 py-2 font-sans text-[11px] uppercase tracking-[0.22em] sm:px-4 sm:text-xs sm:tracking-[0.25em] ${
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
      <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="grain rounded-[24px] border border-matcha-light bg-white/92 p-5 shadow-[0_18px_50px_rgba(74,94,56,0.08)] sm:p-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
              <div className="flex-1">
                <h3 className="font-display text-3xl text-matcha-deep sm:text-4xl">{item.name}</h3>
                <p className="mt-2 text-base italic text-charcoal/75">{item.description}</p>
              </div>
              <div className="font-sans text-base font-semibold text-matcha-mid sm:text-lg">{formatPrice(item.price)}</div>
            </div>
            {item.tags.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-matcha-light px-3 py-1 font-sans text-[11px] uppercase tracking-[0.2em] text-matcha-deep"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

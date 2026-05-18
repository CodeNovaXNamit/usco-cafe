"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { menuTabs, type MenuCategory, type MenuItem } from "@/data/site";

function getCategoryMeta(category: Exclude<MenuCategory, "all">) {
  switch (category) {
    case "coffee":
      return {
        label: "Slow Pour",
        note: "Best for quiet mornings and focused sips.",
        accent: "coffee",
      };
    case "matcha":
      return {
        label: "Matcha Ritual",
        note: "Matcha creations for calm, creamy sips.",
        accent: "seasonal",
      };
    case "cold-drinks":
      return {
        label: "Cold Comfort",
        note: "Made for warmer hours and slower conversations.",
        accent: "cold",
      };
    case "food-snacks":
      return {
        label: "Small Bite",
        note: "A soft little pairing for your cup.",
        accent: "snack",
      };
    case "usco-specials":
      return {
        label: "USCO Special",
        note: "House picks that define the USCO ritual.",
        accent: "seasonal",
      };
    case "gelato":
      return {
        label: "Sweet Pause",
        note: "Creamy, cold, and made for lingering.",
        accent: "gelato",
      };
    case "seasonal":
      return {
        label: "Seasonal Note",
        note: "Available when the mood and season agree.",
        accent: "seasonal",
      };
    default:
      return {
        label: "USCO Pick",
        note: "Carefully chosen. Quietly served.",
        accent: "default",
      };
  }
}

function MenuCard({ item }: { item: MenuItem }) {
  const meta = getCategoryMeta(item.category);
  const accentClass = `premium-menu-card premium-menu-card--${meta.accent}`;

  return (
    <article className={accentClass}>
      <div className="premium-menu-media">
        <div className="premium-menu-image-frame">
          {item.image ? (
            <Image
              src={item.image}
              alt={`${item.name} at USCO Cafe in Shahpur Jat`}
              width={720}
              height={720}
              className="premium-menu-image"
            />
          ) : (
            <div className="premium-menu-image-fallback">
              Serving image coming in quietly.
            </div>
          )}
        </div>
      </div>

      <div className="premium-menu-content">
        <div className="premium-menu-topline">
          <span className="premium-menu-category">{meta.label}</span>
        </div>

        <h3>{item.name}</h3>
        <p className="premium-menu-description">{item.description}</p>

        {item.tags.length > 0 ? (
          <div className="premium-menu-tags">
            {item.tags.map((tag) => (
              <span key={tag} className="premium-menu-tag">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="premium-menu-bottom">
          <span className="premium-menu-note">{meta.note}</span>
        </div>
      </div>
    </article>
  );
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

  const countsByCategory = useMemo(() => {
    const visible = sourceItems.filter((item) => item.visible);
    const counts = new Map<MenuCategory, number>();
    counts.set("all", visible.length);

    for (const item of visible) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }

    return counts;
  }, [sourceItems]);

  return (
    <div className="section-fade">
      <div className="premium-menu-tabs-shell">
        <div className="premium-menu-tabs">
          {availableTabs.map((tab) => {
            const active = tab.key === activeTab;
            const count = countsByCategory.get(tab.key) ?? 0;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                aria-pressed={active}
                className={`premium-menu-tab ${active ? "is-active" : ""}`}
              >
                {tab.label}
                <span className="premium-menu-tab-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="premium-menu-grid">
        {items.map((item) => {
          return <MenuCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

import "server-only";

import {
  adminStats as fallbackAdminStats,
  galleryItems as fallbackGalleryItems,
  menuItems as fallbackMenuItems,
  priceChangeLog as fallbackPriceChangeLog,
  type GalleryItem,
  type MenuItem,
} from "@/data/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PriceLogEntry = [string, string, string, string];

function mapMenuCategory(category: string): MenuItem["category"] {
  switch (category) {
    case "cold_drinks":
      return "cold-drinks";
    case "food":
      return "food-snacks";
    case "seasonal":
      return "seasonal";
    default:
      return "coffee";
  }
}

function mapGalleryCategory(category: string): GalleryItem["category"] {
  switch (category) {
    case "space":
    case "brews":
    case "bar":
    case "people":
      return category;
    default:
      return "space";
  }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return fallbackMenuItems;
  }

  const { data, error } = await supabase
    .from("menu_items")
    .select("id, name, description, price, category, tags, visible, sort_order")
    .eq("visible", true)
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return fallbackMenuItems;
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description ?? "",
    price: item.price,
    category: mapMenuCategory(item.category),
    tags: (item.tags ?? []) as MenuItem["tags"],
    visible: item.visible ?? true,
    sortOrder: item.sort_order ?? 0,
  }));
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return fallbackGalleryItems;
  }

  const { data, error } = await supabase
    .from("gallery_photos")
    .select("id, public_url, caption, alt_text, category, sort_order")
    .eq("visible", true)
    .order("sort_order", { ascending: true })
    .order("uploaded_at", { ascending: false });

  if (error || !data) {
    return fallbackGalleryItems;
  }

  return data.map((item, index) => ({
    id: item.id,
    title: item.caption?.split(".")[0] || `Frame ${index + 1}`,
    category: mapGalleryCategory(item.category ?? "uncategorised"),
    caption: item.caption ?? "Quiet details from inside USCO.",
    alt: item.alt_text ?? "USCO gallery image",
    image: item.public_url,
    tall: index % 3 === 0,
  }));
}

export async function getPriceChangeLog(): Promise<PriceLogEntry[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return fallbackPriceChangeLog as PriceLogEntry[];
  }

  const { data, error } = await supabase
    .from("price_change_log")
    .select("changed_at, old_price, new_price, changed_by, menu_items(name)")
    .order("changed_at", { ascending: false })
    .limit(30);

  if (error || !data) {
    return fallbackPriceChangeLog as PriceLogEntry[];
  }

  return data.map((entry) => {
    const changedAt = new Date(entry.changed_at).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    return [
      changedAt,
      (entry.menu_items as { name?: string } | null)?.name ?? "Menu item",
      `${entry.old_price ?? 0} -> ${entry.new_price ?? 0}`,
      entry.changed_by ?? "admin",
    ];
  });
}

export async function getAdminStats() {
  const [menu, gallery, priceLog] = await Promise.all([
    getMenuItems(),
    getGalleryItems(),
    getPriceChangeLog(),
  ]);

  return {
    totalMenuItems: menu.length,
    hiddenItems: 0,
    galleryPhotos: gallery.length,
    updatedAt: priceLog[0]?.[0] ?? fallbackAdminStats.updatedAt,
  };
}

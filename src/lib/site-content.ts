import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  adminStats as fallbackAdminStats,
  galleryItems as fallbackGalleryItems,
  menuItems as fallbackMenuItems,
  priceChangeLog as fallbackPriceChangeLog,
  type GalleryItem,
  type MenuItem,
} from "@/data/site";
import { menuImageManifest } from "@/data/menu-image-manifest";
import { staticMenuItems } from "@/data/menu-static-items";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PriceLogEntry = [string, string, string, string];
type MenuPrice = MenuItem["price"];

const MENU_CSV_PATH = path.join(process.cwd(), "menu", "menu_data.csv");

const MENU_IMAGE_ALIASES: Record<string, string> = {
  "anandini-tea": "anandini-tea",
  "anandini-tea-gulposh-firdaus-pinewood": "anandini-tea",
  "coconut-and-jaggery-iced-latte": "coconut-and-jaggery-iced-latte",
  "corn-chilli-cheese-toast": "corn-chilli-toast",
  "fresh-coconut-americano": "fres-cocunut-americano",
  "fresh-lemonade-water-or-soda": "lemonade-water-or-soda",
  "orange-americano": "orange-amricano",
  "regular-fries-peri-peri-fries": "regular-fries-peri-peri-fries",
  "sweet-lime-juice-mosambi": "sweet-lime-juice",
};

const SHIBUYA_HONEY_TOAST_SLUG = "shibuya-honey-toast";
const SHIBUYA_HONEY_TOAST_IMAGE_PATH = "/menu-items/Shibuya Honey Toast/Shibuya Honey Toast.png";

function mapMenuCategory(category: string): MenuItem["category"] {
  switch (category) {
    case "cold_drinks":
      return "cold-drinks";
    case "matcha":
      return "matcha";
    case "food":
      return "food-snacks";
    case "usco_specials":
    case "specials":
      return "usco-specials";
    case "gelato":
      return "gelato";
    case "seasonal":
      return "seasonal";
    case "shibuya_honey_toast":
      return "shibuya-honey-toast";
    default:
      return "coffee";
  }
}

function mapCsvMenuCategory(category: string): MenuItem["category"] {
  switch (category.trim().toLowerCase()) {
    case "hot":
      return "coffee";
    case "matcha":
      return "matcha";
    case "cold":
    case "beverages":
      return "cold-drinks";
    case "premium":
    case "specials":
    case "usco specials":
      return "usco-specials";
    case "nibbles":
      return "food-snacks";
    case "gelato":
      return "gelato";
    default:
      return "coffee";
  }
}

function parseCsvLine(line: string) {
  const columns: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      const nextCharacter = line[index + 1];

      if (insideQuotes && nextCharacter === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }

      continue;
    }

    if (character === "," && !insideQuotes) {
      columns.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  columns.push(current.trim());
  return columns;
}

function parseMenuPrice(rawPrice: string): MenuPrice {
  const normalized = rawPrice.trim();

  if (!normalized) {
    return 0;
  }

  if (/^\d+$/.test(normalized)) {
    return Number(normalized);
  }

  return normalized;
}

function slugifyMenuName(name: string) {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildMenuItemDescription(category: string, name: string) {
  const group = category.trim().toLowerCase();

  if (group === "hot") {
    return "Hot coffee, quietly served.";
  }

  if (group === "cold") {
    return "Cold coffee, built for long afternoons.";
  }

  if (group === "beverages") {
    return name.toLowerCase().includes("tea")
      ? "Tea and house drinks, poured without rush."
      : "House beverages for the slower side of the day.";
  }

  if (group === "nibbles") {
    return "Small plates and cafe bites.";
  }

  if (group === "gelato") {
    return "Slow churned gelato, served cold.";
  }

  if (group === "matcha") {
    return "Matcha creations for calm, creamy sips.";
  }

  if (group === "premium" || group === "specials" || group === "usco specials") {
    return "House specials for the slower side of the day.";
  }

  return "";
}

function normalizePublicImagePath(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("/")) {
    return trimmed;
  }

  return `/${trimmed.replace(/^\/+/, "")}`;
}

function resolveMenuImageByName(name: string) {
  const slug = slugifyMenuName(name);
  const aliasSlug = MENU_IMAGE_ALIASES[slug] ?? slug;
  return menuImageManifest[slug] ?? menuImageManifest[aliasSlug];
}

function resolveMenuImage(item: Pick<MenuItem, "id" | "name"> & { image?: string | null }) {
  const explicit = normalizePublicImagePath(item.image);
  if (explicit) {
    return explicit;
  }

  const idSlug = item.id.includes("-") ? item.id.split("-").slice(1).join("-") : item.id;
  return menuImageManifest[item.id] ?? menuImageManifest[idSlug] ?? resolveMenuImageByName(item.name);
}

function isShibuyaHoneyToastItem(item: Pick<MenuItem, "id" | "name">) {
  const idSlug = item.id.includes("-") ? item.id.split("-").slice(1).join("-") : item.id;
  const nameSlug = slugifyMenuName(item.name);
  return idSlug === SHIBUYA_HONEY_TOAST_SLUG || nameSlug === SHIBUYA_HONEY_TOAST_SLUG;
}

function normalizeMenuItem(item: MenuItem): MenuItem {
  const normalized: MenuItem = {
    ...item,
    image: resolveMenuImage(item),
  };

  if (isShibuyaHoneyToastItem(normalized)) {
    normalized.category = "shibuya-honey-toast";
    normalized.image = SHIBUYA_HONEY_TOAST_IMAGE_PATH;
  }

  return normalized;
}

function mergeStaticMenuItems(baseItems: MenuItem[]) {
  const result = [...baseItems];
  const existingIds = new Set(result.map((item) => item.id));
  const maxByCategory = new Map<MenuItem["category"], number>();

  for (const item of result) {
    const current = maxByCategory.get(item.category) ?? 0;
    maxByCategory.set(item.category, Math.max(current, item.sortOrder));
  }

  for (const item of staticMenuItems) {
    if (existingIds.has(item.id)) {
      continue;
    }

    const nextSortOrder = (maxByCategory.get(item.category) ?? 0) + 1;
    maxByCategory.set(item.category, nextSortOrder);

    result.push({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price ?? 0,
      category: item.category,
      image: item.image,
      tags: item.tags ?? [],
      visible: true,
      sortOrder: nextSortOrder,
    });
    existingIds.add(item.id);
  }

  return result;
}

async function readMenuItemsFromCsv(): Promise<MenuItem[] | null> {
  try {
    const csv = await readFile(MENU_CSV_PATH, "utf8");
    const lines = csv
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length < 2) {
      return null;
    }

    const headers = parseCsvLine(lines[0]);

    if (headers.join("|") !== "Category|Item Name|Price") {
      return null;
    }

    return lines.slice(1).map((line, index) => {
      const [category, itemName, price] = parseCsvLine(line) as [string, string, string];
      const vegan = /\(vegan\)/i.test(itemName);
      const cleanName = itemName.replace(/\s*\(vegan\)\s*/i, "").trim();
      const itemId = `${mapCsvMenuCategory(category)}-${slugifyMenuName(cleanName) || index + 1}`;

      return {
        id: itemId,
        name: cleanName,
        description: buildMenuItemDescription(category, cleanName),
        price: parseMenuPrice(price),
        category: mapCsvMenuCategory(category),
        image: resolveMenuImage({ id: itemId, name: cleanName }),
        tags: vegan ? (["Vegan"] as MenuItem["tags"]) : [],
        visible: true,
        sortOrder: index + 1,
      } satisfies MenuItem;
    });
  } catch {
    return null;
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

function finalizeMenuItems(source: MenuItem[]) {
  return mergeStaticMenuItems(source)
    .map(normalizeMenuItem)
    .filter((item) => item.category !== "gelato" || Boolean(item.image));
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const csvItems = await readMenuItemsFromCsv();

  if (csvItems && csvItems.length > 0) {
    return finalizeMenuItems(csvItems);
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return finalizeMenuItems(fallbackMenuItems);
  }

  const { data, error } = await supabase
    .from("menu_items")
    .select("id, name, description, price, category, tags, visible, sort_order")
    .eq("visible", true)
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return finalizeMenuItems(fallbackMenuItems);
  }

  const dbItems: MenuItem[] = data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description ?? "",
    price: item.price,
    category: mapMenuCategory(item.category),
    image: undefined,
    tags: (item.tags ?? []) as MenuItem["tags"],
    visible: item.visible ?? true,
    sortOrder: item.sort_order ?? 0,
  }));

  return finalizeMenuItems(dbItems);
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

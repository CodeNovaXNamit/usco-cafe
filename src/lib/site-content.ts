import "server-only";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
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
type MenuPrice = MenuItem["price"];

const MENU_CSV_PATH = path.join(process.cwd(), "menu", "menu_data.csv");
const MENU_IMAGE_DIR = path.join(process.cwd(), "public", "menu-items");
const MENU_ADDON_DIR = path.join(MENU_IMAGE_DIR, "addon");
const SUPPORTED_MENU_IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

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

function mapMenuCategory(category: string): MenuItem["category"] {
  switch (category) {
    case "cold_drinks":
      return "cold-drinks";
    case "food":
      return "food-snacks";
    case "gelato":
      return "gelato";
    case "seasonal":
      return "seasonal";
    default:
      return "coffee";
  }
}

function mapCsvMenuCategory(category: string): MenuItem["category"] {
  switch (category.trim().toLowerCase()) {
    case "hot":
      return "coffee";
    case "cold":
    case "beverages":
      return "cold-drinks";
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

async function getMenuImagePath(name: string) {
  const slug = slugifyMenuName(name);
  const imageSlug = MENU_IMAGE_ALIASES[slug] ?? slug;

  for (const extension of SUPPORTED_MENU_IMAGE_EXTENSIONS) {
    const imagePath = path.join(MENU_IMAGE_DIR, `${imageSlug}${extension}`);
    try {
      await readFile(imagePath);
      return `/menu-items/${imageSlug}${extension}`;
    } catch {
      // Check next extension.
    }
  }

  return undefined;
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

  return "";
}

function toTitleCase(raw: string) {
  return raw
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function mapAddonFolderCategory(folderName: string): MenuItem["category"] {
  switch (folderName.toLowerCase()) {
    case "hot":
      return "coffee";
    case "cold":
      return "cold-drinks";
    case "food":
      return "food-snacks";
    case "gelato":
      return "gelato";
    default:
      return "seasonal";
  }
}

async function readAddonMenuItems(existing: MenuItem[]): Promise<MenuItem[]> {
  try {
    const categoryDirs = await readdir(MENU_ADDON_DIR, { withFileTypes: true });
    const existingIds = new Set(existing.map((item) => item.id));
    const additions: MenuItem[] = [];

    for (const dirEntry of categoryDirs) {
      if (!dirEntry.isDirectory()) {
        continue;
      }

      const category = mapAddonFolderCategory(dirEntry.name);
      const categoryPath = path.join(MENU_ADDON_DIR, dirEntry.name);
      const files = await readdir(categoryPath, { withFileTypes: true });
      const currentCategoryMaxOrder = Math.max(
        0,
        ...existing.filter((item) => item.category === category).map((item) => item.sortOrder),
        ...additions.filter((item) => item.category === category).map((item) => item.sortOrder),
      );
      let nextSortOrder = currentCategoryMaxOrder + 1;

      for (const fileEntry of files) {
        if (!fileEntry.isFile()) {
          continue;
        }

        const extension = path.extname(fileEntry.name).toLowerCase();
        if (!SUPPORTED_MENU_IMAGE_EXTENSIONS.has(extension)) {
          continue;
        }

        const rawBaseName = path.parse(fileEntry.name).name.replace(/\s*-\s*copy$/i, "").trim();
        const displayName = toTitleCase(rawBaseName.replace(/\s+/g, " "));
        const slug = slugifyMenuName(rawBaseName);
        const id = `${category}-${slug}`;

        if (!slug || existingIds.has(id)) {
          continue;
        }

        const description = buildMenuItemDescription(
          category === "coffee"
            ? "hot"
            : category === "cold-drinks"
              ? "cold"
              : category === "food-snacks"
                ? "nibbles"
                : category,
          displayName,
        );

        additions.push({
          id,
          name: displayName,
          description,
          price: 0,
          category,
          image: `/menu-items/addon/${dirEntry.name}/${fileEntry.name}`,
          tags: [],
          visible: true,
          sortOrder: nextSortOrder,
        });
        existingIds.add(id);
        nextSortOrder += 1;
      }
    }

    return additions;
  } catch {
    return [];
  }
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

    return Promise.all(
      lines.slice(1).map(async (line, index) => {
      const [category, itemName, price] = parseCsvLine(line) as [string, string, string];
      const vegan = /\(vegan\)/i.test(itemName);
      const cleanName = itemName.replace(/\s*\(vegan\)\s*/i, "").trim();

      return {
        id: `${mapCsvMenuCategory(category)}-${slugifyMenuName(cleanName) || index + 1}`,
        name: cleanName,
        description: buildMenuItemDescription(category, cleanName),
        price: parseMenuPrice(price),
        category: mapCsvMenuCategory(category),
        image: await getMenuImagePath(cleanName),
        tags: vegan ? (["Vegan"] as MenuItem["tags"]) : [],
        visible: true,
        sortOrder: index + 1,
      } satisfies MenuItem;
      }),
    );
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

export async function getMenuItems(): Promise<MenuItem[]> {
  const csvItems = await readMenuItemsFromCsv();

  if (csvItems && csvItems.length > 0) {
    const addonItems = await readAddonMenuItems(csvItems);
    return [...csvItems, ...addonItems].filter((item) => item.category !== "gelato" || Boolean(item.image));
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    const addonItems = await readAddonMenuItems(fallbackMenuItems);
    return [...fallbackMenuItems, ...addonItems].filter((item) => item.category !== "gelato" || Boolean(item.image));
  }

  const { data, error } = await supabase
    .from("menu_items")
    .select("id, name, description, price, category, tags, visible, sort_order")
    .eq("visible", true)
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error || !data) {
    const addonItems = await readAddonMenuItems(fallbackMenuItems);
    return [...fallbackMenuItems, ...addonItems].filter((item) => item.category !== "gelato" || Boolean(item.image));
  }

  const dbItems = data.map((item) => ({
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
  const addonItems = await readAddonMenuItems(dbItems);
  return [...dbItems, ...addonItems].filter((item) => item.category !== "gelato" || Boolean(item.image));
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

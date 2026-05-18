export const frameBaseUrl = "/api/frames";
export const frameVersion = "animation-reexport-192";

export const totalFrames = 192;

export function getFrameAssetUrl(index: number) {
  return `${frameBaseUrl}/${index}?v=${frameVersion}`;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/find-us", label: "Find Us" },
] as const;

export type MenuCategory =
  | "all"
  | "coffee"
  | "matcha"
  | "cold-drinks"
  | "food-snacks"
  | "usco-specials"
  | "gelato"
  | "seasonal"
  | "shibuya-honey-toast";

export type DietaryTag =
  | "Vegan"
  | "Vegan Option"
  | "Vegetarian"
  | "Signature"
  | "GF"
  | "New";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number | string;
  category: Exclude<MenuCategory, "all">;
  image?: string;
  tags: DietaryTag[];
  visible: boolean;
  sortOrder: number;
};

export const menuTabs: { key: MenuCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "coffee", label: "Hot Drinks" },
  { key: "matcha", label: "Matcha" },
  { key: "cold-drinks", label: "Cold Drinks" },
  { key: "food-snacks", label: "Nibbles" },
  { key: "usco-specials", label: "USCO Specials" },
  { key: "gelato", label: "Gelato" },
  { key: "seasonal", label: "Seasonal" },
  { key: "shibuya-honey-toast", label: "Shibuya Honey Toast" },
];

export const menuItems: MenuItem[] = [
  {
    id: "espresso",
    name: "Espresso",
    description: "Single origin, pulled short",
    price: 120,
    category: "coffee",
    tags: ["Signature"],
    visible: true,
    sortOrder: 1,
  },
  {
    id: "double-espresso",
    name: "Double Espresso",
    description: "Two shots, nothing wasted",
    price: 150,
    category: "coffee",
    tags: [],
    visible: true,
    sortOrder: 2,
  },
  {
    id: "americano",
    name: "Americano",
    description: "Espresso and still water, long and quiet",
    price: 160,
    category: "coffee",
    tags: [],
    visible: true,
    sortOrder: 3,
  },
  {
    id: "flat-white",
    name: "Flat White",
    description: "Microfoam, velvety, restrained",
    price: 180,
    category: "coffee",
    tags: [],
    visible: true,
    sortOrder: 4,
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "Equal thirds, classically made",
    price: 180,
    category: "coffee",
    tags: [],
    visible: true,
    sortOrder: 5,
  },
  {
    id: "latte",
    name: "Latte",
    description: "Silky, mild, easy to stay with",
    price: 190,
    category: "coffee",
    tags: [],
    visible: true,
    sortOrder: 6,
  },
  {
    id: "signature-latte",
    name: "USCO Signature Latte",
    description: "House blend, brown butter, cardamom",
    price: 220,
    category: "usco-specials",
    tags: ["Signature"],
    visible: true,
    sortOrder: 7,
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    description: "18-hour steep, served over ice",
    price: 200,
    category: "coffee",
    tags: [],
    visible: true,
    sortOrder: 8,
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    description: "Ceremonial grade, oat or whole milk",
    price: 210,
    category: "coffee",
    tags: ["Vegan Option"],
    visible: true,
    sortOrder: 9,
  },
  {
    id: "filter-coffee",
    name: "Filter Coffee",
    description: "Drip-brewed, single origin, rotating",
    price: 150,
    category: "coffee",
    tags: [],
    visible: true,
    sortOrder: 10,
  },
  {
    id: "hojicha-tonic",
    name: "Hojicha Tonic",
    description: "Roasted green tea and sparkling water",
    price: 190,
    category: "cold-drinks",
    tags: ["Vegan"],
    visible: true,
    sortOrder: 1,
  },
  {
    id: "yuzu-lemonade",
    name: "Yuzu Lemonade",
    description: "House-pressed, honey-sweetened",
    price: 160,
    category: "cold-drinks",
    tags: ["Vegan"],
    visible: true,
    sortOrder: 2,
  },
  {
    id: "iced-matcha",
    name: "Iced Matcha",
    description: "Ceremonial grade over ice, oat milk",
    price: 200,
    category: "cold-drinks",
    tags: ["Vegan Option"],
    visible: true,
    sortOrder: 3,
  },
  {
    id: "cold-brew-tonic",
    name: "Cold Brew Tonic",
    description: "Cold brew, tonic, orange peel",
    price: 210,
    category: "cold-drinks",
    tags: ["Signature"],
    visible: true,
    sortOrder: 4,
  },
  {
    id: "sparkling-water",
    name: "Sparkling Water",
    description: "San Pellegrino or similar",
    price: 80,
    category: "cold-drinks",
    tags: [],
    visible: true,
    sortOrder: 5,
  },
  {
    id: "still-water",
    name: "Still Water",
    description: "Because silence deserves company",
    price: 0,
    category: "cold-drinks",
    tags: [],
    visible: true,
    sortOrder: 6,
  },
  {
    id: "banana-bread",
    name: "Banana Bread",
    description: "Baked in-house, served warm",
    price: 140,
    category: "food-snacks",
    tags: ["Vegan Option"],
    visible: true,
    sortOrder: 1,
  },
  {
    id: "ricotta-toast",
    name: "Ricotta Toast",
    description: "Sourdough, fig jam, rosemary honey",
    price: 180,
    category: "food-snacks",
    tags: ["Vegetarian"],
    visible: true,
    sortOrder: 2,
  },
  {
    id: "granola-jar",
    name: "Granola Jar",
    description: "House granola, yogurt, seasonal fruit",
    price: 160,
    category: "food-snacks",
    tags: ["Vegetarian"],
    visible: true,
    sortOrder: 3,
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    description: "Multigrain, lemon zest, chilli flakes",
    price: 200,
    category: "food-snacks",
    tags: ["Vegan"],
    visible: true,
    sortOrder: 4,
  },
  {
    id: "croissant",
    name: "Croissant",
    description: "Plain butter, baked fresh each morning",
    price: 120,
    category: "food-snacks",
    tags: ["Vegetarian"],
    visible: true,
    sortOrder: 5,
  },
  {
    id: "almond-canele",
    name: "Almond Canele",
    description: "French-style, crisp shell, soft centre",
    price: 130,
    category: "food-snacks",
    tags: ["Vegetarian"],
    visible: true,
    sortOrder: 6,
  },
  {
    id: "cheese-toast",
    name: "Cheese Toast",
    description: "Sourdough, aged cheddar, dijon",
    price: 160,
    category: "food-snacks",
    tags: ["Vegetarian"],
    visible: true,
    sortOrder: 7,
  },
  {
    id: "cookie-day",
    name: "Cookie of the Day",
    description: "Rotates daily, ask the bar",
    price: 90,
    category: "food-snacks",
    tags: ["New"],
    visible: true,
    sortOrder: 8,
  },
  {
    id: "bun-maska-cutting-chai",
    name: "Bun Maska + Cutting Chai",
    description: "Freshly served, ask the bar for details",
    price: 0,
    category: "food-snacks",
    image: "/menu-items/New-addon/Nibbles/Bun%20Maska%20%2B%20Cutting%20Chai.png",
    tags: ["New"],
    visible: true,
    sortOrder: 9,
  },
  {
    id: "usco-bun-maska",
    name: "Usco Bun Maska",
    description: "Freshly served, ask the bar for details",
    price: 0,
    category: "food-snacks",
    image: "/menu-items/New-addon/Nibbles/Usco%20Bun%20Maska.png",
    tags: ["New"],
    visible: true,
    sortOrder: 11,
  },
  {
    id: "veg-toast",
    name: "Veg Toast",
    description: "Freshly served, ask the bar for details",
    price: 0,
    category: "food-snacks",
    image: "/menu-items/New-addon/Nibbles/Veg%20Toast.png",
    tags: ["New"],
    visible: true,
    sortOrder: 12,
  },
  {
    id: "salted-lassi",
    name: "Salted Lassi",
    description: "Freshly served, ask the bar for details",
    price: 0,
    category: "usco-specials",
    image: "/menu-items/New-addon/USCO%20Specials/Salted%20Lassi.png",
    tags: ["New"],
    visible: true,
    sortOrder: 8,
  },
  {
    id: "sweet-lassi",
    name: "Sweet Lassi",
    description: "Freshly served, ask the bar for details",
    price: 0,
    category: "usco-specials",
    image: "/menu-items/New-addon/USCO%20Specials/Sweet%20Lassi.png",
    tags: ["New"],
    visible: true,
    sortOrder: 9,
  },
  {
    id: "gelato-vanilla-bean",
    name: "Vanilla Bean Gelato",
    description: "Single scoop, smooth and slow-melted",
    price: 180,
    category: "gelato",
    tags: ["Vegetarian"],
    visible: true,
    sortOrder: 1,
  },
  {
    id: "gelato-dark-chocolate",
    name: "Dark Chocolate Gelato",
    description: "Single scoop, deep cocoa finish",
    price: 190,
    category: "gelato",
    tags: ["Vegetarian"],
    visible: true,
    sortOrder: 2,
  },
  {
    id: "seasonal-1",
    name: "Seasonal Item 1",
    description: "Added by admin each month",
    price: 0,
    category: "seasonal",
    tags: [],
    visible: true,
    sortOrder: 1,
  },
  {
    id: "seasonal-2",
    name: "Seasonal Item 2",
    description: "Added by admin each month",
    price: 0,
    category: "seasonal",
    tags: [],
    visible: true,
    sortOrder: 2,
  },
];

export type HomeOfferingStripItem = {
  id: string;
  name: string;
  image: string;
  href: string;
};

export const homeOfferingStripItems: HomeOfferingStripItem[] = [
  {
    id: "espresso",
    name: "Espresso",
    image: "/showflow/espresso.png",
    href: "/menu",
  },
  {
    id: "americano",
    name: "Americano",
    image: "/showflow/americano.png",
    href: "/menu",
  },
  {
    id: "shakerato",
    name: "Shakerato",
    image: "/showflow/shakerato.png",
    href: "/menu",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    image: "/showflow/cappuccino.png",
    href: "/menu",
  },
  {
    id: "hot-latte",
    name: "Hot Latte",
    image: "/showflow/hot-latte.png",
    href: "/menu",
  },
  {
    id: "hot-matcha",
    name: "Hot Matcha",
    image: "/showflow/hot-matcha.png",
    href: "/menu",
  },
  {
    id: "masala-chai",
    name: "Masala Chai",
    image: "/showflow/masala-chai.png",
    href: "/menu",
  },
  {
    id: "croissant-with-butter",
    name: "Croissant With Butter",
    image: "/showflow/croissant-with-butter.png",
    href: "/menu",
  },
  {
    id: "iced-matcha-latte",
    name: "Iced Matcha Latte",
    image: "/showflow/iced-matcha-latte.png",
    href: "/menu",
  },
  {
    id: "vietnamese-cold-coffee",
    name: "Vietnamese Cold Coffee",
    image: "/showflow/vietnamese-cold-coffee.png",
    href: "/menu",
  },
  {
    id: "chilli-cheese-toast",
    name: "Chilli Cheese Toast",
    image: "/showflow/chilli-cheese-toast.png",
    href: "/menu",
  },
];

export type GalleryCategory =
  | "all"
  | "space"
  | "brews"
  | "bar"
  | "people";

export const galleryTabs: { key: GalleryCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "space", label: "The Space" },
  { key: "brews", label: "The Brews" },
  { key: "bar", label: "Behind the Bar" },
  { key: "people", label: "People & Quiet" },
];

export type GalleryItem = {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "all">;
  caption: string;
  alt: string;
  image: string;
  tall?: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Facade",
    category: "space",
    caption: "The narrow door, before the first sip.",
    alt: "USCO cafe exterior along a quiet lane",
    image: getFrameAssetUrl(3),
    tall: true,
  },
  {
    id: "gallery-2",
    title: "Window light",
    category: "space",
    caption: "Warm glass, pale walls, nothing loud.",
    alt: "Sunlight across a pale cafe interior",
    image: getFrameAssetUrl(28),
  },
  {
    id: "gallery-3",
    title: "Milk line",
    category: "brews",
    caption: "A cup finished just before the foam settles.",
    alt: "Close detail of a prepared milk coffee",
    image: getFrameAssetUrl(58),
  },
  {
    id: "gallery-4",
    title: "Behind the bar",
    category: "bar",
    caption: "Quiet movement, measured hands.",
    alt: "A bar counter prepared for service",
    image: getFrameAssetUrl(77),
    tall: true,
  },
  {
    id: "gallery-5",
    title: "Afternoon",
    category: "people",
    caption: "The kind of table where time goes missing.",
    alt: "A quiet seating corner in the afternoon",
    image: getFrameAssetUrl(87),
  },
  {
    id: "gallery-6",
    title: "Counter study",
    category: "bar",
    caption: "Ceramic, brass, steam, and a list in pencil.",
    alt: "Objects arranged across the cafe counter",
    image: getFrameAssetUrl(102),
  },
  {
    id: "gallery-7",
    title: "The pour",
    category: "brews",
    caption: "One slow pour can change the room.",
    alt: "Coffee preparation detail near a service area",
    image: getFrameAssetUrl(114),
  },
  {
    id: "gallery-8",
    title: "Quiet company",
    category: "people",
    caption: "Staying longer than planned is common here.",
    alt: "A quiet table setting intended for lingering",
    image: getFrameAssetUrl(118),
    tall: true,
  },
];

export const frameStrip = [0, 16, 33, 52, 71, 89, 104, 118].map((index) => ({
  index,
  image: getFrameAssetUrl(index),
}));

export const pillars = [
  {
    title: "The Brew",
    line: "Hand-pulled, never rushed",
    icon: "cup",
  },
  {
    title: "The Space",
    line: "Quiet corners for restless minds",
    icon: "leaf",
  },
  {
    title: "The Ritual",
    line: "Same cup. Different you, every time.",
    icon: "clock",
  },
];

export const findUs = {
  addressLines: [
    "Shop Number 4, Shahpur Jat",
    "Siri Fort",
    "New Delhi, Delhi 110049",
  ],
  hours: [
    "Daily              10:00 am - 8:00 pm",
    "Upstairs stays quieter for long reads",
    "Best to verify on Instagram before heading over",
  ],
  instagram: "@uscocafe",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.3424860495943!2d77.2164567!3d28.547473399999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce34ee3b5c2d5%3A0xc861a88ed99ee032!2sUSCO%20CAFE!5e1!3m2!1sen!2sin!4v1777708200413!5m2!1sen!2sin",
};

// Use the Google Business Profile "Get more reviews" link when possible.
// Fallback format: https://search.google.com/local/writereview?placeid=PLACE_ID
// Users still need to be signed into Google and submit the review manually.
export const googleReviewUrl = "https://g.page/r/CTLgntmOqGHIEBM/review";

export const googleReviewCta = {
  href: googleReviewUrl,
  ratingLabel: "4.7 on Google",
  visitorLabel: "139+ happy visitors",
};

export const adminStats = {
  totalMenuItems: menuItems.length,
  hiddenItems: menuItems.filter((item) => !item.visible).length,
  galleryPhotos: galleryItems.length,
  updatedAt: "May 1, 2026 / 8:15 PM",
};

export const priceChangeLog = [
  ["May 1, 2026 / 9:04 AM", "Flat White", "170 -> 180", "owner@usco.cafe"],
  ["Apr 27, 2026 / 6:48 PM", "USCO Signature Latte", "210 -> 220", "owner@usco.cafe"],
  ["Apr 17, 2026 / 11:22 AM", "Hojicha Tonic", "180 -> 190", "owner@usco.cafe"],
];

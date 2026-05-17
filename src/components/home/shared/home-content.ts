export type HomeTeaserCard = {
  href: string;
  title: string;
  image: string;
  blurb: string;
};

export const homeIntroContent = {
  title: "Somewhere between your first sip and your last thought.",
  body: "Visit USCO Cafe in Shahpur Jat, New Delhi for coffee, toast, quiet cafe moments, warm natural light, and a cozy work-friendly space.",
};

export const desktopTeaserCards: HomeTeaserCard[] = [
  {
    href: "/menu",
    title: "Menu",
    image: "/media/desktop/menu-cover.png",
    blurb: "Carefully chosen. Quietly served.",
  },
  {
    href: "/find-us",
    title: "Find Us",
    image: "/media/desktop/find-us-card.png",
    blurb: "A quiet lane, warm light, and a place worth finding.",
  },
  {
    href: "/gallery",
    title: "Gallery",
    image: "/media/desktop/gallery-card.jpeg",
    blurb: "Warm corners, still frames, small rituals.",
  },
];

export const phoneTeaserCards: HomeTeaserCard[] = [
  {
    href: "/menu",
    title: "Menu",
    image: "/media/phone/menu-cover.png",
    blurb: "Carefully chosen. Quietly served.",
  },
  {
    href: "/find-us",
    title: "Find Us",
    image: "/media/phone/find-us-card.png",
    blurb: "A quiet lane, warm light, and a place worth finding.",
  },
  {
    href: "/gallery",
    title: "Gallery",
    image: "/media/phone/gallery-card.png",
    blurb: "Warm corners, still frames, small rituals.",
  },
];

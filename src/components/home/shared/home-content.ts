export type HomeTeaserCard = {
  href: string;
  title: string;
  image: string;
  blurb: string;
};

export const homeIntroContent = {
  title: "Somewhere between your first sip and your last thought.",
  body: "USCO is a small place that asks very little of you. Sit. Breathe. Let the coffee do the rest.",
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

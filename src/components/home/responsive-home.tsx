"use client";

import { useEffect, useState } from "react";
import DesktopHome from "@/components/home/desktop/DesktopHome";
import PhoneHome from "@/components/home/phone/PhoneHome";

export function ResponsiveHome() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  if (isDesktop === null) {
    return null;
  }

  return isDesktop ? <DesktopHome /> : <PhoneHome />;
}

"use client";

import { useEffect, useState, type ComponentType } from "react";

export function ResponsiveHome() {
  const [HomeComponent, setHomeComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    const media = window.matchMedia("(min-width: 768px)");
    const update = async () => {
      if (media.matches) {
        const desktopModule = await import("@/components/home/desktop/DesktopHome");
        if (!cancelled) {
          setHomeComponent(() => desktopModule.default);
        }
        return;
      }

      const phoneModule = await import("@/components/home/phone/PhoneHome");
      if (!cancelled) {
        setHomeComponent(() => phoneModule.default);
      }
    };

    const handleChange = () => {
      void update();
    };

    void update();
    media.addEventListener("change", handleChange);

    return () => {
      cancelled = true;
      media.removeEventListener("change", handleChange);
    };
  }, []);

  if (!HomeComponent) {
    return null;
  }

  return <HomeComponent />;
}

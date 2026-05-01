import { MenuTabs } from "@/components/menu-tabs";
import { SectionIntro } from "@/components/section-intro";
import { SiteShell } from "@/components/site-shell";
import { getMenuItems } from "@/lib/site-content";

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  return (
    <SiteShell currentPath="/menu">
      <section className="px-4 pb-24 pt-18 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Menu"
            title="Carefully chosen. Quietly served."
            body="Our menu changes with the season, but the care never does."
          />
          <div className="mt-16">
            <MenuTabs items={menuItems} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

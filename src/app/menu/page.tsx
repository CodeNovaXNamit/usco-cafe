import { MenuTabs } from "@/components/menu-tabs";
import { SectionIntro } from "@/components/section-intro";
import { SiteShell } from "@/components/site-shell";
import { getMenuItems } from "@/lib/site-content";

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  return (
    <SiteShell currentPath="/menu">
      <section className="inner-page-surface menu-page-surface">
        <div className="menu-hero">
          <div className="menu-hero-copy">
            <SectionIntro
              eyebrow="Menu"
              title="Carefully chosen. Quietly served."
              body="A softer menu page, built around cream ceramics, matcha air, and the actual servings waiting at the counter."
              align="left"
            />
            <div className="menu-hero-facts">
              <span>Freshly Prepared</span>
              <span>Soft Cream Tones</span>
              <span>Prices Stay Scannable</span>
            </div>
          </div>

          <div className="menu-hero-note grain">
            <p className="home-section-kicker">Menu Note</p>
            <h3>
              Matcha, cream,
              <br />
              toasted edges.
            </h3>
            <p>Every cup and bite is plated to feel calm, warm, and quietly satisfying.</p>
          </div>
        </div>

        <MenuTabs items={menuItems} />
      </section>
    </SiteShell>
  );
}

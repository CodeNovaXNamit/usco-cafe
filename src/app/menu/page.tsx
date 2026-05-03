import { MenuTabs } from "@/components/menu-tabs";
import { SectionIntro } from "@/components/section-intro";
import { SiteShell } from "@/components/site-shell";
import { getMenuItems } from "@/lib/site-content";

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  return (
    <SiteShell currentPath="/menu">
      <section className="inner-page-surface px-4 pb-18 pt-16 sm:px-6 sm:pb-24 sm:pt-18 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.62fr)] lg:items-end">
            <SectionIntro
              eyebrow="Menu"
              title="Carefully chosen. Quietly served."
              body="A softer menu page, built around cream ceramics, matcha air, and the actual servings waiting at the counter."
              align="left"
            />
            <div className="grain rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(248,246,241,0.90),rgba(232,239,220,0.82))] p-5 shadow-[0_24px_60px_rgba(74,94,56,0.08)] sm:p-6">
              <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-matcha-mid sm:text-[11px]">Menu Note</p>
              <p className="mt-3 font-display text-3xl leading-[1] text-matcha-deep sm:text-4xl">
                Matcha, cream,
                <br />
                toasted edges.
              </p>
              <p className="mt-4 text-sm leading-7 text-charcoal/72 sm:text-base">
                Prices stay scannable. The atmosphere does the rest.
              </p>
            </div>
          </div>
          <div className="mt-16">
            <MenuTabs items={menuItems} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

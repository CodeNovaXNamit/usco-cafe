import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminStats, getMenuItems, getPriceChangeLog } from "@/lib/site-content";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getServerSession } from "@/lib/supabase/server";

export default async function AdminPage() {
  const configured = isSupabaseConfigured();
  const session = await getServerSession();

  if (configured && !session) {
    redirect("/admin/login");
  }

  const [adminStats, menuItems, priceChangeLog] = await Promise.all([
    getAdminStats(),
    getMenuItems(),
    getPriceChangeLog(),
  ]);

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-4 py-10 text-charcoal sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[30px] bg-matcha-deep px-8 py-6 text-white">
          <div>
            <p className="font-display text-4xl">USCO Admin</p>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.26em] text-matcha-light">
              {configured
                ? `Connected to Supabase${session?.user?.email ? ` as ${session.user.email}` : ""}`
                : "Using local fallback content until Supabase env keys are added"}
            </p>
          </div>
          {configured ? (
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="rounded-full border border-white/30 px-5 py-3 font-sans text-xs uppercase tracking-[0.24em]"
              >
                Log Out
              </button>
            </form>
          ) : (
            <Link href="/admin/login" className="rounded-full border border-white/30 px-5 py-3 font-sans text-xs uppercase tracking-[0.24em]">
              Login Setup
            </Link>
          )}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard label="Total menu items" value={String(adminStats.totalMenuItems)} />
          <StatCard label="Hidden items" value={String(adminStats.hiddenItems)} />
          <StatCard label="Gallery photos" value={String(adminStats.galleryPhotos)} />
          <StatCard label="Last updated" value={adminStats.updatedAt} />
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-[30px] border border-matcha-light bg-white p-6 shadow-[0_18px_50px_rgba(74,94,56,0.06)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl text-matcha-deep">Menu Manager</h1>
                <p className="mt-2 text-base text-charcoal/70">
                  Data model matches the brief. Connect these rows to Supabase CRUD routes next.
                </p>
              </div>
              <button className="rounded-full bg-matcha-mid px-4 py-3 font-sans text-xs uppercase tracking-[0.24em] text-white">
                Add item
              </button>
            </div>
            <div className="mt-8 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3">
                <thead className="font-sans text-[11px] uppercase tracking-[0.2em] text-matcha-mid">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Tags</th>
                    <th className="px-4 py-2 text-left">Visible</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.slice(0, 8).map((item) => (
                    <tr key={item.id} className="rounded-2xl bg-[#fbfaf6]">
                      <td className="px-4 py-4 font-display text-2xl text-matcha-deep">{item.name}</td>
                      <td className="px-4 py-4 font-sans text-sm uppercase tracking-[0.16em] text-charcoal/70">
                        {item.category}
                      </td>
                      <td className="px-4 py-4 font-sans text-sm uppercase tracking-[0.16em] text-charcoal/70">
                        ₹{item.price}
                      </td>
                      <td className="px-4 py-4 text-sm text-charcoal/70">
                        {item.tags.join(", ") || "—"}
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-matcha-light px-3 py-1 font-sans text-[11px] uppercase tracking-[0.2em] text-matcha-deep">
                          {item.visible ? "Visible" : "Hidden"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-8">
            <div className="rounded-[30px] border border-matcha-light bg-white p-6 shadow-[0_18px_50px_rgba(74,94,56,0.06)]">
              <h2 className="font-display text-4xl text-matcha-deep">Pricing Manager</h2>
              <div className="mt-6 space-y-3">
                {menuItems.slice(0, 6).map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-2xl bg-[#fbfaf6] px-4 py-3">
                    <span className="font-display text-2xl text-matcha-deep">{item.name}</span>
                    <span className="rounded-full border border-matcha-light px-4 py-2 font-sans text-xs uppercase tracking-[0.24em] text-matcha-mid">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-matcha-light bg-white p-6 shadow-[0_18px_50px_rgba(74,94,56,0.06)]">
              <h2 className="font-display text-4xl text-matcha-deep">Price Log</h2>
              <div className="mt-6 space-y-4">
                {priceChangeLog.map(([timestamp, item, change, by]) => (
                  <div key={`${timestamp}-${item}`} className="rounded-2xl bg-[#fbfaf6] p-4">
                    <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-matcha-mid">{timestamp}</p>
                    <p className="mt-2 font-display text-2xl text-matcha-deep">{item}</p>
                    <p className="mt-1 text-charcoal/75">{change}</p>
                    <p className="mt-1 font-sans text-xs uppercase tracking-[0.18em] text-charcoal/55">{by}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-matcha-light bg-white p-5 shadow-[0_10px_30px_rgba(74,94,56,0.05)]">
      <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-matcha-mid">{label}</p>
      <p className="mt-3 font-display text-3xl text-matcha-deep">{value}</p>
    </div>
  );
}

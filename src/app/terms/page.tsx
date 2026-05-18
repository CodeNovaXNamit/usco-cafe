import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Terms of Use | USCO Cafe",
  description: "Terms of use for USCO Cafe website.",
};

export default function TermsPage() {
  return (
    <SiteShell currentPath="/terms">
      <section className="inner-page-surface">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-10">
          <h1 className="font-display text-4xl text-charcoal sm:text-5xl">Terms of Use</h1>
          <div className="mt-6 space-y-4 text-sm leading-7 text-charcoal/80 sm:text-base">
            <p>
              By using this website, you agree to use it lawfully and not misuse its content or functionality.
            </p>
            <p>
              All branding, text, and media on this site are owned by USCO Cafe unless otherwise noted. Reuse requires
              permission.
            </p>
            <p>
              We may update these terms at any time. Continued use of the website after updates means you accept the
              revised terms.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

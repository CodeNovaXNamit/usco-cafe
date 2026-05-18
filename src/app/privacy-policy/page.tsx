import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | USCO Cafe",
  description: "Privacy policy for USCO Cafe website.",
};

export default function PrivacyPolicyPage() {
  return (
    <SiteShell currentPath="/privacy-policy">
      <section className="inner-page-surface">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-10">
          <h1 className="font-display text-4xl text-charcoal sm:text-5xl">Privacy Policy</h1>
          <div className="mt-6 space-y-4 text-sm leading-7 text-charcoal/80 sm:text-base">
            <p>
              USCO Cafe respects your privacy. We only collect basic information needed to operate this website,
              respond to inquiries, and improve user experience.
            </p>
            <p>
              We may use analytics and standard server logs to understand traffic patterns. We do not sell personal
              information to third parties.
            </p>
            <p>
              If you contact us, your message details may be retained to respond and provide support. You can request
              deletion of your data by contacting us directly.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

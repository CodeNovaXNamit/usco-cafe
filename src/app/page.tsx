import { HomeLoadingGate } from "@/components/home/home-loading-gate";
import { ResponsiveHome } from "@/components/home/responsive-home";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <HomeLoadingGate>
      <SiteShell currentPath="/">
        <ResponsiveHome />
      </SiteShell>
    </HomeLoadingGate>
  );
}

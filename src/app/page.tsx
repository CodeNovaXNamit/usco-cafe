import DesktopHome from "@/components/home/desktop/DesktopHome";
import { HomeLoadingGate } from "@/components/home/home-loading-gate";
import PhoneHome from "@/components/home/phone/PhoneHome";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <HomeLoadingGate>
      <SiteShell currentPath="/">
        <div className="hidden md:block">
          <DesktopHome />
        </div>
        <div className="md:hidden">
          <PhoneHome />
        </div>
      </SiteShell>
    </HomeLoadingGate>
  );
}

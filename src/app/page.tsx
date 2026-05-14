import DesktopHome from "@/components/home/desktop/DesktopHome";
import PhoneHome from "@/components/home/phone/PhoneHome";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <SiteShell currentPath="/">
      <div className="hidden md:block">
        <DesktopHome />
      </div>
      <div className="md:hidden">
        <PhoneHome />
      </div>
    </SiteShell>
  );
}

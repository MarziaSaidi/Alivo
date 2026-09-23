import LeftNav from "./LeftNav";
import MobileNav from "./MobileNav";
import TopBar from "./TopBar";

/**
 * Application shell: left navigation, top operational bar, main content.
 *
 * 216 nav + 24 gutter + 1176 content + 24 gutter = 1440 exactly.
 * Above 1600 the content steps to 1256 so ultra-wide dead space does not
 * grow without bound; the rail stays fixed because it is secondary.
 * (layout §3)
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <LeftNav />
      <div className="min-w-0 flex-1">
        <TopBar />
        <MobileNav />
        <main className="px-6 pb-24">
          <div className="mx-auto max-w-[1176px] wide:max-w-[1256px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

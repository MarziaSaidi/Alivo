import { decisionsWaiting } from "@/lib/data";

/**
 * Global operational bar — 48px, utility chrome.
 *
 * Deliberately subordinate to the operating statement beneath it. No shadow
 * even when content scrolls under it; a hairline does the job. (component §7)
 *
 * Its contents are constrained to the same measure as the page content, so
 * the bar does not introduce a fourth alignment axis on wide viewports.
 * (layout §4 — three axes only)
 */
export default function TopBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-border-default bg-canvas">
      <div className="px-6">
        <div className="mx-auto flex h-12 max-w-[1176px] items-center gap-6 wide:max-w-[1256px]">
          <div className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[13px] text-text-tertiary">
            <span aria-hidden>&bull;</span>
            <span>Running</span>
            <span aria-hidden>/</span>
            <span className="tnum text-text-secondary">
              {decisionsWaiting} need you
            </span>
          </div>

          <div className="ml-auto flex items-center gap-6">
            <input
              type="search"
              placeholder="Search customer, address, phone"
              aria-label="Search customer, address, phone"
              className="hidden h-8 w-[264px] rounded-[6px] split:w-[288px] border border-border-input bg-surface-input px-3 text-[14px] text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none sm:block"
            />
            <button
              type="button"
              className="-mx-1 flex h-7 items-center whitespace-nowrap rounded-[6px] px-1 text-[13px] text-text-tertiary hover:text-text-primary"
            >
              Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

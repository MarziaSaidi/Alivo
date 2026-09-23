import Link from "next/link";
import { traces } from "@/lib/activity";
import { usd } from "@/lib/data";

/**
 * ACTIVITY INDEX — a register, not a feed.
 *
 * Activity is always entered with a scope already applied. There is no
 * unscoped feed, so this index only names the customers with a trace and
 * gets out of the way. (ux-spec §7)
 *
 * Reading measure 760, matching the traces it opens, so moving from the
 * index into a trace does not shift the content axis. (layout §4, §22)
 *
 * Row grammar is the shared one — 42px, border.quiet divider, 16 column
 * gap, identity first and left, value right and tabular, description the
 * only column that truncates. It is written locally rather than reusing
 * `Row`, because these rows navigate with a real link and `Row`'s
 * interactive variant is a button. (component §6)
 */
const ROW =
  "flex w-full flex-wrap items-baseline gap-x-4 gap-y-1 border-b " +
  "border-border-quiet py-[10px] text-left sm:flex-nowrap";

export default function ActivityIndexPage() {
  return (
    <div className="mx-auto max-w-[760px] pt-6">
      <h1 className="text-[18px] font-[550] leading-[1.3] tracking-[-0.01em] text-text-primary">
        Activity
      </h1>
      <p className="mt-1 max-w-[58ch] text-[14px] leading-[1.55] text-text-secondary">
        Activity is always scoped to a customer or a job. Open one to see
        exactly what Alivo did, in what order, and whether it worked.
      </p>

      {/* Opening rule only — no column header. Two rows do not need one, and
          Mission Control's queue sets the precedent. (component §6) */}
      <ul className="mt-8 border-t border-border-default">
        {traces.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/activity/${t.slug}`}
              className={`${ROW} rounded-[6px] transition-colors duration-75 hover:bg-surface-hover`}
            >
              <span className="shrink-0 truncate text-[14px] text-text-primary sm:w-[132px]">
                {t.name}
              </span>
              <span className="tnum shrink-0 text-[14px] text-text-secondary sm:w-[72px] sm:text-right">
                {t.value !== undefined ? usd(t.value) : ""}
              </span>
              <span
                title={t.job}
                className="min-w-0 basis-full text-[14px] text-text-secondary sm:basis-auto sm:flex-1 sm:truncate"
              >
                {t.job}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

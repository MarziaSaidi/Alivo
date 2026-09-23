/**
 * Register label — names a register, never read as content.
 *
 * Typography role 5: 12 / 600 / +0.06em / uppercase via CSS, so assistive
 * technology, search and copy-paste receive natural sentence-case text.
 * Uppercase is capped at three words and never used for a heading that is
 * itself the centre of gravity. (typography §6)
 *
 * Extracted because it had 13 usages and 3 duplicate local definitions.
 */
export default function Label({
  children,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  as?: "h2" | "h3" | "span" | "p";
}) {
  return (
    <Tag className="text-[12px] font-semibold uppercase tracking-[0.06em] text-text-tertiary">
      {children}
    </Tag>
  );
}

/** Route placeholder. These screens are designed but not yet built. */
export default function Placeholder({
  title,
  note,
}: {
  title: string;
  note: string;
}) {
  return (
    <div className="max-w-[560px] pt-10">
      <h1 className="text-[22px] tracking-[-0.01em] text-neutral-900">
        {title}
      </h1>
      <p className="mt-2 text-[13px] leading-[1.6] text-neutral-500">{note}</p>
      <p className="mt-6 text-[13px] text-neutral-400">Not built yet.</p>
    </div>
  );
}

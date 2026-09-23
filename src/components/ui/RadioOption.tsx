/**
 * Choose, without sending.
 *
 * No card, no fill, no border around a selected option — selection is a radio
 * and a label. A selected option and a committed decision share no visual
 * property: committed replaces the action area with a statement.
 * (component §5, §14)
 */
export default function RadioOption({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex h-8 cursor-pointer items-center gap-2 text-[14px]">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-action-primary"
      />
      <span
        className={
          checked ? "font-medium text-text-primary" : "text-text-secondary"
        }
      >
        {children}
      </span>
    </label>
  );
}

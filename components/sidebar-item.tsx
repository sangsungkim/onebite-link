import Link from "next/link";

export default function SidebarItem({
  label,
  count,
  href,
  active = false,
}: {
  label: string;
  count: number;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`item-hover flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-sm text-[var(--text)] ${
        active ? "bg-[var(--hover-bg)] font-semibold" : ""
      }`}
    >
      <span>{label}</span>
      <span className="text-[13px] text-[var(--text-sub)]">{count}</span>
    </Link>
  );
}

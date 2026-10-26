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
      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 ${
        active ? "bg-zinc-100 font-semibold dark:bg-zinc-900" : ""
      }`}
    >
      <span>{label}</span>
      <span className="text-xs text-zinc-500">{count}</span>
    </Link>
  );
}

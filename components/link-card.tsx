import type { Link } from "@/lib/mock-data";

export default function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 transition-shadow hover:shadow-md dark:border-zinc-800"
    >
      <h3 className="font-semibold">{link.title}</h3>
      <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
        {link.description}
      </p>
      <span className="truncate text-xs text-zinc-500">{link.url}</span>
    </a>
  );
}

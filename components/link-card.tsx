import type { Link } from "@/lib/mock-data";

export default function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col gap-2 rounded-[8px] border border-[var(--border)] bg-[var(--card)] p-4"
    >
      <h3 className="font-semibold leading-[1.3] text-[var(--text)]">
        {link.title}
      </h3>
      <p className="line-clamp-2 text-sm leading-[1.4] text-[var(--text-sub)]">
        {link.description}
      </p>
      <span className="truncate text-[13px] text-[var(--accent-text)]">
        {link.url}
      </span>
    </a>
  );
}

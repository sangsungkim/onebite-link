import type { Folder, Link } from "@/lib/mock-data";
import DeleteLinkButton from "./delete-link-button";
import EditLinkButton from "./edit-link-button";

export default function LinkCard({
  link,
  folders,
}: {
  link: Link;
  folders: Folder[];
}) {
  return (
    <div className="group/card relative">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex h-full flex-col gap-2 overflow-hidden rounded-[8px] border border-[var(--border)] bg-[var(--card)] p-4"
      >
        {link.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.thumbnail}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="-mx-4 -mt-4 mb-1 aspect-[1.91/1] w-[calc(100%+2rem)] max-w-none bg-[var(--hover-bg)] object-cover"
          />
        )}
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
      <EditLinkButton link={link} folders={folders} />
      <DeleteLinkButton linkId={link.id} linkTitle={link.title} />
    </div>
  );
}

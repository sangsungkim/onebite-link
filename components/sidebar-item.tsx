import Link from "next/link";
import DeleteFolderButton from "./delete-folder-button";

export default function SidebarItem({
  label,
  count,
  href,
  active = false,
  folderId,
}: {
  label: string;
  count: number;
  href: string;
  active?: boolean;
  folderId?: string;
}) {
  return (
    <div className="folder-row relative">
      <Link
        href={href}
        className={`item-hover flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-sm text-[var(--text)] ${
          active ? "bg-[var(--hover-bg)] font-semibold" : ""
        }`}
      >
        <span>{label}</span>
        <span className="folder-count mr-1 text-[13px] text-[var(--text-sub)]">
          {count}
        </span>
      </Link>
      {folderId && (
        <DeleteFolderButton folderId={folderId} folderName={label} />
      )}
    </div>
  );
}

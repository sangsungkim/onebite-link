import type { Folder } from "@/lib/mock-data";
import SidebarItem from "./sidebar-item";

export default function Sidebar({
  folders,
  totalCount,
  activeFolderId,
}: {
  folders: Folder[];
  totalCount: number;
  activeFolderId?: string;
}) {
  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] p-3">
      <nav className="flex flex-col gap-1">
        <SidebarItem
          label="All"
          count={totalCount}
          href="/"
          active={activeFolderId === undefined}
        />
        <div className="my-2 border-t border-[var(--border)]" />
        {folders.map((folder) => (
          <SidebarItem
            key={folder.id}
            folderId={folder.id}
            label={folder.name}
            count={folder.count}
            href={`/folder/${folder.id}`}
            active={folder.id === activeFolderId}
          />
        ))}
      </nav>
    </aside>
  );
}

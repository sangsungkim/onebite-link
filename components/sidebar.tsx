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
    <aside className="w-56 shrink-0 border-r border-zinc-200 p-3 dark:border-zinc-800">
      <nav className="flex flex-col gap-1">
        <SidebarItem
          label="All"
          count={totalCount}
          href="/"
          active={activeFolderId === undefined}
        />
        <div className="my-2 border-t border-zinc-200 dark:border-zinc-800" />
        {folders.map((folder) => (
          <SidebarItem
            key={folder.id}
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

import { Suspense } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import SidebarItem from "./sidebar-item";

async function SidebarItems({ activeFolderId }: { activeFolderId?: string }) {
  const supabase = createClient(await cookies());
  const [foldersResult, linksResult] = await Promise.all([
    supabase
      .from("folders")
      .select("id, name")
      .order("created_at", { ascending: true })
      .order("id", { ascending: true }),
    supabase.from("links").select("folder_id"),
  ]);
  if (foldersResult.error) throw new Error(foldersResult.error.message);
  if (linksResult.error) throw new Error(linksResult.error.message);

  const folders = foldersResult.data;
  const links = linksResult.data;

  return (
    <>
      <SidebarItem
        label="All"
        count={links.length}
        href="/"
        active={activeFolderId === undefined}
      />
      <div className="my-2 border-t border-[var(--border)]" />
      {folders.map((folder) => {
        const id = String(folder.id);
        return (
          <SidebarItem
            key={id}
            folderId={id}
            label={folder.name}
            count={links.filter((link) => link.folder_id === folder.id).length}
            href={`/folder/${id}`}
            active={id === activeFolderId}
          />
        );
      })}
    </>
  );
}

export default function Sidebar({
  activeFolderId,
}: {
  activeFolderId?: string;
}) {
  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] p-3">
      <nav className="flex flex-col gap-1">
        <Suspense fallback={null}>
          <SidebarItems activeFolderId={activeFolderId} />
        </Suspense>
      </nav>
    </aside>
  );
}

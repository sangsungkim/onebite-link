import { Suspense } from "react";
import { signOut } from "@/app/actions";
import { createRequestClient } from "@/utils/supabase/server";
import SidebarItem from "./sidebar-item";

async function SidebarItems({ activeFolderId }: { activeFolderId?: string }) {
  const supabase = await createRequestClient();
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
    <aside className="flex w-56 shrink-0 flex-col border-r border-[var(--border)] p-3">
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        <Suspense fallback={null}>
          <SidebarItems activeFolderId={activeFolderId} />
        </Suspense>
      </nav>
      <form action={signOut} className="mt-2 border-t border-[var(--border)] pt-2">
        <button
          type="submit"
          className="item-hover w-full rounded-[6px] px-3 py-2 text-left text-sm text-[var(--text-sub)]"
        >
          로그아웃
        </button>
      </form>
    </aside>
  );
}

import { Suspense } from "react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import AppShell from "@/components/app-shell";
import LinkGrid from "@/components/link-grid";
import { getFolders, getLinks } from "@/lib/data";
import { createClient } from "@/utils/supabase/server";

export default function FolderPage({ params }: PageProps<"/folder/[id]">) {
  return (
    <Suspense
      fallback={
        <AppShell>
          <LinkGrid links={[]} />
        </AppShell>
      }
    >
      <FolderContent params={params} />
    </Suspense>
  );
}

async function FolderContent({
  params,
}: {
  params: PageProps<"/folder/[id]">["params"];
}) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const supabase = createClient(await cookies());
  const { data: folder, error } = await supabase
    .from("folders")
    .select("id")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!folder) notFound();

  const [links, folders] = await Promise.all([getLinks(id), getFolders()]);

  return (
    <AppShell activeFolderId={id}>
      <LinkGrid links={links} folders={folders} />
    </AppShell>
  );
}

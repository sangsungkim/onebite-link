import { Suspense } from "react";
import { notFound } from "next/navigation";
import AppShell from "@/components/app-shell";
import LinkGrid from "@/components/link-grid";
import { folders, links } from "@/lib/mock-data";

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
  if (!folders.some((folder) => folder.id === id)) notFound();

  return (
    <AppShell activeFolderId={id}>
      <LinkGrid links={links.filter((link) => link.folderId === id)} />
    </AppShell>
  );
}

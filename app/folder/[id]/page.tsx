import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import AppShell from "@/components/app-shell";
import LinkGrid from "@/components/link-grid";
import { getFolders, getLinks } from "@/lib/data";
import { createUserClient } from "@/utils/supabase/server";

export async function generateMetadata({
  params,
}: PageProps<"/folder/[id]">): Promise<Metadata> {
  let name = "폴더";
  try {
    const { id } = await params;
    if (/^\d+$/.test(id)) {
      const { supabase, userId } = await createUserClient();
      const { data } = await supabase
        .from("folders")
        .select("name")
        .eq("id", id)
        .eq("user_id", userId)
        .maybeSingle();
      if (data?.name) name = data.name;
    }
  } catch {
    // 인증 실패 등은 페이지 본문에서 처리하므로 기본 제목 사용
  }
  const title = `${name} | 한입 링크`;
  return {
    title: name,
    openGraph: { title },
    twitter: { title },
  };
}

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

  const { supabase, userId } = await createUserClient();
  const { data: folder, error } = await supabase
    .from("folders")
    .select("id")
    .eq("id", id)
    .eq("user_id", userId)
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

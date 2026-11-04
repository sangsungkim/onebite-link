import type { Metadata } from "next";
import { Suspense } from "react";
import AppShell from "@/components/app-shell";
import NewLinkForm from "@/components/new-link-form";
import { getFolders } from "@/lib/data";

export const metadata: Metadata = {
  title: "링크 추가",
  description: "새 링크를 북마크에 추가하세요.",
  openGraph: { title: "링크 추가 | 한입 링크" },
  twitter: { title: "링크 추가 | 한입 링크" },
};

export default function NewLinkPage() {
  return (
    <AppShell>
      <section className="flex-1 overflow-y-auto p-6">
        <Suspense fallback={null}>
          <NewLinkContent />
        </Suspense>
      </section>
    </AppShell>
  );
}

async function NewLinkContent() {
  const folders = await getFolders();
  return <NewLinkForm folders={folders} />;
}

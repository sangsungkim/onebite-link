import type { Metadata } from "next";
import { Suspense } from "react";
import AppShell from "@/components/app-shell";
import LinkGrid from "@/components/link-grid";
import { getFolders, getLinks } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "한입 링크 - 북마크 서비스" },
  description: "링크를 폴더별로 모아 관리하는 북마크 서비스",
  openGraph: { title: "한입 링크 - 북마크 서비스" },
  twitter: { title: "한입 링크 - 북마크 서비스" },
};

export default function Home() {
  return (
    <AppShell>
      <Suspense fallback={<LinkGrid links={[]} />}>
        <AllLinks />
      </Suspense>
    </AppShell>
  );
}

async function AllLinks() {
  const [links, folders] = await Promise.all([getLinks(), getFolders()]);
  return <LinkGrid links={links} folders={folders} />;
}

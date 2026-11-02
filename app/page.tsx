import { Suspense } from "react";
import AppShell from "@/components/app-shell";
import LinkGrid from "@/components/link-grid";
import { getFolders, getLinks } from "@/lib/data";

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

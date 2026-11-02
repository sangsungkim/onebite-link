import { Suspense } from "react";
import AppShell from "@/components/app-shell";
import NewLinkForm from "@/components/new-link-form";
import { getFolders } from "@/lib/data";

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

import AppShell from "@/components/app-shell";
import NewLinkForm from "@/components/new-link-form";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <AppShell>
      <section className="flex-1 overflow-y-auto p-6">
        <NewLinkForm folders={folders} />
      </section>
    </AppShell>
  );
}

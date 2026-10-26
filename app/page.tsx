import AppShell from "@/components/app-shell";
import LinkGrid from "@/components/link-grid";
import { links } from "@/lib/mock-data";

export default function Home() {
  return (
    <AppShell>
      <LinkGrid links={links} />
    </AppShell>
  );
}

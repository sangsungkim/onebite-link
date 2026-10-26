import { folders, type Link } from "@/lib/mock-data";
import LinkCard from "./link-card";

export default function LinkGrid({ links }: { links: Link[] }) {
  return (
    <section className="grid flex-1 grid-cols-1 content-start gap-4 overflow-y-auto p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} folders={folders} />
      ))}
    </section>
  );
}

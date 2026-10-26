import { folders, links } from "@/lib/mock-data";
import Header from "./header";
import Sidebar from "./sidebar";

export default function AppShell({
  children,
  activeFolderId,
}: {
  children: React.ReactNode;
  activeFolderId?: string;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar
          folders={folders}
          totalCount={links.length}
          activeFolderId={activeFolderId}
        />
        {children}
      </div>
    </div>
  );
}

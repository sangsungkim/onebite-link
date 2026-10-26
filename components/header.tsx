import Logo from "./logo";
import NewFolderButton from "./new-folder-button";
import NewLinkButton from "./new-link-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/80 px-4 backdrop-blur-[8px]">
      <Logo />
      <div className="flex items-center gap-2">
        <NewFolderButton />
        <NewLinkButton />
      </div>
    </header>
  );
}

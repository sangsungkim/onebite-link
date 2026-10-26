import Logo from "./logo";
import NewLinkButton from "./new-link-button";

export default function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
      <Logo />
      <NewLinkButton />
    </header>
  );
}

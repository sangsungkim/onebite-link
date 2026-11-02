import { createLink } from "@/app/actions";
import type { FolderOption } from "@/lib/data";
import FolderSelect from "./folder-select";
import LinkInput from "./link-input";
import NewLinkSubmitButton from "./new-link-submit-button";

export default function NewLinkForm({ folders }: { folders: FolderOption[] }) {
  return (
    <form
      action={createLink}
      className="flex max-w-xl flex-col gap-4 rounded-[8px] border border-[var(--border)] bg-[var(--card)] p-6">
      <h1 className="text-[30px] font-bold leading-[1.2] text-[var(--text)]">
        새 링크
      </h1>
      <LinkInput />
      <FolderSelect folders={folders} />
      <NewLinkSubmitButton />
    </form>
  );
}

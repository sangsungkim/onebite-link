import { createLink } from "@/app/actions";
import type { Folder } from "@/lib/mock-data";
import FolderSelect from "./folder-select";
import LinkInput from "./link-input";

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  return (
    <form
      action={createLink}
      className="flex max-w-xl flex-col gap-4 rounded-[8px] border border-[var(--border)] bg-[var(--card)] p-6">
      <h1 className="text-[30px] font-bold leading-[1.2] text-[var(--text)]">
        새 링크
      </h1>
      <LinkInput />
      <FolderSelect folders={folders} />
      <button
        type="submit"
        className="btn-primary self-end rounded-[6px] px-4 py-2 text-sm text-white"
      >
        저장
      </button>
    </form>
  );
}

import type { Folder } from "@/lib/mock-data";
import FolderSelect from "./folder-select";
import LinkInput from "./link-input";

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  return (
    <form className="flex max-w-xl flex-col gap-4">
      <LinkInput />
      <FolderSelect folders={folders} />
      <button
        type="submit"
        className="self-end rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        저장
      </button>
    </form>
  );
}

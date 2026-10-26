import type { Folder } from "@/lib/mock-data";

export default function FolderSelect({ folders }: { folders: Folder[] }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      폴더
      <select
        name="folderId"
        defaultValue=""
        className="rounded-md border border-zinc-300 bg-background px-3 py-2 font-normal outline-none focus:border-foreground dark:border-zinc-700"
      >
        <option value="">폴더 선택</option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </label>
  );
}

import type { Folder } from "@/lib/mock-data";

export default function FolderSelect({ folders }: { folders: Folder[] }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]">
      폴더
      <select
        name="folderId"
        defaultValue=""
        required
        className="field rounded-[6px] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
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

"use client";

import { useRef } from "react";
import { updateLink } from "@/app/actions";
import type { Folder, Link } from "@/lib/mock-data";

const fieldClass =
  "field rounded-[6px] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]";

export default function EditLinkButton({
  link,
  folders,
}: {
  link: Link;
  folders: Folder[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await updateLink(link.id, formData);
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        aria-label={`${link.title} 링크 수정`}
        onClick={() => dialogRef.current?.showModal()}
        className="absolute right-11 top-2 rounded-[6px] border border-[var(--border)] bg-[var(--card)] p-1.5 text-[var(--text-sub)] opacity-0 hover:text-[var(--text)] focus-visible:opacity-100 group-hover/card:opacity-100 group-focus-within/card:opacity-100"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </button>
      <dialog
        ref={dialogRef}
        onClose={() => formRef.current?.reset()}
        className="m-auto w-full max-w-sm rounded-[8px] border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)] backdrop:bg-black/30"
      >
        <form
          ref={formRef}
          action={handleSubmit}
          className="flex flex-col gap-4 p-6"
        >
          <h2 className="text-xl font-semibold leading-[1.3]">링크 수정</h2>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            폴더
            <select
              name="folderId"
              defaultValue={link.folderId}
              required
              className={fieldClass}
            >
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            제목
            <input
              type="text"
              name="title"
              defaultValue={link.title}
              required
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            설명
            <textarea
              name="description"
              defaultValue={link.description}
              rows={3}
              className={`${fieldClass} resize-none`}
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="item-hover rounded-[6px] border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)]"
            >
              취소
            </button>
            <button
              type="submit"
              className="btn-primary rounded-[6px] px-4 py-2 text-sm text-white"
            >
              저장
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

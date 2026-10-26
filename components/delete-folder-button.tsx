"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { deleteFolder } from "@/app/actions";

export default function DeleteFolderButton({
  folderId,
  folderName,
}: {
  folderId: string;
  folderName: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  async function handleDelete() {
    await deleteFolder(folderId);
    dialogRef.current?.close();
    if (window.location.pathname === `/folder/${folderId}`) router.push("/");
  }

  return (
    <>
      <button
        type="button"
        aria-label={`${folderName} 폴더 삭제`}
        onClick={() => dialogRef.current?.showModal()}
        className="delete-btn absolute right-2 top-1/2 -translate-y-1/2 rounded-[4px] p-1 text-[var(--text-sub)] opacity-0"
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
          <path d="M3 6h18" />
          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </button>
      <dialog
        ref={dialogRef}
        className="m-auto w-full max-w-sm rounded-[8px] border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)] backdrop:bg-black/30"
      >
        <div className="flex flex-col gap-4 p-6">
          <h2 className="text-xl font-semibold leading-[1.3]">폴더 삭제</h2>
          <p className="text-sm leading-[1.4] text-[var(--text-sub)]">
            &lsquo;{folderName}&rsquo; 폴더를 정말 삭제할까요? 폴더 안의 링크도
            함께 삭제되며 되돌릴 수 없습니다.
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="item-hover rounded-[6px] border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)]"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-[6px] bg-[var(--error)] px-4 py-2 text-sm text-white hover:opacity-90"
            >
              삭제
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

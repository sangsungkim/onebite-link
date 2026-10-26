"use client";

import { useRef } from "react";
import { createFolder } from "@/app/actions";

export default function NewFolderButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function close() {
    dialogRef.current?.close();
    formRef.current?.reset();
  }

  async function handleSubmit(formData: FormData) {
    await createFolder(formData);
    close();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="item-hover rounded-[6px] border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)]"
      >
        + 새 폴더
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
          <h2 className="text-xl font-semibold leading-[1.3]">새 폴더</h2>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            폴더 이름
            <input
              type="text"
              name="name"
              placeholder="폴더 이름을 입력하세요"
              required
              autoFocus
              className="field rounded-[6px] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
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

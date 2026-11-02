"use client";

import { useFormStatus } from "react-dom";

export default function NewLinkSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary self-end rounded-[6px] px-4 py-2 text-sm text-white disabled:opacity-50"
    >
      {pending ? "저장 중..." : "저장"}
    </button>
  );
}

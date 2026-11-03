"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Toast from "./toast";

const inputClass =
  "field rounded-[6px] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]";
const labelClass =
  "flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]";

function toKoreanError(error: { code?: string; message: string }) {
  switch (error.code) {
    case "same_password":
      return "기존 비밀번호와 다른 비밀번호를 입력해 주세요.";
    case "weak_password":
      return "비밀번호가 너무 약합니다. 6자 이상으로 더 복잡하게 입력해 주세요.";
    case "session_not_found":
    case "session_expired":
    case "bad_jwt":
      return "인증이 만료되었습니다. 비밀번호 찾기를 다시 진행해 주세요.";
  }
  if (error.message.toLowerCase().includes("fetch"))
    return "네트워크 오류가 발생했습니다. 연결을 확인해 주세요.";
  return "비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const closeToast = useCallback(() => setError(null), []);

  const canSubmit = password !== "" && passwordConfirm !== "" && !pending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setPending(true);
    const { error } = await createClient().auth.updateUser({ password });
    setPending(false);

    if (error) {
      setError(toKoreanError(error));
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <>
      {error && <Toast message={error} onClose={closeToast} />}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className={labelClass}>
          새 비밀번호
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="새 비밀번호를 입력하세요"
            autoComplete="new-password"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          새 비밀번호 확인
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="새 비밀번호를 다시 입력하세요"
            autoComplete="new-password"
            className={inputClass}
          />
        </label>
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary rounded-[6px] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          비밀번호 변경
        </button>
      </form>
    </>
  );
}

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
  const msg = error.message.toLowerCase();
  switch (error.code) {
    case "invalid_credentials":
      return "이메일 또는 비밀번호가 올바르지 않습니다.";
    case "email_not_confirmed":
      return "이메일 인증이 완료되지 않았습니다. 메일함을 확인해 주세요.";
    case "over_request_rate_limit":
      return "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.";
    case "user_banned":
      return "이용이 제한된 계정입니다.";
  }
  if (msg.includes("invalid login credentials"))
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  if (msg.includes("fetch"))
    return "네트워크 오류가 발생했습니다. 연결을 확인해 주세요.";
  return "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const closeToast = useCallback(() => setError(null), []);

  const canSubmit = email.trim() !== "" && password !== "" && !pending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setPending(true);
    const { error } = await createClient().auth.signInWithPassword({
      email: email.trim(),
      password,
    });
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
          이메일
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            autoComplete="email"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          비밀번호
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
            className={inputClass}
          />
        </label>
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary rounded-[6px] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          로그인
        </button>
      </form>
    </>
  );
}

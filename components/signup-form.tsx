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
    case "user_already_exists":
    case "email_exists":
      return "이미 가입된 이메일입니다.";
    case "weak_password":
      return "비밀번호가 너무 약합니다. 더 복잡한 비밀번호를 사용해 주세요.";
    case "email_address_invalid":
    case "validation_failed":
      return "올바른 이메일 형식이 아닙니다.";
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.";
    case "signup_disabled":
      return "현재 회원가입이 비활성화되어 있습니다.";
  }
  if (msg.includes("already registered")) return "이미 가입된 이메일입니다.";
  if (msg.includes("password")) return "비밀번호가 올바르지 않습니다. 6자 이상 입력해 주세요.";
  if (msg.includes("fetch")) return "네트워크 오류가 발생했습니다. 연결을 확인해 주세요.";
  return "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const closeToast = useCallback(() => setError(null), []);

  const canSubmit =
    email.trim() !== "" && password !== "" && passwordConfirm !== "" && !pending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setPending(true);
    const { data, error } = await createClient().auth.signUp({
      email: email.trim(),
      password,
    });
    setPending(false);

    if (error) {
      setError(toKoreanError(error));
      return;
    }
    if (!data.session) {
      setError("가입 확인 메일이 발송되었습니다. 이메일을 확인해 주세요.");
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
            autoComplete="new-password"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          비밀번호 확인
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            autoComplete="new-password"
            className={inputClass}
          />
        </label>
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary rounded-[6px] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          회원가입
        </button>
      </form>
    </>
  );
}

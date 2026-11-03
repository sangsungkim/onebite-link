"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Toast from "./toast";

type Message = { text: string; variant: "error" | "success" };

function toKoreanError(error: { code?: string; message: string }) {
  switch (error.code) {
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.";
    case "email_address_invalid":
    case "validation_failed":
      return "올바른 이메일 형식이 아닙니다.";
  }
  if (error.message.toLowerCase().includes("fetch"))
    return "네트워크 오류가 발생했습니다. 연결을 확인해 주세요.";
  return "메일 발송에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function ForgotPasswordForm({
  initialError,
}: {
  initialError?: string;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<Message | null>(
    initialError ? { text: initialError, variant: "error" } : null
  );
  const [pending, setPending] = useState(false);
  const closeToast = useCallback(() => setMessage(null), []);

  const canSubmit = email.trim() !== "" && !pending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setPending(true);
    const { error } = await createClient().auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      }
    );
    setPending(false);

    if (error) {
      setMessage({ text: toKoreanError(error), variant: "error" });
      return;
    }
    setMessage({
      text: "비밀번호 재설정 링크를 이메일로 발송했습니다. 메일함을 확인해 주세요.",
      variant: "success",
    });
  }

  return (
    <>
      {message && (
        <Toast
          message={message.text}
          variant={message.variant}
          onClose={closeToast}
        />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]">
          이메일
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            autoComplete="email"
            className="field rounded-[6px] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
          />
        </label>
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary rounded-[6px] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          비밀번호 리셋 링크 발송
        </button>
      </form>
    </>
  );
}

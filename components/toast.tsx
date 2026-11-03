"use client";

import { useEffect } from "react";

export default function Toast({
  message,
  onClose,
  variant = "error",
}: {
  message: string;
  onClose: () => void;
  variant?: "error" | "success";
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  const color =
    variant === "success"
      ? "border-[var(--success)] text-[var(--text)]"
      : "border-[var(--error)] text-[var(--error)]";

  return (
    <div
      role="alert"
      className={`fixed left-1/2 top-4 z-50 w-[calc(100%-48px)] max-w-[400px] -translate-x-1/2 rounded-[8px] border bg-[var(--card)] px-4 py-3 text-sm ${color}`}
    >
      {message}
    </div>
  );
}

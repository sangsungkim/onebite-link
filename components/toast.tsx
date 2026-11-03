"use client";

import { useEffect } from "react";

export default function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      role="alert"
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-48px)] max-w-[400px] -translate-x-1/2 rounded-[8px] border border-[var(--error)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--error)]"
    >
      {message}
    </div>
  );
}

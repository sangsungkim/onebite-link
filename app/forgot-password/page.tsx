import type { Metadata } from "next";
import { Suspense } from "react";
import AuthCard from "@/components/auth-card";
import ForgotPasswordForm from "@/components/forgot-password-form";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
  description: "가입한 이메일로 비밀번호 재설정 링크를 받아보세요.",
  openGraph: { title: "비밀번호 찾기 | 한입 링크" },
  twitter: { title: "비밀번호 찾기 | 한입 링크" },
};

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <AuthCard
      footerText="비밀번호가 기억나셨나요?"
      footerLinkLabel="로그인"
      footerHref="/login"
    >
      <Suspense fallback={<ForgotPasswordForm />}>
        <Form searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}

async function Form({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <ForgotPasswordForm
      initialError={
        error
          ? "링크가 만료되었거나 올바르지 않습니다. 다시 요청해 주세요."
          : undefined
      }
    />
  );
}

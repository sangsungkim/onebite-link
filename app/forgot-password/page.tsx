import { Suspense } from "react";
import AuthCard from "@/components/auth-card";
import ForgotPasswordForm from "@/components/forgot-password-form";

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

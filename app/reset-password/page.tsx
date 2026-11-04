import type { Metadata } from "next";
import AuthCard from "@/components/auth-card";
import ResetPasswordForm from "@/components/reset-password-form";

export const metadata: Metadata = {
  title: "비밀번호 재설정",
  description: "새 비밀번호를 설정하세요.",
  openGraph: { title: "비밀번호 재설정 | 한입 링크" },
  twitter: { title: "비밀번호 재설정 | 한입 링크" },
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      footerText="로그인 화면으로 돌아가기"
      footerLinkLabel="로그인"
      footerHref="/login"
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}

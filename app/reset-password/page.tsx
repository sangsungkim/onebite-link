import AuthCard from "@/components/auth-card";
import ResetPasswordForm from "@/components/reset-password-form";

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

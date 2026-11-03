import AuthCard from "@/components/auth-card";
import SignupForm from "@/components/signup-form";

export default function SignupPage() {
  return (
    <AuthCard
      footerText="이미 계정이 있으신가요?"
      footerLinkLabel="로그인"
      footerHref="/login"
    >
      <SignupForm />
    </AuthCard>
  );
}

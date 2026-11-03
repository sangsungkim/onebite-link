import AuthCard from "@/components/auth-card";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <AuthCard
      footerText="계정이 없으신가요?"
      footerLinkLabel="회원가입"
      footerHref="/signup"
    >
      <LoginForm />
    </AuthCard>
  );
}

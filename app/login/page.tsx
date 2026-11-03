import Link from "next/link";
import AuthCard from "@/components/auth-card";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <AuthCard
      footerText="계정이 없으신가요?"
      footerLinkLabel="회원가입"
      footerHref="/signup"
      aboveFooter={
        <p className="text-center text-sm">
          <Link
            href="/forgot-password"
            className="link-hover text-[var(--accent-text)]"
          >
            비밀번호를 잊으셨나요?
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}

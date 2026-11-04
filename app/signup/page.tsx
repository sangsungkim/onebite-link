import type { Metadata } from "next";
import AuthCard from "@/components/auth-card";
import SignupForm from "@/components/signup-form";

export const metadata: Metadata = {
  title: "회원가입",
  description: "한입 링크에 가입하고 북마크를 모아보세요.",
  openGraph: { title: "회원가입 | 한입 링크" },
  twitter: { title: "회원가입 | 한입 링크" },
};

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

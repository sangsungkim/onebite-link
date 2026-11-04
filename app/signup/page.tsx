import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "@/components/auth-card";
import SignupForm from "@/components/signup-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "회원가입",
  description: "한입 링크에 가입하고 북마크를 모아보세요.",
});

export default function SignupPage() {
  return (
    <AuthCard
      footerText="이미 계정이 있으신가요?"
      footerLinkLabel="로그인"
      footerHref="/login"
      aboveFooter={
        <p className="text-center text-sm text-[var(--text-sub)]">
          가입 시{" "}
          <Link
            href="/privacy"
            className="link-hover text-[var(--accent-text)] underline"
          >
            개인정보 처리방침
          </Link>
          을 확인해 주세요.
        </p>
      }
    >
      <SignupForm />
    </AuthCard>
  );
}

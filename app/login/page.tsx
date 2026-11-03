import AuthCard from "@/components/auth-card";

export default function LoginPage() {
  return (
    <AuthCard
      submitLabel="로그인"
      footerText="계정이 없으신가요?"
      footerLinkLabel="회원가입"
      footerHref="/signup"
      fields={[
        { name: "email", label: "이메일", type: "email", placeholder: "email@example.com", autoComplete: "email" },
        { name: "password", label: "비밀번호", type: "password", placeholder: "비밀번호를 입력하세요", autoComplete: "current-password" },
      ]}
    />
  );
}

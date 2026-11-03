import AuthCard from "@/components/auth-card";

export default function SignupPage() {
  return (
    <AuthCard
      submitLabel="회원가입"
      footerText="이미 계정이 있으신가요?"
      footerLinkLabel="로그인"
      footerHref="/login"
      fields={[
        { name: "email", label: "이메일", type: "email", placeholder: "email@example.com", autoComplete: "email" },
        { name: "password", label: "비밀번호", type: "password", placeholder: "비밀번호를 입력하세요", autoComplete: "new-password" },
        { name: "passwordConfirm", label: "비밀번호 확인", type: "password", placeholder: "비밀번호를 다시 입력하세요", autoComplete: "new-password" },
      ]}
    />
  );
}

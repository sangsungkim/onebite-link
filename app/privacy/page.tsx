import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "한입 링크의 개인정보 처리방침 안내 페이지입니다.",
  robots: { index: true, follow: true },
  openGraph: { title: "개인정보 처리방침 | 한입 링크" },
  twitter: { title: "개인정보 처리방침 | 한입 링크" },
};

const SERVICE_NAME = "한입 링크";
const OPERATOR_NAME = "김상성(개인)";
const CONTACT_EMAIL = "mungku0516@naver.com";

// 시행일은 처리방침을 개정할 때만 직접 수정한다. (변경 시 시행 7일 전 공지 필요)
const EFFECTIVE_DATE = "2026-11-04";

const TOC = [
  ["s1", "개인정보의 처리 목적"],
  ["s2", "처리하는 개인정보의 항목"],
  ["s3", "개인정보의 처리 및 보유 기간"],
  ["s4", "개인정보의 파기 절차 및 방법"],
  ["s5", "개인정보 처리업무의 위탁"],
  ["s6", "정보주체의 권리·의무 및 행사방법"],
  ["s7", "개인정보의 안전성 확보 조치"],
  ["s8", "쿠키 운영 및 거부 방법"],
  ["s9", "개인정보 보호책임자"],
  ["s10", "권익침해 구제방법"],
  ["s11", "처리방침의 변경"],
] as const;

const h2 = "mb-4 text-xl font-bold";
const section = "mb-10 scroll-mt-20";
const th = "border border-[var(--border)] px-3 py-2 text-left";
const td = "border border-[var(--border)] px-3 py-2";
const anchor = "link-hover text-[var(--accent-text)] underline";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 text-[var(--text)]">
      <header className="mb-10 border-b border-[var(--border)] pb-6">
        <h1 className="text-3xl font-bold tracking-tight">개인정보 처리방침</h1>
        <p className="mt-3 text-sm text-[var(--text-sub)]">
          시행일: <time dateTime={EFFECTIVE_DATE}>{EFFECTIVE_DATE}</time>
        </p>
      </header>

      <section className="mb-10 leading-relaxed">
        <p>
          {SERVICE_NAME}(이하 &quot;서비스&quot;)은 정보주체의 자유와 권리 보호를
          위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게
          개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보
          보호법」 제30조에 따라 정보주체에게 개인정보의 처리와 보호에 관한
          절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할
          수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
        </p>
      </section>

      <nav
        aria-label="목차"
        className="mb-12 rounded-lg border border-[var(--border)] bg-[var(--card)] p-5"
      >
        <h2 className="mb-3 text-base font-semibold">목차</h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-[var(--text-sub)]">
          {TOC.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section id="s1" className={section}>
        <h2 className={h2}>1. 개인정보의 처리 목적</h2>
        <p className="mb-3 leading-relaxed">
          {SERVICE_NAME}은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고
          있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용
          목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의
          동의를 받는 등 필요한 조치를 이행할 예정입니다.
        </p>
        <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
          <li>
            <strong>회원 가입 및 관리</strong>
            <br />
            회원 가입 의사 확인, 본인 식별·인증, 회원자격 유지·관리, 서비스
            부정이용 방지, 가입 확인 및 비밀번호 재설정 메일 발송 목적으로
            개인정보를 처리합니다.
          </li>
          <li>
            <strong>서비스 제공</strong>
            <br />
            회원이 저장한 링크와 폴더의 저장·조회·관리 등 {SERVICE_NAME}의 기능
            제공 및 서비스 운영을 위하여 개인정보를 처리합니다.
          </li>
          <li>
            <strong>고충 처리</strong>
            <br />
            정보주체의 문의사항 확인 및 사실조사를 위한 연락·통지, 처리결과 통보
            목적으로 개인정보를 처리합니다.
          </li>
        </ol>
      </section>

      <section id="s2" className={section}>
        <h2 className={h2}>2. 처리하는 개인정보의 항목</h2>
        <div className="mb-4">
          <h3 className="mb-2 font-semibold">가. 회원가입 시 수집·이용 항목</h3>
          <ul className="list-disc space-y-1 pl-6 leading-relaxed">
            <li>
              <strong>법적 근거</strong>: 「개인정보 보호법」 제15조제1항제4호(계약
              체결·이행)
            </li>
            <li>
              <strong>이메일·비밀번호 가입</strong>: 이메일 주소, 비밀번호(단방향
              암호화하여 저장, 원문 보관하지 않음)
            </li>
            <li>
              <strong>카카오 로그인</strong>: 카카오 계정의 이메일 주소, 프로필
              닉네임. 카카오로부터 제공받는 항목은 카카오 로그인 동의 화면에서
              정보주체가 동의한 범위로 한정됩니다.
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="mb-2 font-semibold">나. 서비스 이용 과정에서 정보주체가 입력하는 항목</h3>
          <p className="leading-relaxed">
            저장한 링크의 주소, 제목, 설명, 썸네일 주소, 폴더 이름
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">다. 서비스 이용 과정에서 자동 수집되는 항목</h3>
          <p className="leading-relaxed">
            IP 주소, 쿠키, 서비스 이용 기록, 접속 로그, 브라우저 정보, 기기 정보
          </p>
        </div>
      </section>

      <section id="s3" className={section}>
        <h2 className={h2}>3. 개인정보의 처리 및 보유 기간</h2>
        <p className="mb-4 leading-relaxed">
          {SERVICE_NAME}은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
          개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를
          처리·보유합니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[var(--border)] text-sm">
            <thead className="bg-[var(--hover-bg)]">
              <tr>
                <th className={th}>처리 목적</th>
                <th className={th}>보유 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={td}>회원 가입 및 관리</td>
                <td className={td}>회원 탈퇴 시까지</td>
              </tr>
              <tr>
                <td className={td}>서비스 제공</td>
                <td className={td}>회원 탈퇴 시까지</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-sub)]">
          다만, 관계 법령 위반에 따른 수사·조사가 진행 중인 경우 또는 관련 법령에
          따른 보존 의무가 있는 경우에는 해당 기간 종료 시까지 보유합니다.
        </p>
      </section>

      <section id="s4" className={section}>
        <h2 className={h2}>4. 개인정보의 파기 절차 및 방법</h2>
        <p className="mb-3 leading-relaxed">
          {SERVICE_NAME}은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
          불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
        </p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            <strong>파기 절차</strong>: 이용자의 회원 탈퇴 요청 또는 보유기간 만료
            시 즉시 파기
          </li>
          <li>
            <strong>파기 방법</strong>: 전자적 파일은 복구 및 재생이 불가능한
            방법으로 영구 삭제
          </li>
        </ul>
      </section>

      <section id="s5" className={section}>
        <h2 className={h2}>5. 개인정보 처리업무의 위탁</h2>
        <p className="mb-4 leading-relaxed">
          {SERVICE_NAME}은 원활한 서비스 운영을 위해 다음과 같이 개인정보 처리
          업무를 위탁하고 있습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[var(--border)] text-sm">
            <thead className="bg-[var(--hover-bg)]">
              <tr>
                <th className={th}>수탁업체</th>
                <th className={th}>위탁 업무</th>
                <th className={th}>처리 지역</th>
                <th className={th}>보유·이용 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={td}>Supabase Inc.</td>
                <td className={td}>
                  회원 정보 저장 및 인증 처리, 데이터베이스 운영, 가입 확인 및
                  비밀번호 재설정 메일 발송
                </td>
                <td className={td}>대한민국 (Seoul 리전)</td>
                <td className={td}>회원 탈퇴 또는 위탁계약 종료 시까지</td>
              </tr>
              <tr>
                <td className={td}>Vercel Inc.</td>
                <td className={td}>웹 서비스 호스팅 및 배포</td>
                <td className={td}>대한민국 (Seoul Edge)</td>
                <td className={td}>위탁계약 종료 시까지</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-sub)]">
          {SERVICE_NAME}은 「개인정보 보호법」 제26조에 따라 위탁계약 시
          개인정보의 안전한 처리를 위한 기술적·관리적 보호조치, 재위탁 제한,
          관리·감독 등 책임에 관한 사항을 계약에 반영하고 있습니다.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-sub)]">
          카카오 로그인을 이용하는 경우, 인증은 ㈜카카오가 제공하는 로그인
          서비스를 통해 이루어지며 정보주체가 동의한 항목만 서비스로 전달됩니다.
        </p>
      </section>

      <section id="s6" className={section}>
        <h2 className={h2}>6. 정보주체의 권리·의무 및 행사방법</h2>
        <p className="mb-3 leading-relaxed">
          정보주체는 {SERVICE_NAME}에 대해 언제든지 다음과 같은 개인정보 보호
          관련 권리를 행사할 수 있습니다.
        </p>
        <ol className="mb-3 list-decimal space-y-1 pl-6 leading-relaxed">
          <li>개인정보 열람 요구</li>
          <li>개인정보 정정·삭제 요구</li>
          <li>개인정보 처리정지 요구</li>
          <li>개인정보 처리에 대한 동의 철회</li>
        </ol>
        <p className="leading-relaxed">
          권리 행사는{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={anchor}>
            {CONTACT_EMAIL}
          </a>
          로 서면, 이메일을 통하여 하실 수 있으며 {SERVICE_NAME}은 이에 대해 지체
          없이 조치하겠습니다.
        </p>
      </section>

      <section id="s7" className={section}>
        <h2 className={h2}>7. 개인정보의 안전성 확보 조치</h2>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            <strong>기술적 조치</strong>: 접근 권한 관리, 비밀번호 단방향 암호화
            저장, HTTPS 통신 암호화, Row Level Security(RLS)를 통한 이용자별 데이터
            접근 제한
          </li>
          <li>
            <strong>관리적 조치</strong>: 개인정보 취급 담당자 최소화, 정기적인
            자체 점검
          </li>
          <li>
            <strong>물리적 조치</strong>: 국제 보안 인증(SOC2)을 획득한 클라우드
            인프라 활용
          </li>
        </ul>
      </section>

      <section id="s8" className={section}>
        <h2 className={h2}>8. 개인정보 자동 수집 장치(쿠키)의 설치·운영 및 거부</h2>
        <p className="mb-3 leading-relaxed">
          {SERVICE_NAME}은 로그인 상태 유지를 위해 쿠키(cookie)를 사용합니다.
        </p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            <strong>사용 목적</strong>: 로그인 세션 유지
          </li>
          <li>
            <strong>거부 방법</strong>: 웹브라우저 설정 &gt; 개인정보 보호 및 보안
            메뉴에서 쿠키 저장을 거부할 수 있습니다. 다만, 쿠키 저장을 거부할 경우
            로그인이 필요한 서비스 이용이 불가능합니다.
          </li>
        </ul>
      </section>

      <section id="s9" className={section}>
        <h2 className={h2}>9. 개인정보 보호책임자</h2>
        <p className="mb-3 leading-relaxed">
          {SERVICE_NAME}은 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보
          처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이
          개인정보 보호책임자를 지정하고 있습니다.
        </p>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 leading-relaxed">
          <p>
            <strong>개인정보 보호책임자</strong>: {OPERATOR_NAME}
          </p>
          <p>
            <strong>연락처</strong>:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={anchor}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>

      <section id="s10" className={section}>
        <h2 className={h2}>10. 권익침해 구제방법</h2>
        <p className="mb-3 leading-relaxed">
          정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁
          해결이나 상담 등을 신청할 수 있습니다.
        </p>
        <ul className="list-disc space-y-1 pl-6 leading-relaxed">
          {[
            ["개인정보분쟁조정위원회", "1833-6972", "https://www.kopico.go.kr", "www.kopico.go.kr"],
            ["개인정보침해신고센터", "118", "https://privacy.kisa.or.kr", "privacy.kisa.or.kr"],
            ["대검찰청", "1301", "https://www.spo.go.kr", "www.spo.go.kr"],
            ["경찰청", "182", "https://ecrm.cyber.go.kr", "ecrm.cyber.go.kr"],
          ].map(([name, tel, href, label]) => (
            <li key={name}>
              {name}: (국번없이) {tel} (
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className={anchor}
              >
                {label}
              </a>
              )
            </li>
          ))}
        </ul>
      </section>

      <section id="s11" className={section}>
        <h2 className={h2}>11. 개인정보 처리방침의 변경</h2>
        <p className="leading-relaxed">
          이 개인정보 처리방침은 {EFFECTIVE_DATE}부터 적용됩니다. 법령, 정책 또는
          보안기술 변경에 따라 내용이 추가·삭제 및 수정될 경우 변경 사항을 시행일
          7일 전부터 서비스 내 공지를 통해 고지합니다.
        </p>
      </section>

      <footer className="mt-16 flex items-center justify-between border-t border-[var(--border)] pt-6 text-sm text-[var(--text-sub)]">
        <p>시행일: {EFFECTIVE_DATE}</p>
        <Link href="/" className="link-hover text-[var(--accent-text)]">
          서비스로 돌아가기
        </Link>
      </footer>
    </main>
  );
}

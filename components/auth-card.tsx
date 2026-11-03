import Link from "next/link";
import Logo from "./logo";

type Field = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
};

export default function AuthCard({
  fields = [],
  submitLabel = "",
  children,
  aboveFooter,
  footerText,
  footerLinkLabel,
  footerHref,
}: {
  fields?: Field[];
  submitLabel?: string;
  children?: React.ReactNode;
  aboveFooter?: React.ReactNode;
  footerText: string;
  footerLinkLabel: string;
  footerHref: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-[400px] flex-col gap-8 rounded-[8px] border border-[var(--border)] bg-[var(--card)] p-8">
        <div className="text-center text-2xl">
          <Logo />
        </div>
        {children ?? (
        <form className="flex flex-col gap-4">
          {fields.map((f) => (
            <label
              key={f.name}
              className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]"
            >
              {f.label}
              <input
                type={f.type}
                name={f.name}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                required
                className="field rounded-[6px] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
              />
            </label>
          ))}
          <button
            type="submit"
            className="btn-primary rounded-[6px] px-4 py-2 text-sm font-medium text-white"
          >
            {submitLabel}
          </button>
        </form>
        )}
        <div className="-mt-4 flex flex-col gap-3">
          {aboveFooter}
          <p className="text-center text-sm text-[var(--text-sub)]">
            {footerText}{" "}
            <Link
              href={footerHref}
              className="link-hover text-[var(--accent-text)]"
            >
              {footerLinkLabel}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");
  const tf = await getTranslations("footer");

  return (
    <>
      <main className="h-screen flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-mono text-[10px] lg:text-lg uppercase tracking-[0.3em] text-muted">
          {t("eyebrow")}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight lg:text-5xl">
          {t("heading")}
        </h1>
        <p className="text-sm lg:text-md max-w-md text-balance text-muted">
          {t("subheading")}
        </p>
        <div className="mt-4 flex items-center gap-3 rounded-full border-2 border-accent-purple bg-surface px-4 py-2 font-mono text-xs font-semibold lg:text-base text-accent drop-shadow-sm drop-shadow-accent">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {t("badge")}
        </div>

        <div className="mt-6 flex items-center gap-5 font-mono text-xs lg:text-sm text-muted">
          <a
            href="mailto:hello@fkuroshiro.dev"
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {t("email")}
          </a>
          <span className="h-4 w-px bg-border" />
          <a
            href="https://github.com/fkuroshiro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.16-.01-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            {t("github")}
          </a>
        </div>
      </main>
      <footer className="pb-6 text-center font-mono text-xs text-muted">
        {tf("copyright", { year: new Date().getFullYear() })}
      </footer>
    </>
  );
}

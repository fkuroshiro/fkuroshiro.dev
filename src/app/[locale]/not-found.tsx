import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Wrapper } from "@/ui/Wrapper";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="h-dvh bg-background flex justify-center overflow-hidden">
      <div className="absolute pointer-events-none inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/80 blur-xl sm:h-160 sm:w-160 sm:blur-2xl lg:h-200 lg:w-200 lg:blur-3xl" />
        <div className="absolute right-0 bottom-0 h-120 w-120 translate-x-1/2 translate-y-1/2 rounded-full bg-accent/80 blur-xl sm:h-160 sm:w-160 sm:blur-2xl lg:h-200 lg:w-200 lg:blur-3xl" />
      </div>
      <Wrapper className="flex flex-col items-center justify-center gap-6 px-4 text-center sm:gap-12">
        <h1 className="z-10 text-6xl font-black sm:text-8xl lg:text-9xl">
          404
        </h1>
        <p className="z-10 text-sm sm:text-base">{t("message")}</p>
        <Link
          className="z-10 w-fit rounded-xl border-2 border-border px-3 py-2 text-sm font-black duration-300 delay-75 drop-shadow-lg drop-shadow-black hover:border-accent/80 hover:bg-accent/50 hover:drop-shadow-accent hover:backdrop-blur-lg sm:text-base"
          href="/"
        >
          <span>{t("cta")}</span>
        </Link>
      </Wrapper>
    </div>
  );
}

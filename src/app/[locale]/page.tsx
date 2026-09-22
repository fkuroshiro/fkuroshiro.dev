import { useTranslations } from "next-intl";

export default function LandingPage() {
  const t = useTranslations();

  return <h1>{t("Test.text")}</h1>;
}

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "cs"],
  defaultLocale: "cs",
  localePrefix: "as-needed",
});

import * as rootParams from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export default getRequestConfig(async () => {
  let locale;
  if (hasLocale(routing.locales, await rootParams.locale())) {
    locale = await rootParams.locale();
  } else {
    notFound();
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});

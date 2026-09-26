import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { cookies } from "next/headers";
import { GoogleTagManagerGate } from "@/ui/components/GoogleTagManagerGate";
import { Geist } from "next/font/google";
import "@/globals.css";

//=== Fonts ===
const geist = Geist({
  subsets: ["latin"],
});

//=== VIEWPORT ===
export const viewport: Viewport = {
  themeColor: "#121212",
};

//=== METADATA ===
export const metadata: Metadata = {
  metadataBase: new URL("https://fkuroshiro.dev"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      cs: "/",
      "x-default": "/",
    },
  },
  title: {
    template: "%s | fkuroshiro.dev",
    default: "fkuroshiro.dev",
  },
  description:
    "A personal website portfolio of fkuroshiro, a starting young Full-stack developer.",
  applicationName: "fkuroshiro.dev",
  authors: [{ name: "fkuroshiro.dev", url: "https://fkuroshiro.dev" }],
  keywords: ["fkuroshiro.dev", "fkuroshiro", "portfolio", "personal web"],
  creator: "fkuroshiro",
  publisher: "fkuroshiro",
  category: "portfolio",

  //=== OpenGraph ===
  openGraph: {
    type: "website",
    url: "https://fkuroshiro.dev",
    title: "fkuroshiro.dev",
    description:
      "A personal website portfolio of fkuroshiro, a starting young Full-stack developer.",
    siteName: "fkuroshiro.dev",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "fkuroshiro.dev portfolio preview",
      },
    ],
    locale: "en_US",
    alternateLocale: ["cs_CZ"],
  },

  //=== Robots ===
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const cookieStore = await cookies();
  const consentCookie = cookieStore.get("gtm-consent")?.value;
  const initialConsent =
    consentCookie === "granted" || consentCookie === "denied"
      ? consentCookie
      : null;

  return (
    <html lang={locale} className={geist.className}>
      <body>
        <NextIntlClientProvider messages={await getMessages()}>
          {children}
          <GoogleTagManagerGate initialConsent={initialConsent} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

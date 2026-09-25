import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "@/globals.css";

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

//=== i18n ===
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={await getMessages()}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

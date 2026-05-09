import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import LangUpdater from "@/components/ui/LangUpdater";

export const metadata: Metadata = {
  title: {
    default: "Carpe Lucem",
    template: "%s | Carpe Lucem",
  },
  description:
    "The Art of the Finest Living — Premium ingredients, fine spirits, luxury experiences.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LangUpdater locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}

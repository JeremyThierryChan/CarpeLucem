import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import ServiceDetailTemplate from "@/components/ui/ServiceDetailTemplate";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services.detail.gifts" });
  return { title: t("label") };
}

export default async function GiftsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services.detail.gifts" });

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <ServiceDetailTemplate service="gifts" />
      <Footer />
    </main>
  );
}

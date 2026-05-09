import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import ProductDetailTemplate from "@/components/ui/ProductDetailTemplate";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "products.detail.ingredients" });
  return { title: t("label") };
}

export default async function IngredientsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "products.detail.ingredients" });

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <ProductDetailTemplate category="ingredients" />
      <Footer />
    </main>
  );
}

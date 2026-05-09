import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/BrandStory";
import ProductCategories from "@/components/sections/ProductCategories";
import Services from "@/components/sections/Services";
import CtaSection from "@/components/sections/CtaSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <BrandStory />
      <ProductCategories />
      <Services />
      <CtaSection />
      <Footer />
    </main>
  );
}

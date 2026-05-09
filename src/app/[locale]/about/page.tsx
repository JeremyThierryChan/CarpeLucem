import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("label") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <PageHero label={t("label")} title={t("title")} />

      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <div className="flex flex-col gap-8">
            <p className="text-muted leading-relaxed text-sm">{t("body")}</p>
            <p className="text-muted leading-relaxed text-sm">
              {/* Placeholder for additional content */}
              [Content to be added]
            </p>
          </div>

          {/* Image placeholder */}
          <div className="relative aspect-[4/3] bg-surface-elevated border border-subtle overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="section-label text-muted">IMAGE PLACEHOLDER</span>
            </div>
            <span className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold opacity-60" />
            <span className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold opacity-60" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";

const CATEGORIES = ["ingredients", "spirits", "charcuterie"] as const;

const ICONS: Record<string, string> = {
  ingredients: "✦",
  spirits: "◈",
  charcuterie: "◆",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "products" });
  return { title: t("label") };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} />

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
          {CATEGORIES.map((cat) => (
            <div
              key={cat}
              className="group border border-subtle hover:border-gold transition-colors duration-500 p-10 flex flex-col md:flex-row gap-8 bg-surface-elevated relative"
            >
              <span className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

              <div className="shrink-0 flex flex-col gap-4 md:w-64">
                <span className="text-gold text-3xl">{ICONS[cat]}</span>
                <h2
                  className="text-2xl font-light text-cream"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {t(`categories.${cat}.name`)}
                </h2>
                <span className="gold-line" />
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <p className="text-muted text-sm leading-relaxed">
                  {t(`categories.${cat}.description`)}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="aspect-square bg-surface border border-subtle flex items-center justify-center"
                    >
                      <span className="section-label text-muted" style={{ fontSize: "0.55rem" }}>
                        PRODUCT {n}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

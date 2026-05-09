import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import CtaSection from "@/components/sections/CtaSection";

const SERVICES = ["travel", "tasting", "gifts"] as const;
const NUMBERS = ["01", "02", "03"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("label") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} />

      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-0 divide-y divide-subtle">
          {SERVICES.map((svc, i) => (
            <div
              key={svc}
              className="group py-16 grid grid-cols-1 md:grid-cols-[5rem_1fr_1fr] gap-8 items-start hover:bg-surface-elevated/20 px-2 -mx-2 transition-colors duration-300"
            >
              <span
                className="text-gold opacity-40 font-light text-4xl leading-none"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {NUMBERS[i]}
              </span>

              <div className="flex flex-col gap-4">
                <h2
                  className="text-3xl md:text-4xl font-light text-cream group-hover:text-gold-light transition-colors duration-300"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {t(`items.${svc}.name`)}
                </h2>
                <span className="w-8 h-px bg-gold group-hover:w-16 transition-all duration-300" />
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-muted text-sm leading-relaxed">
                  {t(`items.${svc}.description`)}
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  [Additional service details to be added]
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}

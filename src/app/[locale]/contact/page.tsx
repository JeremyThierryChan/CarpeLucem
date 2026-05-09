import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/sections/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("label") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} />

      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <span className="section-label">{t("info.email_label")}</span>
              <a
                href="mailto:contact@carpelucem.com"
                className="text-cream hover:text-gold transition-colors duration-200 text-sm"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}
              >
                contact@carpelucem.com
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="section-label">{t("info.wechat_label")}</span>
              <span className="text-cream text-sm" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}>
                [WeChat ID]
              </span>
            </div>

            {/* Decorative */}
            <div className="mt-auto hidden lg:block">
              <span
                className="text-7xl font-light text-gold opacity-10 select-none"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                C·L
              </span>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}

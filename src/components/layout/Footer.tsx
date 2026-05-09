import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const NAV_LINKS = [
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "services", href: "/services" },
  { key: "contact", href: "/contact" },
];

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-subtle bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-2xl font-light tracking-[0.2em] text-cream uppercase"
            >
              Carpe Lucem
            </span>
            <span className="gold-line" />
            <p className="text-muted text-sm leading-relaxed">{t("footer.tagline")}</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <span className="section-label mb-2">Navigation</span>
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={`/${locale}${href}`}
                className="text-muted text-sm hover:text-gold-light transition-colors duration-200"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="section-label mb-2">{t("nav.contact")}</span>
            <a
              href="mailto:contact@carpelucem.com"
              className="text-muted text-sm hover:text-gold-light transition-colors duration-200"
            >
              contact@carpelucem.com
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs tracking-wider">
            © {year} Carpe Lucem. {t("footer.rights")}.
          </p>
          <span className="gold-line" />
        </div>
      </div>
    </footer>
  );
}

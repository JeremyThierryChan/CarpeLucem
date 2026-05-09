"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";

const NAV_LINKS = [
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "services", href: "/services" },
  { key: "journal", href: "/journal" },
  { key: "contact", href: "/contact" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const localePath = (href: string) => `/${locale}${href}`;

  // For mobile menu locale switch: reuse same path logic
  const switchLocale = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-ink/95 backdrop-blur-sm border-b border-subtle"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={localePath("/")}
            onClick={() => setMenuOpen(false)}
            className="flex flex-col leading-none group z-50 relative"
          >
            <span
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-xl font-light tracking-[0.2em] text-cream uppercase"
            >
              Carpe Lucem
            </span>
            <span className="gold-line mt-1 transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={localePath(href)}
                className="section-label hover:text-gold-light transition-colors duration-200"
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-6 z-50 relative">
            {/* Divider between nav and locale switcher */}
            <span className="hidden md:block w-px h-3.5 bg-subtle opacity-60" />
            {/* Locale dropdown — desktop */}
            <div className="hidden md:block">
              <LocaleSwitcher />
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`block w-6 h-[2px] bg-cream origin-center transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-[2px] bg-cream transition-all duration-300 ${
                  menuOpen ? "opacity-0 w-0" : "w-6"
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-cream origin-center transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu (mobile) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col"
          >
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg, transparent, transparent 60px,
                  rgba(184,150,62,0.3) 60px, rgba(184,150,62,0.3) 61px
                )`,
              }}
            />
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 60% 50% at 50% 80%, #b8963e33, transparent)",
              }}
            />

            {/* Nav links */}
            <nav className="relative z-10 flex flex-col items-start justify-center flex-1 px-8 gap-2 pt-20">
              {NAV_LINKS.map(({ key, href }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href={localePath(href)}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-5 py-3"
                  >
                    <span
                      className="text-4xl font-light text-cream group-hover:text-gold-light transition-colors duration-300"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {t(key)}
                    </span>
                    <span className="w-0 h-px bg-gold group-hover:w-8 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer row with locale switcher */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative z-10 px-8 py-8 border-t border-subtle flex items-center justify-between"
            >
              <span className="section-label text-muted">Carpe Lucem</span>
              {/* Mobile locale buttons */}
              <div className="flex items-center gap-4">
                {[
                  { code: "zh", label: "中文" },
                  { code: "en", label: "EN" },
                  { code: "fr", label: "FR" },
                  { code: "es", label: "ES" },
                  { code: "it", label: "IT" },
                  { code: "de", label: "DE" },
                  { code: "ar", label: "AR" },
                ].map(({ code, label }, i) => (
                  <span key={code} className="flex items-center gap-4">
                    {i > 0 && <span className="w-px h-3 bg-subtle" />}
                    <button
                      onClick={() => switchLocale(code)}
                      className={`section-label transition-colors duration-200 ${
                        locale === code ? "text-gold" : "text-muted hover:text-gold-light"
                      }`}
                    >
                      {label}
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

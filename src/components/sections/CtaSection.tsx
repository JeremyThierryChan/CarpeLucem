"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CtaSection() {
  const t = useTranslations("cta_section");
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 bg-surface relative overflow-hidden">
      {/* Gold gradient overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, #b8963e44, transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-8"
      >
        {/* Ornament */}
        <div className="flex items-center gap-4">
          <span className="gold-line" />
          <span className="text-gold text-lg">✦</span>
          <span className="gold-line" />
        </div>

        <h2
          className="text-4xl md:text-6xl font-light text-cream leading-tight"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {t("title")}
        </h2>

        <p className="text-muted text-sm max-w-md leading-relaxed">{t("subtitle")}</p>

        <Link
          href={`/${locale}/contact`}
          className="mt-4 px-12 py-4 border border-gold text-gold section-label hover:bg-gold hover:text-ink transition-all duration-300"
        >
          {t("cta")}
        </Link>
      </motion.div>
    </section>
  );
}

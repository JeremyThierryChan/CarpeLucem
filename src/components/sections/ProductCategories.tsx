"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CATEGORIES = ["ingredients", "spirits", "charcuterie"] as const;

const ICONS: Record<string, string> = {
  ingredients: "✦",
  spirits: "◈",
  charcuterie: "◆",
};

export default function ProductCategories() {
  const t = useTranslations("products");
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center gap-4"
        >
          <span className="section-label">{t("label")}</span>
          <span className="gold-line" />
          <h2
            className="text-4xl md:text-5xl font-light text-cream"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("title")}
          </h2>
          <p className="text-muted text-sm max-w-md">{t("subtitle")}</p>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group relative bg-surface-elevated border border-subtle hover:border-gold transition-colors duration-500 p-10 flex flex-col gap-6 cursor-pointer"
            >
              {/* Corner ornament */}
              <span className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

              <span className="text-gold text-2xl">{ICONS[cat]}</span>

              <div className="flex flex-col gap-3">
                <h3
                  className="text-2xl font-light text-cream"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {t(`categories.${cat}.name`)}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {t(`categories.${cat}.description`)}
                </p>
              </div>

              <span className="w-6 h-px bg-gold group-hover:w-12 transition-all duration-300 mt-auto" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <Link
            href={`/${locale}/products`}
            className="px-12 py-4 border border-gold text-gold section-label hover:bg-gold hover:text-ink transition-all duration-300"
          >
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

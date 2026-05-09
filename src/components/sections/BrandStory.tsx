"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function BrandStory() {
  const t = useTranslations("about");
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] bg-surface-elevated border border-subtle overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="section-label text-muted">IMAGE PLACEHOLDER</span>
          </div>
          {/* Corner ornaments */}
          <span className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold opacity-60" />
          <span className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold opacity-60" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <span className="section-label">{t("label")}</span>
            <span className="gold-line" />
          </div>

          <h2
            className="text-4xl md:text-5xl font-light text-cream leading-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("title")}
          </h2>

          <p className="text-muted leading-relaxed text-sm">{t("body")}</p>

          <Link
            href={`/${locale}/about`}
            className="self-start flex items-center gap-3 group"
          >
            <span className="section-label text-gold group-hover:text-gold-light transition-colors">
              {t("cta")}
            </span>
            <span className="w-8 h-px bg-gold group-hover:w-16 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

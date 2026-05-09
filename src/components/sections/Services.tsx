"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SERVICES = ["travel", "tasting", "gifts"] as const;

const NUMBERS = ["01", "02", "03"];

export default function Services() {
  const t = useTranslations("services");
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 bg-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4"
        >
          <span className="section-label">{t("label")}</span>
          <span className="gold-line" />
          <h2
            className="text-4xl md:text-5xl font-light text-cream max-w-lg leading-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("title")}
          </h2>
          <p className="text-muted text-sm max-w-sm">{t("subtitle")}</p>
        </motion.div>

        {/* Service list */}
        <div className="flex flex-col divide-y divide-subtle">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group py-10 flex flex-col md:flex-row md:items-center gap-6 hover:bg-surface-elevated/30 px-2 -mx-2 transition-colors duration-300"
            >
              <span className="text-gold opacity-40 font-light text-sm w-8 shrink-0"
                style={{ fontFamily: "var(--font-cormorant)" }}>
                {NUMBERS[i]}
              </span>

              <h3
                className="text-2xl md:text-3xl font-light text-cream group-hover:text-gold-light transition-colors duration-300 flex-1"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {t(`items.${svc}.name`)}
              </h3>

              <p className="text-muted text-sm leading-relaxed md:max-w-xs">
                {t(`items.${svc}.description`)}
              </p>

              <span className="w-6 h-px bg-gold group-hover:w-12 transition-all duration-300 md:ml-8 shrink-0" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-4 group"
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

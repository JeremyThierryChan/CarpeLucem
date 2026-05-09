"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Step {
  step: string;
  title: string;
  body: string;
}

interface Props {
  service: "travel" | "tasting" | "gifts";
}

export default function ServiceDetailTemplate({ service }: Props) {
  const t = useTranslations(`services.detail.${service}`);
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps: Step[] = t.raw("steps") as Step[];
  const listKey = service === "travel" ? "destinations" : service === "tasting" ? "formats" : "occasions";
  const listLabel = service === "travel" ? "destinations_label" : service === "tasting" ? "formats_label" : "occasions_label";
  const list: string[] = t.raw(listKey) as string[];

  return (
    <div className="flex flex-col">
      {/* Intro */}
      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <p className="text-muted text-sm leading-relaxed">{t("intro")}</p>
          <div className="relative aspect-[4/3] bg-surface-elevated border border-subtle overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="section-label text-muted">IMAGE PLACEHOLDER</span>
            </div>
            <span className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold opacity-60" />
            <span className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold opacity-60" />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section ref={ref} className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="section-label">{t("how_label")}</span>
            <span className="gold-line" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="border border-subtle bg-surface-elevated p-8 flex flex-col gap-4 relative group"
              >
                <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-gold opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                <span
                  className="text-4xl font-light text-gold opacity-30"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {step.step}
                </span>
                <h3
                  className="text-xl font-light text-cream"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* List (destinations / formats / occasions) */}
      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="section-label">{t(listLabel)}</span>
            <span className="gold-line" />
          </div>
          <div className="flex flex-wrap gap-3">
            {list.map((item, i) => (
              <span
                key={i}
                className="border border-subtle px-5 py-2.5 text-muted text-sm hover:border-gold hover:text-gold-light transition-all duration-200"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface border-t border-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href={`/${locale}/services`} className="flex items-center gap-3 group">
            <span className="w-8 h-px bg-gold group-hover:w-4 transition-all duration-300" />
            <span className="section-label text-muted hover:text-gold-light transition-colors">
              ← {locale === "zh" ? "返回全部服务" : "Back to Services"}
            </span>
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="px-10 py-3.5 border border-gold text-gold section-label hover:bg-gold hover:text-ink transition-all duration-300"
          >
            {locale === "zh" ? "立即咨询" : "Enquire Now"}
          </Link>
        </div>
      </section>
    </div>
  );
}

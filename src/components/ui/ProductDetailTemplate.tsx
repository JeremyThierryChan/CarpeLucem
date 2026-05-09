"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Product {
  name: string;
  origin: string;
  note: string;
}

interface Props {
  category: "ingredients" | "spirits" | "charcuterie";
}

export default function ProductDetailTemplate({ category }: Props) {
  const t = useTranslations(`products.detail.${category}`);
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const products: Product[] = (
    t.raw("placeholder_products") as Product[]
  );

  return (
    <div className="flex flex-col">
      {/* Intro */}
      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-6">
            <p className="text-muted text-sm leading-relaxed">{t("intro")}</p>
          </div>
          {/* Image placeholder */}
          <div className="relative aspect-[4/3] bg-surface-elevated border border-subtle overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="section-label text-muted">IMAGE PLACEHOLDER</span>
            </div>
            <span className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold opacity-60" />
            <span className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold opacity-60" />
          </div>
        </div>
      </section>

      {/* Origin + Standards */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {(["origin", "selection"] as const).map((block) => (
            <div key={block} className="flex flex-col gap-4 border border-subtle p-8 bg-surface-elevated relative group">
              <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-gold opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <span className="section-label text-gold">{t(`${block}_label`)}</span>
              <span className="gold-line" />
              <p className="text-muted text-sm leading-relaxed">{t(`${block}_body`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section ref={ref} className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="section-label">{t("products_label")}</span>
            <span className="gold-line" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-subtle">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-ink p-8 flex flex-col gap-4 group hover:bg-surface-elevated transition-colors duration-300"
              >
                <div className="aspect-square bg-surface-elevated border border-subtle flex items-center justify-center mb-2">
                  <span className="section-label text-muted" style={{ fontSize: "0.55rem" }}>
                    IMAGE
                  </span>
                </div>
                <h3
                  className="text-lg font-light text-cream group-hover:text-gold-light transition-colors"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {product.name}
                </h3>
                <span className="section-label text-muted text-xs">{product.origin}</span>
                <p className="text-muted text-xs leading-relaxed">{product.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface border-t border-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link
            href={`/${locale}/products`}
            className="flex items-center gap-3 group"
          >
            <span className="w-8 h-px bg-gold group-hover:w-4 transition-all duration-300" />
            <span className="section-label text-muted hover:text-gold-light transition-colors">
              ← {locale === "zh" ? "返回全部产品" : "Back to Products"}
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

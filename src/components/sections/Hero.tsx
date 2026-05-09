"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" },
  }),
};

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 60px,
            rgba(184,150,62,0.3) 60px, rgba(184,150,62,0.3) 61px
          ), repeating-linear-gradient(
            90deg, transparent, transparent 60px,
            rgba(184,150,62,0.3) 60px, rgba(184,150,62,0.3) 61px
          )`,
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 60%, #b8963e22, transparent)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        {/* Ornament */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4"
        >
          <span className="gold-line w-12" />
          <span className="section-label">Est. 2024</span>
          <span className="gold-line w-12" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl lg:text-9xl font-light text-cream leading-none tracking-wide"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {t("tagline")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="section-label text-gold-light"
        >
          {t("subtitle")}
        </motion.p>

        {/* Description */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-xl text-muted text-sm leading-relaxed"
        >
          {t("description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          <Link
            href={`/${locale}/products`}
            className="px-10 py-3.5 border border-gold text-gold section-label hover:bg-gold hover:text-ink transition-all duration-300"
          >
            {t("cta_primary")}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="px-10 py-3.5 text-muted section-label hover:text-gold-light transition-colors duration-200"
          >
            {t("cta_secondary")}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="section-label text-muted" style={{ fontSize: "0.6rem" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}

"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Post {
  category: string;
  title: string;
  excerpt: string;
  date: string;
}

export default function JournalGrid() {
  const t = useTranslations("journal");
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const posts: Post[] = t.raw("placeholder_posts") as Post[];

  return (
    <section ref={ref} className="py-24 bg-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group flex flex-col gap-5 border border-subtle hover:border-gold transition-colors duration-500 p-8 bg-surface-elevated relative cursor-pointer"
            >
              <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-gold opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

              {/* Image placeholder */}
              <div className="aspect-[16/9] bg-surface border border-subtle flex items-center justify-center">
                <span className="section-label text-muted" style={{ fontSize: "0.55rem" }}>
                  IMAGE PLACEHOLDER
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="section-label text-gold">{post.category}</span>
                <span className="text-muted text-xs">{post.date}</span>
              </div>

              <h2
                className="text-xl font-light text-cream leading-snug group-hover:text-gold-light transition-colors duration-300"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {post.title}
              </h2>

              <p className="text-muted text-xs leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              <span className="flex items-center gap-3 mt-auto group/link">
                <span className="section-label text-gold group-hover:text-gold-light transition-colors text-xs">
                  {t("read_more")}
                </span>
                <span className="w-4 h-px bg-gold group-hover:w-8 transition-all duration-300" />
              </span>
            </motion.article>
          ))}
        </div>

        {/* Coming soon note */}
        <div className="flex items-center gap-4 justify-center py-8">
          <span className="gold-line" />
          <span className="section-label text-muted">{t("coming_soon")}</span>
          <span className="gold-line" />
        </div>
      </div>
    </section>
  );
}

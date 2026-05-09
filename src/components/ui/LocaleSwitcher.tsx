"use client";

import { useRef, useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// 新增语言时只需在这里添加一行
const LOCALES = [
  { code: "zh", abbr: "ZH", label: "中文" },
  { code: "en", abbr: "EN", label: "English" },
  { code: "fr", abbr: "FR", label: "Français" },
  { code: "es", abbr: "ES", label: "Español" },
  { code: "it", abbr: "IT", label: "Italiano" },
  { code: "de", abbr: "DE", label: "Deutsch" },
  { code: "ar", abbr: "AR", label: "العربية" },
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const switchLocale = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 group"
        aria-label="Select language"
      >
        <span className="section-label text-muted group-hover:text-gold-light transition-colors duration-200">
          {current.abbr}
        </span>
        {/* Chevron */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          className="text-muted group-hover:text-gold-light transition-colors duration-200"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </motion.svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-3 min-w-[120px] bg-surface-elevated border border-subtle z-50"
          >
            {/* Top gold accent line */}
            <span className="block w-full h-px bg-gold opacity-60" />

            {LOCALES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => switchLocale(code)}
                className={`w-full text-left px-4 py-3 section-label transition-colors duration-150 flex items-center justify-between gap-4 hover:bg-surface hover:text-gold-light ${
                  code === locale ? "text-gold" : "text-muted"
                }`}
              >
                {label}
                {code === locale && (
                  <span className="w-1 h-1 rounded-full bg-gold inline-block" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

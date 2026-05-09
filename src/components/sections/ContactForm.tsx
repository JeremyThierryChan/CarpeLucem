"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    await fetch("https://formspree.io/f/placeholder", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 py-8">
        <span className="gold-line" />
        <p className="text-cream text-sm leading-relaxed">{t("success")}</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-surface-elevated border border-subtle hover:border-gold focus:border-gold outline-none px-4 py-3 text-sm text-cream placeholder:text-muted transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="section-label">{t("name")}</label>
          <input
            type="text"
            name="name"
            required
            placeholder="—"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="section-label">{t("email")}</label>
          <input
            type="email"
            name="email"
            required
            placeholder="—"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="section-label">{t("subject")}</label>
        <input
          type="text"
          name="subject"
          placeholder="—"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="section-label">{t("message")}</label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="—"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="self-start px-10 py-3.5 border border-gold text-gold section-label hover:bg-gold hover:text-ink transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "..." : t("submit")}
      </button>
    </form>
  );
}

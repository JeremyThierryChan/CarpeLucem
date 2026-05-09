import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en", "es", "it", "fr", "ar", "de"],
  defaultLocale: "zh",
  localePrefix: "always",
});

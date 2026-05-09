import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import zh from "../messages/zh.json";
import en from "../messages/en.json";
import es from "../messages/es.json";
import it from "../messages/it.json";
import fr from "../messages/fr.json";
import ar from "../messages/ar.json";
import de from "../messages/de.json";

const messageMap: Record<string, typeof zh> = { zh, en, es, it, fr, ar, de };

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: messageMap[locale],
  };
});

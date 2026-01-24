import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bn", "ta", "bu", "fi", "in"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

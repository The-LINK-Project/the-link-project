import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "bn", "ta"],
    defaultLocale: "en",
    localePrefix: "as-needed"
});
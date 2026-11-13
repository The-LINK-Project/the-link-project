// The Android app's Google Play listing, and the links and badges that point
// to it.

export const PLAY_STORE_APP_ID = "org.thelinkproject.app";

// Some of our locale codes are not the ones Google uses: bu is Burmese (my),
// fi is Filipino (fil) and in is Indonesian (id).
const PLAY_LANGUAGE: Record<string, string> = {
    en: "en",
    bn: "bn",
    ta: "ta",
    bu: "my",
    fi: "fil",
    in: "id",
};

// A link to the listing. `hl` opens the listing's web page in the visitor's
// language (the Play Store app on a phone uses the phone's language instead).
// `utm_source` and `utm_campaign` show up in Play Console's store analysis,
// so each place that links here gets its own campaign name.
export const playStoreUrl = (locale: string, campaign: string) => {
    const params = new URLSearchParams({
        id: PLAY_STORE_APP_ID,
        hl: PLAY_LANGUAGE[locale] ?? "en",
        utm_source: "website",
        utm_campaign: campaign,
    });
    return `https://play.google.com/store/apps/details?${params}`;
};

// Google's official "Get it on Google Play" badges, unmodified, from the
// badge pack on Google's Partner Marketing Hub (June 2026 version). Google's
// Bengali and Burmese badges have broken lettering, so those pages show the
// English one.
const BADGE_LOCALES = new Set(["en", "ta", "fi", "in"]);

export const playStoreBadge = (locale: string) =>
    `/assets/mobile-app/google-play/${BADGE_LOCALES.has(locale) ? locale : "en"}.svg`;

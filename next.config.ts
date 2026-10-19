import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    // rate-limiter-flexible: its index eagerly requires optional backends
    // (e.g. drizzle-orm) that aren't installed; keeping it external stops
    // webpack from trying to resolve them at build time
    serverExternalPackages: ["mongoose", "rate-limiter-flexible"],
    // The older conversation lessons, games and quiz results now live under
    // /legacy, unlinked. Old bookmarks and shared links still reach them.
    // Temporary (307), so the old addresses can be given to something else.
    async redirects() {
        const locale = ":locale(bn|ta|bu|fi|in|en)";
        // Redirects run before files in public/ are served, and the games'
        // pictures live in public/games/icons, so that folder is left alone.
        const rest = ":path((?!icons(?:/|$)).*)";
        return ["learn", "games", "results"].flatMap((section) => [
            { source: `/${section}`, destination: `/legacy/${section}`, permanent: false },
            { source: `/${section}/${rest}`, destination: `/legacy/${section}/:path`, permanent: false },
            { source: `/${locale}/${section}`, destination: `/:locale/legacy/${section}`, permanent: false },
            {
                source: `/${locale}/${section}/${rest}`,
                destination: `/:locale/legacy/${section}/:path`,
                permanent: false,
            },
        ]);
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    // rate-limiter-flexible: its index eagerly requires optional backends
    // (e.g. drizzle-orm) that aren't installed; keeping it external stops
    // webpack from trying to resolve them at build time
    serverExternalPackages: ["mongoose", "rate-limiter-flexible"],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

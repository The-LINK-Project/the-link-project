import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: { "@": import.meta.dirname },
    },
    test: {
        environment: "node",
        // next-intl's ESM build imports "next/server" without an extension,
        // which only resolves when vite bundles it
        server: { deps: { inline: ["next-intl"] } },
        include: ["tests/**/*.test.ts"],
        setupFiles: ["tests/setup.ts"],
        // The first run downloads a MongoDB binary for mongodb-memory-server
        hookTimeout: 120_000,
        testTimeout: 30_000,
    },
});

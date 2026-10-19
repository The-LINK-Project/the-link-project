import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: { "@": import.meta.dirname },
    },
    test: {
        environment: "node",
        include: ["tests/**/*.test.ts"],
        setupFiles: ["tests/setup.ts"],
        // The first run downloads a MongoDB binary for mongodb-memory-server
        hookTimeout: 120_000,
        testTimeout: 30_000,
    },
});

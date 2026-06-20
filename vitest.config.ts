import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["app/**/*.test.ts", "app/**/*.test.tsx"],
  },
  resolve: {
    alias: { "@": new URL(".", import.meta.url).pathname },
  },
});

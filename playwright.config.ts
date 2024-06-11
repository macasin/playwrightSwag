import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 10000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
  },
});

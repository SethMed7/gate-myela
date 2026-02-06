import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: "http://localhost:3000",
    viewport: { width: 1280, height: 720 },
    trace: "on-first-retry",
  },
  webServer: {
    command: "bun run dev -- -p 3000 -H 127.0.0.1",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});

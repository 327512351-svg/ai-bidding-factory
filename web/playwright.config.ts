import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.E2E_PORT || 5173);
// Default to localhost (not 127.0.0.1) to avoid certain environments routing 127.0.0.1 via proxy in Firefox.
const host = process.env.E2E_HOST || "localhost";
const baseURL = process.env.E2E_BASE_URL || `http://${host}:${port}`;

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: `npm run dev -- --host ${host} --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        // Some environments force Firefox through a proxy (causing 502 to localhost).
        // Force direct connection for E2E against local dev server.
        launchOptions: {
          firefoxUserPrefs: {
            "network.proxy.type": 0,
          },
        },
      },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});


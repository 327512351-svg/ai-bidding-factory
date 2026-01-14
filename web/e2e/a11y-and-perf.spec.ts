import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function demoLogin(page: any) {
  await page.goto("/login?t=e2e-a11y");
  await expect(page.getByRole("heading", { name: /登录/ })).toBeVisible();
  await page.getByRole("button", { name: "演示：进入 authenticated（仅本地占位）" }).click();
  await expect(page.getByRole("heading", { name: /AI 投标助手 Web/ })).toBeVisible();
}

async function runA11y(page: any) {
  const results = await new AxeBuilder({ page })
    // We only assert serious/critical to reduce noise for placeholder UI.
    .options({ runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } })
    .analyze();

  const blocking = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
  expect(blocking, JSON.stringify(results.violations, null, 2)).toEqual([]);
}

test.describe("Task 20.3 a11y + perf + mobile", () => {
  test("a11y: key pages have no serious/critical WCAG A/AA violations", async ({ page }) => {
    await demoLogin(page);

    const paths = ["/", "/dashboard", "/help", "/checkpoint/final", "/notifications", "/reports"];
    for (const p of paths) {
      await page.goto(`${p}?t=e2e-a11y`);
      // basic smoke: page has a main heading
      await expect(page.getByRole("heading").first()).toBeVisible();
      await runA11y(page);
    }
  });

  test("perf: local page load stays within a conservative baseline", async ({ page, browserName }) => {
    await demoLogin(page);

    await page.goto("/dashboard?t=e2e-perf", { waitUntil: "networkidle" });

    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const fcp = performance.getEntriesByName("first-contentful-paint")[0] as PerformanceEntry | undefined;
      const resources = performance.getEntriesByType("resource");
      return {
        // durations in ms (may be 0/undefined in some cases; keep fail-closed checks below)
        domContentLoaded: nav ? nav.domContentLoadedEventEnd - nav.startTime : null,
        loadEvent: nav ? nav.loadEventEnd - nav.startTime : null,
        transferSize: nav ? nav.transferSize : null,
        resourceCount: resources.length,
        fcp: fcp ? fcp.startTime : null,
      };
    });

    // Fail-closed: metrics must exist; if they don't, we flag it by asserting non-null.
    expect(metrics.domContentLoaded).not.toBeNull();
    expect(metrics.loadEvent).not.toBeNull();
    expect(metrics.resourceCount).toBeGreaterThan(0);

    // Conservative thresholds for local dev; avoid flakiness across browsers.
    // Firefox can be slower in CI; keep looser bound.
    const dclMax = browserName === "firefox" ? 12_000 : 8_000;
    const loadMax = browserName === "firefox" ? 15_000 : 10_000;
    expect(metrics.domContentLoaded!).toBeLessThan(dclMax);
    expect(metrics.loadEvent!).toBeLessThan(loadMax);
    // Resource count baseline: placeholder app should remain reasonably small.
    expect(metrics.resourceCount).toBeLessThan(250);
  });

  test.describe("mobile: layout should remain usable on small viewport", () => {
    test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12-ish

    test("no horizontal overflow and key navigation available", async ({ page }) => {
      await demoLogin(page);
      await page.goto("/?t=e2e-mobile");

      await expect(page.getByRole("heading", { name: /AI 投标助手 Web/ })).toBeVisible();

      const hasOverflowX = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth + 1;
      });
      expect(hasOverflowX).toBe(false);

      // quick nav should exist on home for mobile too
      await expect(page.getByRole("heading", { name: "快速导航" })).toBeVisible();
    });
  });
});


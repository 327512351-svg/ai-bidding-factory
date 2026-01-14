import { test, expect } from "@playwright/test";

async function demoLogin(page: any) {
  await page.goto("/login?t=e2e");
  await expect(page.getByRole("heading", { name: /登录/ })).toBeVisible();
  await page.getByRole("button", { name: "演示：进入 authenticated（仅本地占位）" }).click();
  await expect(page.getByRole("heading", { name: /AI 投标助手 Web/ })).toBeVisible();
}

test.describe("Task 20.2 E2E (placeholder, fail-closed)", () => {
  test("unauthenticated is blocked from protected route", async ({ page }) => {
    await page.goto("/login?t=e2e-logout");
    // ensure logged out (button exists even when not authenticated; safe to click)
    await page.getByRole("button", { name: "退出（占位）" }).click();

    await page.goto("/dashboard?t=e2e");
    await expect(page.getByRole("heading", { name: "访问受限" })).toBeVisible();
    await expect(page.getByRole("link", { name: "前往登录/人工确认" })).toBeVisible();
  });

  test("demo login can access key pages and final checkpoint", async ({ page }) => {
    await demoLogin(page);

    await page.goto("/checkpoint/final?t=e2e");
    await expect(page.getByRole("heading", { name: "系统就绪验证（占位）" })).toBeVisible();

    await page.goto("/help?t=e2e");
    await expect(page.getByRole("heading", { name: "用户引导与帮助（占位）" })).toBeVisible();

    await page.goto("/monitoring?t=e2e");
    await expect(page.getByRole("heading", { name: /系统监控/ })).toBeVisible();

    await page.goto("/users?t=e2e");
    await expect(page.getByRole("heading", { name: /用户管理/ })).toBeVisible();
  });

  test("debug crash triggers error notice (ErrorBoundary)", async ({ page }) => {
    await demoLogin(page);
    await page.goto("/debug/crash?t=e2e");
    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page.getByText("页面发生错误（占位）")).toBeVisible();
    await expect(page.getByRole("button", { name: "返回首页" })).toBeVisible();
  });
});


import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", title: "Dashboard" },
  { path: "/sale", title: "Sale" },
  { path: "/customers", title: "Customers" },
  { path: "/reports", title: "Reports" },
  { path: "/rules", title: "Rules Engine" },
  { path: "/exceptions", title: "Exception Workbench" },
  { path: "/sales-mode", title: "Sales Mode" },
];

for (const route of routes) {
  test(`shell renders on ${route.path}`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("header").getByText("Myela TAG")).toBeVisible();
    await expect(page.locator("aside")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(route.title);
  });
}

test("sidebar navigation changes routes", async ({ page }) => {
  await page.goto("/");
  await page.locator("aside").getByRole("link", { name: "Sale", exact: true }).click();
  await expect(page).toHaveURL(/\/sale$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Sale");
});

test("portal dropdown opens from header", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch portal" }).click();
  await expect(page.getByText("Jump to another portal")).toBeVisible();
  await expect(page.getByRole("link", { name: /Myela TAG/ })).toBeVisible();
});

test("role switcher updates workspace mode", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch role" }).click();
  await page.getByRole("button", { name: "Agent Sales and onboarding support" }).click();
  await expect(page.locator("aside")).toContainText("Agent workspace active");
});

import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", title: "Dashboard" },
  { path: "/sale", title: "Sale" },
  { path: "/customers", title: "Customers" },
  { path: "/reports", title: "Reports" },
];

for (const route of routes) {
  test(`shell renders on ${route.path}`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("header").getByText("MSDEdge")).toBeVisible();
    await expect(page.locator("aside")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(route.title);
  });
}

test("sidebar navigation changes routes", async ({ page }) => {
  await page.goto("/");
  await page.locator("aside").getByText("Sale").click();
  await expect(page).toHaveURL(/\\/sale$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Sale");
});

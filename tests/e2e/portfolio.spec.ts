import { expect, test } from "@playwright/test";

test.describe("portfolio e2e", () => {
  test("home loads with hero and navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("reliable data systems");
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  });

  test("theme switcher toggles dark class", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await page.getByRole("radio", { name: "Dark theme" }).click();
    await expect(html).toHaveClass(/dark/);
    await page.getByRole("radio", { name: "Light theme" }).click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test("project filtering works on projects page", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("tab", { name: "Streaming" }).click();
    await expect(page.getByRole("tab", { name: "Streaming" })).toHaveAttribute("aria-selected", "true");
  });

  test("case-study page renders with repository link", async ({ page }) => {
    await page.goto("/projects/aws-book-data-pipeline");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("End-to-End Book Data Pipeline");
    await expect(page.getByRole("link", { name: /View Repository/ })).toBeVisible();
  });

  test("resume link points at the PDF", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Download Resume" }).first();
    await expect(link).toHaveAttribute("href", "/HoangMinhHai_DataEngineer_CV.pdf");
  });

  test("contact form validates required fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  });

  test("custom 404 page renders", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("404");
  });

  test("mobile menu opens and navigates", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Skills" }).click();
    await expect(page).toHaveURL(/\/skills/);
  });
});

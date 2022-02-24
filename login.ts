import { Page } from "puppeteer";

export default async function login(page: Page) {
  await page.goto("https://mf-paris.com/account/");
  await page.type("#username", process.env.USERNAME);
  await page.type("#password", process.env.PASSWORD);
  await Promise.all([
    page.waitForNavigation(),
    await page.keyboard.press("Enter"),
  ]);
}

import { Page } from "puppeteer";
import intercept from "./intercept";

async function getInformations(page: Page, url) {
  await intercept.removeIntercipeImage(page);
  await page.goto(url);
  const title = await getTitle(page);
  const reference = await getReference(page);
  const price = await getPrice(page);
  console.log(title, reference, price);
}

async function getTitle(page: Page) {
  return await page.$$eval("h1.product-page-title", (h1: Element[]) => {
    return h1[0].innerHTML;
  });
}

async function getReference(page: Page) {
  return await page.$$eval(
    "div.j-top div.wrap-content div.text-inline",
    (divs: Element[]) => {
      return divs[1].innerHTML;
    }
  );
}

async function getPrice(page: Page) {
  await page.waitForTimeout(1000);
  return await page.$$eval("div.j-top bdi", (bdi: Element[]) => {
    return bdi[0].innerHTML.split("<")[0];
  });
}

export default getInformations;

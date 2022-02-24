import { Page, WaitForOptions } from "puppeteer";

const loadOption: WaitForOptions = {
  waitUntil: "load",
  timeout: 0,
};

async function getProduits(page: Page, url) {
  await page.goto(url, loadOption);
  const pages = await getPages(page, url);
  let produits: string[] = await getProduitBlock(page);
  for (let i = 1; i < pages.length; i++) {
    console.log(pages[i]);
    await page.goto(pages[i], loadOption);
    const produitsPages = await getProduitBlock(page);
    produits = [...produits, ...produitsPages];
  }
  return produits;
}

async function getPages(page: Page, url: string) {
  const range = await page.$$eval("span.pages", (pages: Element[]) => {
    return pages[0].textContent;
  });
  const max = range.split(" ").at(-1);
  return Array.from({ length: Number(max) }, (_, i) => `${url}page/${i + 1}`);
}

async function getProduitBlock(page: Page) {
  const produits = await page.$$eval(
    "a.product-block",
    (elements: Element[]) => {
      return elements.map((e) => e.getAttribute("href"));
    }
  );
  return produits;
}

export default getProduits;

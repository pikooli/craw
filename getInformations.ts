import { Page } from "puppeteer";
import intercept from "./intercept";
import * as fs from "fs";
import * as https from "https";

//
async function getInformations({
  page,
  url,
  folder,
}: {
  page: Page;
  url: string;
  folder: string;
}) {
  const path = `public/${folder}`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
  await intercept.removeIntercipeImage(page);
  await page.goto(url);
  const title = await getTitle(page);
  const reference = await getReference(page);
  const price = await getPrice(page);
  const description = await getDescription(page);
  const image = await getImage({ page, name: reference, folder });
  return { title, reference, price, description };
}

//
async function getTitle(page: Page) {
  return await page.$$eval("h1.product-page-title", (h1: Element[]) => {
    return h1[0].innerHTML;
  });
}

//
async function getReference(page: Page) {
  return await page.$$eval(
    "div.j-top div.wrap-content div.text-inline",
    (divs: Element[]) => {
      return divs[1].innerHTML;
    }
  );
}

//
async function getPrice(page: Page) {
  return await page.$$eval("div.j-top bdi", (bdi: Element[]) => {
    return bdi[0].innerHTML.split("<")[0];
  });
}

//
async function getDescription(page: Page) {
  return await page.$$eval("div.j-top p:not([class])", (p: Element[]) => {
    return p.map((e) => e.innerHTML).join(" ");
  });
}

//
async function getImage({
  page,
  name,
  folder,
}: {
  page: Page;
  name: string;
  folder: string;
}) {
  const url = await page.$$eval(
    "div.j-between div.slide",
    (images: Element[]) => {
      return window.getComputedStyle(images[0]).backgroundImage.slice(5, -2);
    }
  );
  https.get(url, (res) => {
    const stream = fs.createWriteStream(`public/${folder}/${name}.jpg`);
    res.pipe(stream);
    stream.on("finish", () => {
      stream.close();
    });
  });
}

export default getInformations;

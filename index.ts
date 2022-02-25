require("dotenv").config();
import { Page } from "puppeteer";
import * as puppeteer from "puppeteer";
import login from "./login";
import getProduits from "./getProduits";
import intercept from "./intercept";
import getInformations from "./getInformations";
import saveInformations from "./saveInformations";

const headless = true;
const URL = "https://mf-paris.com/categorie-produit/";
const CATEGORIES = [
  // "pendentifs",
  "bracelets",
  "bagues",
  "piercing",
  "cheville",
  "boucles-d-oreilles",
  "colliers",
  "tatouage",
];

async function processInformation(
  page: Page,
  produitUrls: string[],
  caterogie: string
) {
  let informations = [];
  for (let i = 0; i < produitUrls.length; i++) {
    const information = await getInformations({
      page,
      url: produitUrls[i],
      folder: caterogie,
    });
    informations.push(information);
  }
  saveInformations({ datas: informations, folder: "pendentifs" });
}

async function process(page: Page) {
  for (let i = 0; i < CATEGORIES.length; i++) {
    const produitUrls = await getProduits(page, `${URL}${CATEGORIES[i]}/`);
    await processInformation(page, produitUrls, CATEGORIES[i]);
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();

  await intercept.intercipeImage(page);
  await login(page);
  await process(page);
})();

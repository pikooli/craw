require("dotenv").config();
import * as puppeteer from "puppeteer";
import login from "./login";
import getProduits from "./getProduits";
import intercept from "./intercept";
import getInformations from "./getInformations";

const PENDENTIFS = "https://mf-paris.com/categorie-produit/accueil/pendentifs/";
const headless = false;

(async () => {
  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();

  await intercept.intercipeImage(page);
  await login(page);
  await getInformations(
    page,
    "https://mf-paris.com/produit/pendentif-acier-croix-8/"
  );
  // const produitUrls = await getProduits(page, PENDENTIFS);
})();

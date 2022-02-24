import { Page } from "puppeteer";

const intercepImageFunction = (req) => {
  if (req.resourceType() === "image") {
    req.abort();
  } else {
    req.continue();
  }
};

async function intercipeImage(page: Page) {
  await page.setRequestInterception(true);
  page.on("request", intercepImageFunction);
}

async function removeIntercipeImage(page: Page) {
  page.removeAllListeners("request");
  await page.setRequestInterception(false);
}

export default {
  intercipeImage,
  removeIntercipeImage,
};

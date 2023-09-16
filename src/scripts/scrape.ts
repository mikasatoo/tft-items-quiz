import puppeteer, { ElementHandle } from "puppeteer";

void (async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://tftactics.gg/item-builder", {
    waitUntil: "networkidle0",
    timeout: 90000,
  });

  await page.waitForSelector(".characters-list > div");

  const divs = await page.$$(".characters-list > div");

  for (const div of divs) {
    await div.click();
    const table: ElementHandle<Element> | null = await page.$(".rt-table");
    const descriptionDiv = await table?.$(".item-bonus");
    const itemImages = await table?.$$(".rt-table .character-icon");

    const components: any[] = [];

    for (const img of itemImages!) {
      if (img) {
        const src = await img.getProperty("src");
        const name = await img.getProperty("alt");
        const nameValue = await name.jsonValue();
        const srcValue = await src.jsonValue();
        components.push({ src: srcValue, name: nameValue });
      }
    }

    const description = await page.evaluate(
      (el) => el?.textContent,
      descriptionDiv
    );
    console.log({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      baseComponent1: components[0],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      baseComponent2: components[1],
      description,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      combinedItem: components[2],
    });
  }

  await browser.close();
})();

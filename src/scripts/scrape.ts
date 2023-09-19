import puppeteer, { ElementHandle } from 'puppeteer';

void (async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://tftactics.gg/item-builder", {
    waitUntil: "networkidle0",
    timeout: 90000,
  });

  // Select item divs
  await page.waitForSelector(".characters-list > div");
  const itemDivs = await page.$$(".characters-list > div");

  // Loop through item divs to retrieve data
  for (const itemDiv of itemDivs) {
    await itemDiv.click();
    const table: ElementHandle<Element> | null = await page.$(".rt-table");
    const descriptionDiv = await table?.$(".item-bonus");
    const itemImgs = await table?.$$(".character-icon");

    const description = await page.evaluate(el => el?.textContent, descriptionDiv);
    
    const components: any[] = [];
    // *** BELOW ***
    for (const itemImg of itemImgs) {
      if (itemImg) {
        const src = await itemImg.getProperty("src");
        const name = await itemImg.getProperty("alt");
        const nameValue = await name.jsonValue();
        const srcValue = await src.jsonValue();
        components.push({ src: srcValue, name: nameValue });
      }
    }

    console.log({
      description,
      baseItem1: components[0],
      baseItem2: components[1],
      combinedItem: components[2],
    });
  }

  // Close the browser
  await browser.close();
})();
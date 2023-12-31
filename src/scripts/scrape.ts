import puppeteer, { ElementHandle } from 'puppeteer';
import fs from 'fs';

// Define types of objects
type component = {
  src: string
  name: string
}
type combinedItem = {
  combinedItem: component
  baseItem1: component
  baseItem2: component
  ability: string | null | undefined
}

void (async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://tftactics.gg/item-builder", {
    waitUntil: "networkidle0",
    timeout: 90000,
  });

  // Close the video player (could block some item divs)
  const closeVideoDiv = await page.$("div#closeIconHit");
  await closeVideoDiv?.click();

  // Select the combined items
  await page.waitForSelector(".characters-list");
  const charactersLists = await page.$$(".characters-list");
  const itemDivs = await charactersLists[1].$$("div:first-child");  // only want the combined items info

  // Loop through the items to retrieve their data
  const scrapedItems: string[] = [];
  const combinedItems: combinedItem[] = [];

  for (const itemDiv of itemDivs) {
    await itemDiv.click();

    const table: ElementHandle<Element> | null = await page.$(".rt-table");
    const descriptionDiv = await table?.$(".item-bonus");
    const itemImgs = await table?.$$(".character-icon");
    
    const description = await page.evaluate(el => el?.textContent, descriptionDiv);
    
    const components: component[] = [];
    for (const itemImg of itemImgs!) {
      if (itemImg) {
        const src = await itemImg.getProperty("src");
        const name = await itemImg.getProperty("alt");
        const nameValue = await name.jsonValue();
        const srcValue = await src.jsonValue();
        components.push({ src: (srcValue as string), name: (nameValue as string) });
      }
    }

    // Check item hasn't already been scraped
    const combinedItemName: string = components[2].name;
    
    if (scrapedItems.includes(combinedItemName)) {
      console.log(combinedItemName, "has already been scraped");
    } else {
      combinedItems.push({
        combinedItem: components[2],
        baseItem1: components[0],
        baseItem2: components[1],
        ability: description,
      });
      scrapedItems.push(combinedItemName);
    }
  }

  // Create new file with the combinedItems object
  const content = combinedItems;
  fs.writeFile('./src/helper/scrapedItemsData.json', JSON.stringify(content, null, 2), err => {
    if (err) {
      console.error(err);
    }
  });
  
  // Close the browser
  await browser.close();

  console.log(combinedItems.length, " items scraped.");
})();
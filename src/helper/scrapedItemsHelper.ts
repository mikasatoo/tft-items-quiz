import scrapedItemsData from './scrapedItemsData.json';

// Define type of Item objects
type Item = {
    name: string
    img: string
    baseItem1: string
    baseItem1Img: string
    baseItem2: string
    baseItem2Img: string
    ability: string
    used: boolean
}

// Define items array
const items: Item[] = [];

// Add all items to the array
scrapedItemsData.forEach((item) => {
    if (item.ability === "-") return;   // skip items where the ability is just "-" (there are a few of these on the webpage being scraped)

    let editedAbility = item.ability;
    if (editedAbility.includes("\n\n")) {
        editedAbility = item.ability.split("\n\n").join(" ");
    } else if (editedAbility.includes("\n")) {
        editedAbility = item.ability.split("\n").join(" ");
    }

    items.push({
        name: item.combinedItem.name,
        img: item.combinedItem.src,
        baseItem1: item.baseItem1.name,
        baseItem1Img: item.baseItem1.src,
        baseItem2: item.baseItem2.name,
        baseItem2Img: item.baseItem2.src,
        ability: editedAbility,
        used: false
    })
});

export { items };
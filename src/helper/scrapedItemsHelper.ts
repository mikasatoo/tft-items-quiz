import scrapedItemsData from './scrapedItemsData.json';

// Define type of Item objects
type Item = {
    item: string
    itemImg: string
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
scrapedItemsData.forEach((item) => 
    items.push({
        item: item.combinedItem.name,
        itemImg: item.combinedItem.src,
        baseItem1: item.baseItem1.name,
        baseItem1Img: item.baseItem1.src,
        baseItem2: item.baseItem2.name,
        baseItem2Img: item.baseItem2.src,
        ability: item.ability,
        used: false
    })
);

export { items };
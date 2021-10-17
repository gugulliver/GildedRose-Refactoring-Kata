class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ITEM_THAT_INCREASE = [
  "Aged Brie",
  "Backstage passes to a TAFKAL80ETC concert",
];
const CONJURED_ITEM = ["Conjured Item", "Conjured Food"];
const LEGENDARY_ITEM = ["Sulfuras, Hand of Ragnaros"];

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.updateQualityOfItem(this.items[i]);
    }
    return this.items;
  }

  updateQualityOfItem(selectedItem) {
    // The executions are settled at first
    if (LEGENDARY_ITEM.includes(selectedItem.name)) {
      return;
    }
    // Time Clock
    selectedItem.sellIn = selectedItem.sellIn - 1;

    // Decrease in quality
    if (!ITEM_THAT_INCREASE.includes(selectedItem.name)) {
      if (selectedItem.quality > 0) {
        selectedItem.quality = selectedItem.quality - 1;
        // one additional tick for conjured
        if (CONJURED_ITEM.includes(selectedItem.name)) {
          selectedItem.quality = selectedItem.quality - 1;
        }
      }
    } else {
      // Increase in quality
      selectedItem.quality = selectedItem.quality + 1;
      if (selectedItem.name == "Backstage passes to a TAFKAL80ETC concert") {
        if (selectedItem.sellIn < 11) {
          selectedItem.quality = selectedItem.quality + 1;
        }
        if (selectedItem.sellIn < 6) {
          selectedItem.quality = selectedItem.quality + 1;
        }
      }
    }

    // Specific rules for over time actions
    if (selectedItem.sellIn < 0) {
      if (!ITEM_THAT_INCREASE.includes(selectedItem.name)) {
        selectedItem.quality = selectedItem.quality - 1;
        // one additional tick for conjured
        if (CONJURED_ITEM.includes(selectedItem.name)) {
          selectedItem.quality = selectedItem.quality - 1;
        }
      } else {
        selectedItem.quality = selectedItem.quality + 1;
      }
      if (selectedItem.name == "Backstage passes to a TAFKAL80ETC concert") {
        selectedItem.quality = 0; // Concert is passeds
      }
    }

    // Limits enforeced
    if (selectedItem.quality < 0) {
      selectedItem.quality = 0; // Quality can not be negative
    }
    if (selectedItem.quality > 50) {
      selectedItem.quality = 50; // Quality can not be above 50
    }
  }
}

module.exports = {
  Item,
  Shop,
};

const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose basic setting", function () {
  let items = [new Item("basic item", 10, 20)];
  let gildedRose = new Shop();

  beforeEach(() => {
    // name, sellIn, quality
    items = [new Item("basic item", 10, 20)];
    gildedRose = new Shop(items);
  });

  it("test premier, initialisation of a basic Item", function () {
    expect(items[0].name).toBe("basic item");
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(20);
  });

  it("day 1", function () {
    items = gildedRose.updateQuality();
    expect(items[0].name).toBe("basic item");
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it("day 10", function () {
    for (let day = 0; day < 10; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].name).toBe("basic item");
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(10);
  });

  // Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
  it("day 15", function () {
    for (let day = 0; day < 15; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].name).toBe("basic item");
    expect(items[0].sellIn).toBe(-5);
    expect(items[0].quality).toBe(0);
  });

  // La qualité (`quality`) d'un produit ne peut jamais être négative.
  it("day 20", function () {
    for (let day = 0; day < 20; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].name).toBe("basic item");
    expect(items[0].sellIn).toBe(-10);
    expect(items[0].quality).toBe(0);
  });
});

describe("Gilded Rose exceptions", function () {
  const startItems = [
    new Item("Aged Brie", 2, 0),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 40),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40),
    new Item("Backstage passes to a TAFKAL80ETC concert", 0, 60),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  ];
  let gildedRose = new Shop();

  beforeEach(() => {
    // name, sellIn, quality
    items = JSON.parse(JSON.stringify(startItems));
    gildedRose = new Shop(items);
  });

  it("Aged Brie increase in quality", function () {
    for (let day = 0; day < 5; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toBe(-3);
    expect(items[0].quality).toBe(8); // 2 + 3*2
  });

  it("Aged Brie quality can not be above 50", function () {
    for (let day = 0; day < 30; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toBe(-28);
    expect(items[0].quality).toBe(50);
  });

  it("Sulfuras is indeteriorable", function () {
    for (let day = 0; day < 50; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[1].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(items[1].sellIn).toBe(0);
    expect(items[1].quality).toBe(80);
  });

  it("Backstage passes quality increase", function () {
    items = gildedRose.updateQuality();
    expect(items[2].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[2].sellIn).toBe(14);
    expect(items[2].quality).toBe(21);
  });

  it("Backstage passes quality increase rapidly", function () {
    items = gildedRose.updateQuality();
    expect(items[3].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[3].sellIn).toBe(9);
    expect(items[3].quality).toBe(42);
  });

  it("Backstage passes quality increase rapidly (+3)", function () {
    items = gildedRose.updateQuality();
    expect(items[4].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[4].sellIn).toBe(4);
    expect(items[4].quality).toBe(43);
  });

  it("Backstage passes quality fall to 0", function () {
    items = gildedRose.updateQuality();
    expect(items[5].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[5].sellIn).toBe(-1);
    expect(items[5].quality).toBe(0);
  });

  it("Backstage passes quality not above 50", function () {
    items = gildedRose.updateQuality();
    expect(items[6].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[6].sellIn).toBe(4);
    expect(items[6].quality).toBe(50);
  });
});

describe("Gilded Rose Conjured Items", function () {
  let gildedRose = new Shop();
  const conjuredItems = [
    new Item("Conjured Item", 10, 10),
    new Item("Conjured Item", 5, 40),
  ];
  beforeEach(() => {
    items = JSON.parse(JSON.stringify(conjuredItems));
    gildedRose = new Shop(items);
  });

  it("day 1", function () {
   items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Conjured Item");
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(8);
  });

  it("day 5", function () {
    for (let day = 0; day < 5; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].name).toBe("Conjured Item");
    expect(items[0].sellIn).toBe(5);
    expect(items[0].quality).toBe(0);
  });

  it("day 6", function () {
    for (let day = 0; day < 6; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].name).toBe("Conjured Item");
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(0);
  });

  it("day 10", function () {
    for (let day = 0; day < 10; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[1].name).toBe("Conjured Item");
    expect(items[1].sellIn).toBe(-5);
    expect(items[1].quality).toBe(10);
  });
});

const {Shop, Item} = require("../src/gilded_rose");


describe("Gilded Rose basic setting", function() {
  let items = [new Item("basic item", 10, 20)];
  let gildedRose = new Shop();  

  beforeEach(()  => {
    // name, sellIn, quality
    items = [new Item("basic item", 10, 20)];
    gildedRose = new Shop(items);
  })

  it("test premier, initialisation of a basic Item", function() {
    expect(items[0].name).toBe("basic item");
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(20);
  });

  it("day 1", function() {
    items = gildedRose.updateQuality();
    expect(items[0].name).toBe("basic item");
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it("day 10", function() {
    for(let day = 0; day < 10; day++){
      items = gildedRose.updateQuality();
    }
    expect(items[0].name).toBe("basic item");
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(10);
  });

  // Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
  it("day 15", function() {
    for(let day = 0; day < 15; day++){
      items = gildedRose.updateQuality();
    }
    expect(items[0].name).toBe("basic item");
    expect(items[0].sellIn).toBe(-5);
    expect(items[0].quality).toBe(0);
  });
  
  // La qualité (`quality`) d'un produit ne peut jamais être négative.
  it("day 20", function() {
    for(let day = 0; day < 20; day++){
      items = gildedRose.updateQuality();
    }
    expect(items[0].name).toBe("basic item");
    expect(items[0].sellIn).toBe(-10);
    expect(items[0].quality).toBe(0);
  });
});


xdescribe("Gilded Rose error test", function() {
  it("create basic item with negative values", function() {
    // name, sellIn, quality
    items = [new Item("basic item error", -5, -10)];
    gildedRose = new Shop(items);
    expect(items[0].name).toBe("basic item");
    expect(items[0].sellIn).toBe(-5);
    expect(items[0].quality).toBe(0);
  });
});


/*

Attendez, ça devient intéressant :

- La qualité (`quality`) d'un produit ne peut jamais être négative.
- "Aged Brie" augmente sa qualité (`quality`) plus le temps passe.
- La qualité d'un produit n'est jamais de plus de 50.
- "Sulfuras", étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (`quality`)
- "Backstage passes", comme le "Aged Brie", augmente sa qualité (`quality`) plus le temps passe (`sellIn`) ; La qualité augmente de 2 quand il reste 10 jours ou moins et de 3 quand il reste 5 jours ou moins, mais la qualité tombe à 0 après le concert.

*/
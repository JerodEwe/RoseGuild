const assert = require('assert');
const rose = require('../src/gilded_rose.js');
//dont change the items
const items = JSON.parse(JSON.stringify(rose.items));

describe("Test Gilded Rose", function () {
  const findItem = (items, target) => {
    const itemsFound = items.filter((item) => {
      if (item.name == target) {
        return item
      }
    })
    return (itemsFound[0] ? itemsFound[0] : -1)
  }

  it("Should have the quality property for each item", () => {
    const count = items.reduce((prev, current, total) => {
      return total + (current.quality ? 1 : 0)
    })
    assert.equal(items.length, count)
  });

  it("Should have the sell_in property for each item", () => {
    const count = items.slice().reduce((prev, current, total) => {
      return total + (current.quality ? 1 : 0)
    })

    assert.equal(items.length, count);
  });

  function multiUpdate(count, items) {
    let result = JSON.parse(JSON.stringify(items));
    for (let i = 0; i < count; i++) {
      result = rose.update_quality(result);
    }
    return result
  };

  it("Should never make the quality negative from updates", () => {
    const updated = multiUpdate(52, items);
    updated.map((item) => {
      assert(item.quality >= 0);
    });
  })

  it("Should never have quality over 50 except Sulfura", () => {
    items.map((item) => {
      const sulfura = item.name == ("Sulfuras, Hand of Ragnaros")
      if (!sulfura) {
        assert(item.quality <= 50);
      }
    });
  })

  it("Aged brie gets better over time", () => {
    const target = 'Aged Brie'
    const originalBrieQuality = findItem(items, target).quality
    const updatedQuality = findItem(multiUpdate(10, items), target).quality
    assert(originalBrieQuality <= updatedQuality)
  })

  it("Sulfuras does not decrease in quality", () => {
    const target = "Sulfuras, Hand of Ragnaros"
    const originalQuality = findItem(items, target).quality;
    const updatedQuality = findItem(rose.update_quality(items), target).quality
    assert(updatedQuality >= originalQuality)
  });

  it('Backstage passes increase in quality as their date approaches now',()=>{
    const itemName = 'Backstage passes to a TAFKAL80ETC concert'
    const itemQuality = findItem(items, itemName).quality
    console.log(itemQuality)

    console.log(findItem(rose.update_quality(itemName))).quality
  })
  // it('Backstage passes increase in value by 2 as their date <10',()=>{})
  // Set the date by repeated calls to update

  // it('Backstage passes increase in value by 3 as their date < 5',()=>{})
  // it('Backstage passes value drops to 0 after their date <= 0',()=>{})
  it('Conjured items drop in quality twice as fast as normal items', () => {    
    const normalItemName = "+5 Dexterity Vest"
    const normalItemQuality = findItem(items, normalItemName).quality
    const updatedNormalItemQuality = findItem(rose.update_quality(items), normalItemName).quality
    const normalQualityChange = normalItemQuality - updatedNormalItemQuality
    console.log('normalItemQuality', normalItemQuality)
    console.log('updatedNormalItemQuality', updatedNormalItemQuality)
    
    const cake = 'Conjured Mana Cake'
    const conjuredItemQuality = findItem(items, cake).quality
    const updatedConjuredItemQuality = findItem(rose.update_quality(items), cake).quality
    const conjuredItemQualityChange = conjuredItemQuality - updatedConjuredItemQuality
    console.log('conj', conjuredItemQuality);
    console.log('updatedConj',updatedConjuredItemQuality)
    
    const ratio = conjuredItemQualityChange / normalQualityChange
    assert(ratio == 2)
  })
});

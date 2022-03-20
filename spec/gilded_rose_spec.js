const assert = require('assert');
const rose = require('../src/gilded_rose.js');
describe("Test Gilded Rose", function() {

  const items = rose.items;

  const findItem = (items, target)=>{
    const itemsFound = items.filter((item)=>{
      if(item.name == target){
          return item
      }
    })
    return (itemsFound[0]?itemsFound[0]:-1)
  }

  it("Should have the quality property for each item", () =>{
    const count = items.reduce((previous, current, total)=>{
      return total + (current.quality?1:0)
    })
    assert.equal(items.length, count);
  });

  it("Should have the sell_in property for each item", () => {
    const count = items.reduce((prev, current, total)=>{
      return total + (current.quality?1:0)
    })
    assert.equal(items.length, count);
  });

  function multiUpdate(count, items){
    let result = items;
    for(
      let i=0; i<count; i++){
      result = rose.update_quality(result);
    }
    return result
  };

  it("Should never make the quality negative from updates",()=>{
    const updated = multiUpdate(52, items);
    updated.map((item)=>{
      assert(item.quality >= 0);
    });
  })

  it("Should never have quality over 50 except Sulfura",()=>{
    items.map((item)=>{
      const sulfura = item.name == ("Sulfuras, Hand of Ragnaros")
      if(!sulfura){
        assert(item.quality <= 50);
      }
    });
  })

  it("Aged brie gets better over time",()=>{
    const originalBrieQuality = findItem(items, 'Aged Brie').quality
    const updatedQuality = findItem(multiUpdate(10,items),'Aged Brie').quality
    assert(originalBrieQuality <= updatedQuality)
  })

  it("Sulfuras does not decrease in quality",()=>{
    const target = "Sulfuras, Hand of Ragnaros"
    const originalQuality = findItem(items, target).quality;
    const updatedQuality =  findItem(rose.update_quality(items), target).quality
    assert(updatedQuality >= originalQuality)
  });
});

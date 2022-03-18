const assert = require('assert');
const rose = require('../src/gilded_rose.js');
describe("Test Gilded Rose", function() {

  let items = rose.items;

  it("should have the quality property for each item", () =>{
    let count = items.reduce((previous, current, total)=>{
      return total + (current.quality?1:0)
    })
    assert.equal(items.length, count);
  });

  it("should never have quality over 50 except Sulfura",()=>{
    items.map((item)=>{
      let sulfura = item.name.includes('Sulfura')
      if(!sulfura){
        assert(item.quality <= 50);
      }
    });
  })

  it("should have the sell_in property for each item", () => {
    let count = items.reduce((prev, current, total)=>{
      return total + (current.quality?1:0)
    })
    assert.equal(items.length, count);
  });

  function multiUpdate(count){
    let result;
    for(let i=0; i<count;i++){
      result = rose.update_quality();
    }
    return result
  };

  it("should never make the quality negative from updates",()=>{
    let updated = multiUpdate(52);
    updated.map((item)=>{
      assert(item.quality >= 0);
    });
  })

});

const assert = require('assert');
const rose = require('../src/gilded_rose.js');
describe("Test Gilded Rose", function() {

  it("should all have the \'quality\' property", function() {
    let items = rose.update_quality();
    let count = items.reduce((previous, current, total)=>{
      return total + (current.quality?1:0)
    })
    assert.equal(items.length, count);
  });
});

const { it } = require("mocha");

//Dont touch, demons!
function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

//Dont touch, demons!
var items = []
items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality(items) {
  // for (var i = 0; i < items.length; i++) {
  //   if (items[i].name != 'Conjured Mana Cake' && items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //     if (items[i].quality > 0) {
  //       if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //         items[i].quality = items[i].quality - 1
  //       }
  //     }
  //   } else {
  //     if (items[i].quality < 50) {
  //       items[i].quality = items[i].quality + 1
  //       if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
  //         if (items[i].sell_in < 11) {
  //           if (items[i].quality < 50) {
  //             items[i].quality = items[i].quality + 1
  //           }
  //         }
  //         if (items[i].sell_in < 6) {
  //           if (items[i].quality < 50) {
  //             items[i].quality = items[i].quality + 1
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //     items[i].sell_in = items[i].sell_in - 1;
  //   }
  //   if (items[i].sell_in < 0) {
  //     if (items[i].name != 'Aged Brie') {
  //       if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //         if (items[i].quality > 0) {
  //           if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //             items[i].quality = items[i].quality - 1
  //           }
  //           if (items[i].name == 'Conjured Mana Cake' && items[i].quality > 2){
  //             items[i].quality = items[i].quality - 2
  //           }
  //         }
  //       } else {
  //         items[i].quality = items[i].quality - items[i].quality
  //       }
  //     } else {
  //       if (items[i].quality < 50) {
  //         items[i].quality = items[i].quality + 1
  //       }
  //     }
  //   }
  // }

  const update = (item, sell_inChange, qualityChange)=>{
    if((qualityChange + item.quality) < 0){
      //Dont change below zero
      return update(item,-1,-item.quality)
    }
    return new Item(
      item.name, 
      item.sell_in + sell_inChange, 
      item.quality + qualityChange)
  }

  const backStagePass = (item)=>{
    console.log('item: ', item)
    if(item.sell_in <= 0){
      return new Item(
        item.name, 
        item.sell_in - 1, 
        0)
    }
    if(item.sell_in <= 5){
      return update(item,-1,3);
    }
    if(item.sell_in <= 10){
      return update(item,-1,2)
    }
    return update(item,-1,1)
  }

  const updatedItems = items.map((item)=>{
    switch(item.name){
      case '+5 Dexterity Vest':
        return update(item,-1,-1)
      case 'Aged Brie':
        return update(item,-1,1)
      case 'Elixir of the Mongoose':
        return update(item,-1,-1)
      case 'Sulfuras, Hand of Ragnaros':
        return update(item,0,0)
      case 'Backstage passes to a TAFKAL80ETC concert':
        return backStagePass(item)
      case 'Conjured Mana Cake':
        return update(item,-1,-2)
      default:
        return 'item not recognized.'
    }
  })
  return updatedItems
}

exports.items = items;
exports.update_quality = update_quality;
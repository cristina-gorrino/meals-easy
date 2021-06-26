module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  //this.totalPrice = Math.round(oldCart.totalPrice) || 0;
  //Add new item to the cart
  this.add = (item, id) => {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {
        item_id: item.id,
        item_name: item.recipe_name,
        item_price: item.unit_price,
        quantity: 0,
        unit_price: 0,
      };
    }
    storedItem.quantity++;
    storedItem.unit_price = storedItem.item_price * storedItem.quantity;
    this.totalQty++;
    
    this.totalPrice = getTotalPrice();
  };

  this.reduceByOne = (id) => {
    this.items[id].quantity--;
    this.totalQty--;
    //this.totalPrice = Math.round(this.totalPrice - this.items[id].item_price);

    if (this.items[id].quantity <= 0) {
      delete this.items[id];
    }
  };

  this.addByOne = (id) => {
    this.items[id].quantity++;
    this.totalQty++;
    //this.totalPrice = Math.round(this.totalPrice + this.items[id].unit_price);
  };

  this.generateArray = () => {
    const arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };

  getTotalPrice = () => {
    var arr = this.generateArray();
    console.log(arr);
    var totalPrice =0;
    for (var i =0; i < arr.length; i++) {
      console.log(arr[i].unit_price)
       totalPrice = Math.round((totalPrice + arr[i].unit_price) *100) / 100;
    }
    return totalPrice;
  }
  this.totalPrice = getTotalPrice();
  console.log(this.totalPrice)
};

// module.exports = function Cart(oldCart) {
//   this.items = oldCart.items || {};
//   this.totalQty = oldCart.totalQty || 0;
//   this.totalPrice = oldCart.totalPrice || 0;
//   //Add new item to the cart
//   this.add = (item, id) => {
//     let storedItem = this.items[id];
//     if (!storedItem) {
//       storedItem = this.items[id] = { item: item, quantity: 0, unit_price: 0 };
//     }
//     storedItem.quantity++;
//     storedItem.unit_price = item(storedItem.unit_price) * storedItem.quantity;
//     this.totalQty++;
//     this.totalPrice += storedItem.unit_price;
//   };

//   this.generateArray = () => {
//     const arr = [];
//     for (var id in this.items) {
//       arr.push(this.items[id]);
//     }
//     return arr;
//   };
// };

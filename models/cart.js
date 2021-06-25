module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  //Add new item to the cart
  this.add = (item, id) => {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {
        item: item,
        quantity: 0,
        unit_price: 0,
      };
    }
    storedItem.quantity++;
    storedItem.unit_price = storedItem.item.unit_price * storedItem.quantity;
    this.totalQty++;
    this.totalPrice += storedItem.unit_price;
  };

  this.reduceByOne = (id) => {
    this.items[id].quantity--;
    this.totalQty--;
    this.totalPrice -= this.items[id].item.unit_price;

    if (this.items[id].quantity <= 0) {
      delete this.items[id];
    }
  };

  this.addByOne = (id) => {
    this.items[id].quantity++;
    this.totalQty++;
    this.totalPrice += this.items[id].unit_price;
  };

  this.generateArray = () => {
    const arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
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

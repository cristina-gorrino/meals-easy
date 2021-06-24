module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  //Add new item to the cart
  this.add = (item, id) => {
    const storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, quantity: 0, unit_price: 0 };
    }
    storedItem.quantity++;
    storedItem.price = storedItem.item.unit_price['1000'] * storedItem.quantity;
    this.totalQty++;
    this.totalPrice = (oldCart.totalPrice || 0) + storedItem.price;
  };

  this.reduceByOne = function(id){
    this.items[id].qty--;
    this.totalQty--;
    this.totalPrice -= this.items[id].item.price;

    if (this.items[id].qty <= 0) {
        delete this.items[id];
    }
};

this.addByOne = function (id) {
    this.items[id].qty++;
    this.totalQty ++;
    this.totalPrice += this.items[id].price;
};

  this.generateArray = () => {
    const arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};

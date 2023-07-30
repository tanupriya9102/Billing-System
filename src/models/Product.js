// models/Product.js
class Product {
    constructor(id, name, price, type) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.type = type; // 'product' or 'service'
    }
  }
  
  module.exports = Product;
  
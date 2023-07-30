// controllers/productController.js

const Product = require('../models/Product');

let products = [
  new Product(1, 'Product A', 1000, 'product'),
  new Product(2, 'Product B', 2000, 'product'),
  new Product(101, 'Service X', 2000, 'service'),
  // Add more products...
];

// Fetch all products API
function getAllProducts(req, res) {
  res.json(products);
}

module.exports = { getAllProducts, products }; // Export the products array

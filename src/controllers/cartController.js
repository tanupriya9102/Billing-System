// controllers/cartController.js
const Cart = require('../models/cart'); // Import the Cart class

// controllers/cartController.js
const ProductController = require('./productController'); // Import the productController.js

// In-memory data for the cart
let cart = new Cart();

// Add product or service to the cart API
function addToCart(req, res) {
  const { itemId, quantity } = req.body;
  const itemToAdd = ProductController.products.find((product) => product.id === itemId); // Access products array from productController.js

  if (!itemToAdd) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  const existingItemIndex = cart.items.findIndex((item) => item.item.id === itemId);

  if (existingItemIndex !== -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({ item: itemToAdd, quantity });
  }

  res.status(200).json(cart);
}

// View cart API
function viewCart(req, res) {
  res.status(200).json(cart);
}

module.exports = { addToCart, viewCart };

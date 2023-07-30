// controllers/cartController.js
const ProductController = require('./productController');
const Cart = require('../models/cart');

let cart = new Cart();

// Add product or service to the cart API
function addToCart(req, res) {
  const { itemId, type, quantity } = req.body;
  const itemToAdd = ProductController.products.find((item) => item.id === itemId && item.type === type);

  if (!itemToAdd) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  const existingItemIndex = cart.items.findIndex((item) => item.item.id === itemId && item.item.type === type);

  if (existingItemIndex !== -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({ item: itemToAdd, quantity });
  }

  // Calculate total bill and taxes
  let totalBill = 0;
  let totalTax = 0;

  cart.items.forEach((cartItem) => {
    const { price, type } = cartItem.item;
    const itemQuantity = cartItem.quantity;

    // Calculate taxes based on item type and price range
    let taxPercentage = 0;
    let flatTaxAmount = 0;

    if (type === 'product') {
      if (price > 1000 && price <= 5000) {
        taxPercentage = 0.12;
      } else if (price > 5000) {
        taxPercentage = 0.18;
      }
      // Apply Tax PC (flat tax amount of 200) for each quantity of the product
      flatTaxAmount = 200 * itemQuantity;
    } else if (type === 'service') {
      if (price > 1000 && price <= 8000) {
        taxPercentage = 0.1;
      } else if (price > 8000) {
        taxPercentage = 0.15;
      }
      // Apply Tax SC (flat tax amount of 100) for each quantity of the service
      flatTaxAmount = 100 * itemQuantity;
    }

    const itemTotal = price * itemQuantity;
    const taxAmount = itemTotal * taxPercentage;
    totalTax += taxAmount + flatTaxAmount;
    totalBill += itemTotal + taxAmount + flatTaxAmount;
  });

  // Update cart with total bill and taxes
  cart.totalBill = totalBill;
  cart.totalTax = totalTax;

  res.status(200).json(cart);
}

// View cart API (unchanged)
function viewCart(req, res) {
  res.status(200).json(cart);
}

module.exports = { addToCart, viewCart };

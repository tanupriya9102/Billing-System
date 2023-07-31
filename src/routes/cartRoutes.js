// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add item to cart
router.post('/cart', cartController.addToCart);

// View cart
router.get('/cart/:username', cartController.viewCart);

// Remove an item from the cart
router.delete('/cart/remove/:username/:itemName', cartController.removeFromCart);

// Clear the cart
router.delete('/cart/clear/:username', cartController.clearCart);

module.exports = router;

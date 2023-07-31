// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add item to cart
router.post('/cart', cartController.addToCart);

// View cart
router.get('/cart/:username', cartController.viewCart);

module.exports = router;

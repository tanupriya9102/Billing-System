// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add product or service to the cart route
router.post('/add', cartController.addToCart);

// View cart route
router.get('/view', cartController.viewCart);

module.exports = router;

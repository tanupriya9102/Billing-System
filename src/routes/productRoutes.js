// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products route
router.get('/products', productController.getAllProducts);

module.exports = router;

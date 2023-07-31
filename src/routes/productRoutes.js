const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.get('/product', productController.getAllProducts);

// Route to add a new product
router.post('/product', productController.addProductOrService);

module.exports = router;

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route for creating a new order
router.post('/order', orderController.createOrder);

module.exports = router;

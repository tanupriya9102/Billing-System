const Order = require('../models/Order');

// Function to create an order
async function createOrder(req, res) {
  const { userId, items, totalBill, totalTax } = req.body;

  try {
    const order = new Order({ userId, items, totalBill, totalTax });
    await order.save();
    res.status(201).json({ message: 'Order created successfully.', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order.' });
  }
}

// Function to get all orders
async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
}

module.exports = { createOrder, getAllOrders };

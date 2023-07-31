const Product = require('../models/Product');

// Fetch all products and services API
async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products and services.' });
  }
}

// Add product or service to the database
async function addProductOrService(req, res) {
  const { name, price, type } = req.body;

  try {
    const product = new Product({ name, price, type });
    await product.save();
    res.status(201).json({ message: 'Product or service added successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product or service.' });
  }
}

module.exports = { getAllProducts, addProductOrService };

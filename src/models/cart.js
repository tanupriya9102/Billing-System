const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
      },
      itemName: {
        type: String, // New property to store the name of the product
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalBill: {
    type: Number,
    required: true,
    default: 0,
  },
  totalTax: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

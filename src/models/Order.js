// models/Order.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
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
  },
  totalTax: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

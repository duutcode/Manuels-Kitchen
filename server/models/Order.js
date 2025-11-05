const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      name: String,
      price: Number,
      image: String,
      restaurantName: String
    }
  ],
  customer: {
    name: String,
    phone: String,
    address: String,
    notes: String
  },
  total: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
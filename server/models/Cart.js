const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true }  // ← ADDED: Save price at add time
});

module.exports = mongoose.model('Cart', new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [cartItemSchema],
  total: { type: Number, default: 0 }
}));
const mongoose = require('mongoose');

module.exports = mongoose.model('MenuItem', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, default: 'https://via.placeholder.com/150' },
  isVeg: { type: Boolean, default: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }
}));
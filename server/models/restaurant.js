const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  rating: Number,
  deliveryTime: String,
  priceRange: String,
  image: String,
  menu: [{
    _id: String,
    name: String,
    price: Number,
    description: String,
    image: String
  }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema, 'restaurants');
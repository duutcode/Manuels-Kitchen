const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// 1. SEARCH ROUTE — MUST COME FIRST!
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") return res.json([]);

    const searchResults = await Restaurant.find({
      $or: [
        { name: { $regex: q.trim(), $options: "i" } },
        { cuisine: { $regex: q.trim(), $options: "i" } },
        { "menu.name": { $regex: q.trim(), $options: "i" } }
      ]
    }).select("name cuisine image priceRange deliveryTime rating");

    res.json(searchResults);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed" });
  }
});

// 2. GET ALL RESTAURANTS
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. GET SINGLE RESTAURANT BY ID — MUST BE LAST!
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
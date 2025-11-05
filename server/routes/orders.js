const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

// CREATE ORDER — MATCHES FRONTEND
router.post('/', auth, async (req, res) => {
  try {
    const { items, customer, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    const order = new Order({
      user: req.user.id,
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        image: item.image,
        restaurantName: item.restaurantName
      })),
      customer,
      total,
      status: 'pending'
    });

    await order.save();
    res.json(order);
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ msg: 'Order failed' });
  }
});

// GET USER'S ORDERS
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ msg: 'Failed to fetch orders' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');

// ADD TO CART - FINAL FIXED VERSION
router.post('/add', auth, async (req, res) => {
  try {
    const { menuItemId, quantity = 1 } = req.body;

    if (!menuItemId) {
      return res.status(400).json({ msg: 'menuItemId is required' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [], total: 0 });
    }

    // Check if item already in cart
    const itemIndex = cart.items.findIndex(
      (i) => i.menuItem && i.menuItem.toString() === menuItemId
    );

    if (itemIndex > -1) {
      // Update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Fetch menu item to get price
      const menuItem = await MenuItem.findById(menuItemId);
      if (!menuItem) {
        return res.status(404).json({ msg: 'Menu item not found' });
      }

      // Add new item with price
      cart.items.push({
        menuItem: menuItemId,
        quantity,
        price: menuItem.price  // ← CRITICAL: SAVE PRICE
      });
    }

    // Recalculate total safely
    let total = 0;
    for (const item of cart.items) {
      if (item.price && item.quantity) {
        total += item.price * item.quantity;
      }
    }
    cart.total = total;

    await cart.save();

    // Return populated cart
    const populatedCart = await Cart.findOne({ user: req.user._id }).populate('items.menuItem');
    res.json(populatedCart);

  } catch (err) {
    console.error('Cart error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// GET CART
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.menuItem');
    res.json(cart || { items: [], total: 0 });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
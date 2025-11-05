// server/routes/contact.js
const express = require('express');
const router = express.Router();

// Simple in-memory storage (replace with MongoDB model later)
let messages = [];

// POST /api/contact
router.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const newMessage = {
    name,
    email,
    subject: subject || 'No Subject',
    message,
    timestamp: new Date(),
  };

  messages.push(newMessage);
  console.log('NEW CONTACT MESSAGE:', newMessage);

  res.json({ success: true, msg: 'Thank you! We received your message.' });
});

// GET /api/contact (for admin later)
router.get('/contact', (req, res) => {
  res.json(messages);
});

module.exports = router;
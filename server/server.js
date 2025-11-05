require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// DEBUG: Print MONGO_URI to confirm it's loaded
console.log('MONGO_URI:', process.env.MONGO_URI || 'MISSING!');

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Test Route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Routes
const restaurantRoutes = require('./routes/restaurants');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact'); // CONTACT ROUTE LOADED

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes); // CONTACT ROUTE MOUNTED

// MongoDB — FORCE ATLAS DB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MONGO_URI not found in .env');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    console.log('Database: manuels-kitchen');
    console.log('Data: 6 GHANAIAN RESTAURANTS + DESCRIPTIONS LOADED');
  })
  .catch(err => {
    console.error('MONGO ERROR:', err.message);
    process.exit(1);
  });

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Test: http://localhost:${PORT}/test`);
  console.log(`Register: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`Login: POST http://localhost:${PORT}/api/auth/login`);
  console.log(`Contact: POST http://localhost:${PORT}/api/contact`); // LIVE
  console.log(`DB: manuels-kitchen (Atlas)`);
  console.log(`API: GET http://localhost:${PORT}/api/restaurants`);
});
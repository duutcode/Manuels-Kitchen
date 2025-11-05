// server/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');

// DEBUG: Confirm .env is loaded
console.log('MONGO_URI:', process.env.MONGO_URI ? 'LOADED' : 'MISSING!');

// FORCE DATABASE NAME: manuels-kitchen
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/manuels-kitchen';

const restaurants = [
  {
    name: "Manuel's Kitchen",
    cuisine: "Ghanaian",
    rating: 4.9,
    deliveryTime: "15–20 min",
    priceRange: "GH₵₵",
    image: "/images/waakye.jpg",
    menu: [
      { 
        name: "Jollof Rice", 
        price: 55, 
        image: "/images/jollof.jpg",
        description: "Spicy rice cooked with tomatoes, onions, and mixed vegetables. Served with chicken or fish." 
      },
      { 
        name: "Waakye", 
        price: 50, 
        image: "/images/waakye.jpg",
        description: "Rice and beans with stew, spaghetti, plantain, gari, and your choice of protein." 
      }
    ]
  },
  {
    name: "Chale Wote Grill",
    cuisine: "Grill",
    rating: 4.7,
    deliveryTime: "20–30 min",
    priceRange: "GH₵₵",
    image: "/images/grill.jpg",
    menu: [
      { 
        name: "Grilled Tilapia", 
        price: 90, 
        image: "/images/grill.jpg",
        description: "Fresh tilapia grilled to perfection with spicy pepper sauce and banku." 
      }
    ]
  },
  {
    name: "Fufu Palace",
    cuisine: "Traditional",
    rating: 4.6,
    deliveryTime: "25–35 min",
    priceRange: "GH₵₵",
    image: "/images/fufu.jpg",
    menu: [
      { 
        name: "Fufu & Light Soup", 
        price: 80, 
        image: "/images/fufu.jpg",
        description: "Pounded cassava and plantain with goat or fish in light pepper soup." 
      }
    ]
  },
  {
    name: "Asaase Pa Vegan",
    cuisine: "Plant-Based",
    rating: 4.9,
    deliveryTime: "15–20 min",
    priceRange: "GH₵₵",
    image: "/images/salad.jpg",
    menu: [
      { 
        name: "Garden Waakye Bowl", 
        price: 50, 
        image: "/images/salad.jpg",
        description: "Vegan waakye with beans, plantain, avocado, and spicy peanut sauce." 
      }
    ]
  },
  {
    name: "Chop Bar Express",
    cuisine: "Local",
    rating: 4.5,
    deliveryTime: "20–30 min",
    priceRange: "GH₵",
    image: "/images/chopbar.jpg",
    menu: [
      { 
        name: "Red Red", 
        price: 40, 
        image: "/images/redred.jpg",
        description: "Beans stew with palm oil, plantain, and gari. Served with fish." 
      },
      { 
        name: "Kenkey & Fish", 
        price: 45, 
        image: "/images/kenkey.jpg",
        description: "Fermented corn dough with grilled tilapia and pepper sauce." 
      }
    ]
  },
  {
    name: "Chef Duut's Local Joint",
    cuisine: "Ghanaian",
    rating: 4.8,
    deliveryTime: "15–25 min",
    priceRange: "GH₵₵",
    image: "/images/duut.jpg",
    menu: [
      { 
        name: "Ampesi & Kontomire", 
        price: 55, 
        image: "/images/ampesi.jpg",
        description: "Boiled yam or plantain with cocoyam leaves stew and smoked fish." 
      },
      { 
        name: "Tuo Zaafi", 
        price: 60, 
        image: "/images/tuo.jpg",
        description: "Northern Ghana rice ball with ayoyo soup and goat meat." 
      }
    ]
  }
];

// CONNECT & SEED
mongoose.connect(DB_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas (manuels-kitchen)');

    // CLEAR OLD DATA
    const deleteResult = await Restaurant.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} old restaurants`);

    // INSERT FRESH DATA
    const insertResult = await Restaurant.insertMany(restaurants);
    console.log(`6 GHANAIAN RESTAURANTS SEEDED! (${insertResult.length} docs)`);

    // VERIFY SAMPLE
    const sample = insertResult[0].menu[0];
    console.log(`SAMPLE: "${sample.name}" → "${sample.description}"`);

    mongoose.connection.close();
  })
  .catch(err => {
    console.error('SEED FAILED:', err.message);
    mongoose.connection.close();
  });
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Restaurant from './pages/Restaurant';        // Single restaurant menu
import RestaurantsList from './pages/RestaurantsList'; // List of all restaurants
import Cart from './pages/Cart';                     // CART PAGE
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';             // REGISTER PAGE
import Search from './pages/Search';                 // SEARCH PAGE
import Checkout from './pages/Checkout';             // CHECKOUT PAGE
import OrderConfirmation from './pages/OrderConfirmation'; // ORDER SUCCESS PAGE
import ContactPage from './pages/ContactPage';       // CONTACT PAGE ADDED
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-5">
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />
          
          {/* ABOUT */}
          <Route path="/about" element={<About />} />
          
          {/* LIST OF ALL RESTAURANTS */}
          <Route path="/restaurants" element={<RestaurantsList />} />
          
          {/* SINGLE RESTAURANT MENU (DYNAMIC ID) */}
          <Route path="/restaurant/:id" element={<Restaurant />} />
          
          {/* CART PAGE */}
          <Route path="/cart" element={<Cart />} />
          
          {/* CHECKOUT & ORDER FLOW */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          
          {/* AUTH PAGES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* SEARCH PAGE */}
          <Route path="/search" element={<Search />} />
          
          {/* ORDERS */}
          <Route path="/orders" element={<Orders />} />

          {/* CONTACT PAGE */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
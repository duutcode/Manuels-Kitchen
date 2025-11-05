# Manuel's Kitchen - Ghanaian Food Delivery App

**A full-stack food delivery platform featuring 6 authentic Ghanaian restaurants, secure authentication, and seamless ordering — built with the MERN stack.**

---

## Features

- **6 Authentic Ghanaian Restaurants** with rich menus and **detailed descriptions**
- **Dynamic Restaurant Cards** with smooth animations
- **Secure User Authentication** (Register/Login with JWT + bcrypt)
- **Add to Cart** with real-time updates
- **Full Order Flow**: Browse → Cart → Checkout → Order Confirmation
- **Contact Form** → Saves to MongoDB
- **My Orders Page** → View all past orders
- **Responsive Design** (Mobile, Tablet, Desktop) using Bootstrap
- **MongoDB Atlas** backend with live data persistence

---

## Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Frontend    | React.js, Bootstrap, Axios     |
| Backend     | Node.js, Express.js            |
| Database    | MongoDB Atlas                  |
| Auth        | JWT, bcrypt                    |

---

## Live Demo

**Frontend:** [http://localhost:3000](http://localhost:3000)  
**Backend API:** [http://localhost:5001](http://localhost:5001)

---

## How to Run

### 1. Start Backend

```bash
cd server
npm install
node seed.js        # Seeds 6 restaurants with descriptions
node server.js      # Starts API on http://localhost:5001
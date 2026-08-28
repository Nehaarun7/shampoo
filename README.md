# 🎵 Spotify Shampoo

A mood-based shampoo brand that pairs fragrances with music vibes. Built for a competition.

## 🚀 Live Demo

👉 **[https://spotify-shampoo.vercel.app](https://spotify-shampoo.vercel.app)**

## ✨ Features

- 🎵 Mood-based music player with Web Audio API
- 🛒 Shopping cart with localStorage persistence
- 💳 Multi-step checkout with email order confirmation
- 💌 EmailJS integration — sends order details to buyer's email
- ❤️ Wishlist — save favourite products
- 📦 Order history — all past orders stored locally
- ⭐ Loyalty points — earn 1 pt per ₹10 spent
- 🧴 Product customizer — build your own shampoo blend
- 🤖 Smart mood-based product recommendation
- 📱 Fully responsive design

## 🛠 Tech Stack

- React 19 + Vite
- EmailJS (client-side email, no backend)
- CSS custom properties + animations
- localStorage for cart, wishlist, orders & points

## 📧 Email Setup

Copy `src/utils/emailService.example.js` to `src/utils/emailService.js` and fill in your [EmailJS](https://emailjs.com) credentials:

```js
const SERVICE_ID  = "your_service_id";
const TEMPLATE_ID = "your_template_id";
const PUBLIC_KEY  = "your_public_key";
```

## 🔗 Links

- **Live:** https://spotify-shampoo.vercel.app
- **Repo:** https://github.com/Nehaarun7/shampoo

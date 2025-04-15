# Azula - Full-Stack eCommerce API

Azula is a fully-featured, production-grade eCommerce API built with Node.js, Express, and MongoDB. It supports a complete backend system for modern online stores, including secure authentication, product management, M-PESA (Daraja) payment integration, affiliate promotion tracking, and more.

This project serves as a powerful boilerplate for building scalable eCommerce platforms and also acts as my portfolio showcase of advanced backend architecture.

---

## 🚀 Features

### 🔐 Authentication

- User registration, login, logout
- Secure JWT + cookie-based auth
- OTP-based password reset
- Unique promo code generated per user

### 🛍️ Product Management

- Create, update, delete, fetch products
- Cloudinary image upload support
- Category and price support
- (Ready for filter/sort integration)

### 👤 User Management

- Admin & user roles
- Admin can manage all users
- Authenticated users can update/delete their own account securely

### 📦 Orders

- Backend-calculated totals (no frontend manipulation)
- PromoCode discount application
- Tax and delivery calculation
- Referral order tracking
- Full order lifecycle: create, status update, cancel

### 💰 Payments

- Safaricom M-PESA Daraja API integration
- STK push trigger
- Callback handler for payment confirmation

### ✍️ Reviews & Likes

- One review per product per user
- Secure ownership checks
- Like/unlike products functionality

### 🎁 Promo Codes (Affiliate Logic)

- Each user has a unique promo code
- Promo codes give discounts and track referrals
- Referrers get credit via `referredOrders`

### 🚚 Delivery Options

- Admin CRUD for delivery methods
- Delivery price integrated in total price calc

### 🛠️ Backend Utilities

- Role-based route protection (`isAuth`, `isAdmin`)
- Proper error handling with custom error classes
- Centralized error middleware
- CORS, helmet, xss-clean, express-rate-limit for security

---

## 📚 API Endpoints (Grouped)

### 🔐 Auth

- `POST /api/v1/authentication/register`
- `POST /api/v1/authentication/login`
- `GET /api/v1/authentication/logout`
- `POST /api/v1/authentication/forgot-password`
- `POST /api/v1/authentication/reset-password`

### 👤 Users

- `GET /api/v1/users` _(admin)_
- `GET /api/v1/users/:id`
- `PATCH /api/v1/users/:id` _(admin)_
- `DELETE /api/v1/users/:id` _(admin)_
- `PATCH /api/v1/users/me/update`
- `DELETE /api/v1/users/me/delete`

### 🛍️ Products

- `GET /api/v1/products`
- `POST /api/v1/products` _(admin)_
- `GET /api/v1/products/:id`
- `PATCH /api/v1/products/:id` _(admin)_
- `DELETE /api/v1/products/:id` _(admin)_

### 📦 Orders

- `GET /api/v1/orders`
- `GET /api/v1/orders/:id`
- `POST /api/v1/orders`
- `PATCH /api/v1/orders/:id` _(admin)_
- `PATCH /api/v1/orders/:id/status` _(admin)_
- `DELETE /api/v1/orders/:id`
- `PATCH /api/v1/orders/:id/cancel`

### 💰 Payment

- `POST /api/v1/orderpayment/initiate-payment`
- `POST /api/v1/orderpayment/handle-callback`

### ✍️ Reviews

- `POST /api/v1/reviews`
- `PATCH /api/v1/reviews/:id`
- `DELETE /api/v1/reviews/:id`

### ❤️ Likes

- `POST /api/v1/likes/:productId`
- `DELETE /api/v1/likes/:productId`

### 🎁 Promo Codes

- `GET /api/v1/validate-promocode/:code`

### 🚚 Delivery Options _(Admin only)_

- `GET /api/v1/deliveryOption`
- `POST /api/v1/deliveryOption`
- `GET /api/v1/deliveryOption/:id`
- `PATCH /api/v1/deliveryOption/:id`
- `DELETE /api/v1/deliveryOption/:id`

---

## ⚙️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** with Mongoose
- **Cloudinary** for image storage
- **Daraja M-PESA API** integration
- **JWT + cookies** for session management
- **Postman** for testing
- **Swagger** (in progress) for documentation

---

## 🛡️ Security & Performance Middleware

- `helmet`
- `xss-clean`
- `cors`
- `express-rate-limit`
- `compression`
- `express-async-errors`

---

## 🚀 Deployment Ready

- Fully tested with Postman
- Swagger documentation coming
- Built for deployment on Render, Railway, or DigitalOcean

---

## 📁 Folder Structure (Simplified)

```
backend/
├── controllers/
├── routes/
├── models/
├── middleware/
├── utils/
├── db/
├── public/
├── index.js
├── .env
```

---

## 🧠 Author

**Belton** — Software Engineer | Full-Stack Developer | Machine Learning Enthusiast

---

## 📌 License

This project is open for customization and commercial use. Attribution is appreciated but not required.

---

## 💬 Want to Work With Azula?

If you're interested in using, customizing, or deploying Azula for your store or client, feel free to reach out!

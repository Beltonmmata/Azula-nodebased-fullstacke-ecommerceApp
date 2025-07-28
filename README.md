<h1 align="center">🛒 Azula - Full-Stack eCommerce Platform</h1>

<p align="center">
  <strong>Complete custom eCommerce platform built with Vanilla JS, Node.js, Express, and MongoDB</strong><br>
  <em>Secure, Scalable, Mobile Payment-Ready, Affiliate-Friendly</em>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Frontend-Vanilla%20JS-yellow?style=for-the-badge&logo=javascript" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge&logo=mongodb" /></a>
  <a href="#"><img src="https://img.shields.io/badge/API-Powered%20by%20Express-blue?style=for-the-badge&logo=express" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Payment-MPESA%20Daraja-lightgrey?style=for-the-badge" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Cloudinary-Image%20Upload-informational?style=for-the-badge&logo=cloudinary" /></a>
</p>

---

## 🌟 Why Azula?

Azula is a **production-ready, full-stack eCommerce project** built from scratch using **pure frontend JavaScript modules** and a **robust Express backend**.

> 🔥 Built to master full JavaScript architecture — and it delivered.

Key features include:

- Secure user authentication via JWT + cookies
- M-PESA mobile payment (STK Push)
- Promo code and referral logic
- Admin/user role systems
- Product likes, reviews, delivery options

---

## ✨ Live Demo

🔗 Frontend: [https://azula.netlify.app](https://azula.netlify.app)

---

## 🧠 Tech Stack

### 🧩 Frontend

| Tool                                                                                 | Description                     |
| ------------------------------------------------------------------------------------ | ------------------------------- |
| ![JS](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)           | Modular Vanilla JavaScript      |
| ![Vite](https://img.shields.io/badge/Vite-Bundler-blueviolet?logo=vite)              | Lightning-fast frontend bundler |
| ![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-blue?logo=axios)           | AJAX communication              |
| ![CSS3](https://img.shields.io/badge/CSS3-Styling-blue?logo=css3)                    | Responsive styling              |
| ![DayJS](https://img.shields.io/badge/DayJS-Time%20Formatting-red?logo=dayjs)        | Lightweight date formatting     |
| ![Ionicons](https://img.shields.io/badge/Ionicons-Icons-informational?logo=ionicons) | Beautiful UI icons              |

### ⚙️ Backend

| Tool                                                                                             | Description           |
| ------------------------------------------------------------------------------------------------ | --------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-Runtime-green?logo=node.js)                      | Backend runtime       |
| ![Express](https://img.shields.io/badge/Express.js-API-blue?logo=express)                        | API framework         |
| ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?logo=mongodb)                  | NoSQL Database        |
| ![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Storage-lightgrey?logo=cloudinary) | Product image hosting |
| ![M-PESA](https://img.shields.io/badge/M--PESA-STK%20Push-success?logo=safaricom)                | Daraja payment API    |
| ![JWT](https://img.shields.io/badge/JWT-Authentication-orange?logo=jsonwebtokens)                | Secure login system   |
| ![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?logo=mongodb)                          | DB modeling           |

---

## 🚀 Features

### 🔐 Authentication

- Register/Login/Logout
- OTP password recovery
- JWT + HTTP-only cookie sessions
- Unique promo code per user

### 🛍️ Products

- Admin CRUD
- Cloudinary upload
- Categories + pricing
- Filter-ready JSON structure

### 👤 Users

- Admin control panel
- Users update/delete their account

### 🛒 Orders

- Add to cart / Buy now
- PromoCode logic
- Delivery & tax calculation
- Order cancellation & tracking

### 💸 Payments

- M-PESA Daraja integration
- STK Push trigger
- Callback handler

### 💬 Reviews & Likes

- One review per product per user
- Like/unlike functionality

### 🎁 Promo & Referral

- Each user gets a promo code
- Referrals tracked
- Discount calculation

### 🚚 Delivery

- Admin CRUD for methods
- Included in total cost

---

## 🔗 API Routes (Backend)

### Auth

- `POST /api/v1/authentication/register`
- `POST /api/v1/authentication/login`
- `GET /api/v1/authentication/logout`
- `POST /api/v1/authentication/forgot-password`
- `POST /api/v1/authentication/reset-password`

### Products

- Public: `GET /api/v1/products`
- Admin: `POST | PATCH | DELETE /:id`

### Users

- Admin: `GET /api/v1/users`
- User: `PATCH /me/update`, `DELETE /me/delete`

### Orders

- `POST /api/v1/orders`
- Admin: `PATCH /:id/status`, `DELETE /:id`

### Payments

- `POST /api/v1/orderpayment/initiate-payment`
- `POST /api/v1/orderpayment/handle-callback`

### Reviews & Likes

- `POST /api/v1/reviews`
- `POST /api/v1/likes/:productId`

### Delivery

- Admin CRUD at `/api/v1/deliveryOption`

---

## 📁 Folder Structure

### Frontend (`frontend/`)

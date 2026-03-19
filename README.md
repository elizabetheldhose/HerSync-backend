
---

# 🖥 BACKEND README (hersync-backend)

```markdown
# 💜 HerSync – Backend API (Node.js / Express)

Production API: https://hersync-backend.onrender.com

---

## 🚀 Overview

This repository contains the backend API for HerSync, a full-stack productivity and life management platform.

The backend handles:

- User authentication
- Task CRUD operations
- Finance tracking
- Health tracking
- AI integration
- Secure MongoDB database management

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- CORS
- Deployed on Render

---

## 📡 API Structure

### 🔐 Auth Routes
POST /api/auth/register
POST /api/auth/login


### 📋 Task Routes

GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id


### 💰 Transaction Routes

GET /api/health
POST /api/health


---

## 🔐 Authentication

- JWT-based token authentication
- Protected routes middleware
- Password hashing using bcrypt

---

## ⚙️ Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

🏗 Installation

npm install
node server.js

Deployment

Backend is deployed using Render.

Production configuration includes:

MongoDB Atlas connection

CORS configuration for Vercel domain

Environment variable management

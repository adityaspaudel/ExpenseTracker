# ExpenseTracker

Expense Tracker App

# 📊 Expense Tracker Web App — Feature Checklist

A modern Full-Stack Expense Tracker built using **Next.js, Express.js, MongoDB, and Mongoose**.  
Designed for **intermediate developers** looking to build a real-world finance management application.

---

## 🚀 Essential Features (Intermediate Level)

### 🟦 1. User Authentication & Security

- [ ] User registration & login
- [ ] JWT authentication (access token + refresh token optional)
- [ ] Password hashing (bcrypt)
- [ ] Protected routes (frontend + backend)
- [ ] Role-based actions (optional)

---

### 🟩 2. Expense Management (Core CRUD)

- [ ] Add new expenses
- [ ] Edit existing expenses
- [ ] Delete expenses
- [ ] View all expenses
- [ ] Filter by category
- [ ] Filter by date range
- [ ] Filter by min–max amount
- [ ] Search expenses (by title or note)

---

### 🟨 3. Income Management (Core CRUD)

- [ ] Add income
- [ ] Edit income
- [ ] Delete income
- [ ] Track monthly income
- [ ] Income vs Expense comparison

---

### 🟥 4. Categories & Tags

- [ ] Predefined categories (Food, Travel, Bills, Shopping, etc.)
- [ ] Create custom categories
- [ ] Tag system (#grocery, #festival, etc.)

---

### 🟪 5. Analytics & Charts

- [ ] Monthly spending overview
- [ ] Category-wise pie chart
- [ ] Trend line graph (weekly/monthly/yearly)
- [ ] Income vs Expense bar chart
- [ ] Largest spend categories
- [ ] Average monthly spending
- [ ] Most frequent category insights

---

### 🟧 6. Dashboard Features

- [ ] Total income card
- [ ] Total expenses card
- [ ] Balance card
- [ ] Monthly summary
- [ ] Recent transactions table
- [ ] Quick add transaction modal
- [ ] Graph insights
- [ ] Spending heatmap (optional)

---

### 🌐 7. UI/UX Features

- [ ] Fully responsive UI
- [ ] TailwindCSS modern styling
- [ ] Dark mode toggle
- [ ] Dashboard layout
- [ ] Category icons + color coding
- [ ] Toast notifications
- [ ] Pagination / infinite scroll

---

### 📁 8. File Uploads

- [ ] Upload receipts (Multer / Cloudinary)
- [ ] Store receipt URLs
- [ ] View & download receipt images
- [ ] OCR extraction (optional)

---

### 📥 9. Export & Backup

- [ ] Export as CSV
- [ ] Export as Excel
- [ ] Export as JSON
- [ ] Monthly financial report
- [ ] PDF summary (optional)

---

### 🔒 10. Validation & Error Handling

- [ ] Backend validation (Joi / Zod)
- [ ] Frontend validation (React Hook Form / Yup)
- [ ] Global error handler
- [ ] Unified success response format

---

### 🧠 11. Smart Features (Optional)

- [ ] Recurring expenses
- [ ] Budget limit alerts
- [ ] Email notifications (SendGrid / Nodemailer)
- [ ] Savings goal tracker
- [ ] Multi-currency support

---

### 🚀 12. Performance & Production

- [ ] Code splitting
- [ ] Redis caching (optional)
- [ ] Image optimization
- [ ] Rate limiting
- [ ] Helmet security headers
- [ ] Compression enabled
- [ ] CORS configuration

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TailwindCSS
- Axios
- React Hook Form / Formik
- Chart.js / Recharts

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- JWT
- Bcrypt
- Helmet, Compression, CORS
- Morgan

---

<!--

frontend-------------
{
  "name": "nextjs-tailwind-frontend",
  "version": "1.0.0",
  "description": "Next.js + Tailwind CSS frontend with essential libraries including Redux",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx --fix"
  },
  "keywords": ["nextjs", "tailwindcss", "react", "frontend", "redux"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "axios": "^1.6.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.31.0",
    "dayjs": "^1.12.8",
    "framer-motion": "^12.7.0",
    "headlessui": "^1.8.4",
    "jsdom": "^22.1.0",
    "lucide-react": "^0.349.0",
    "lodash": "^4.17.21",
    "next": "^14.6.4",
    "next-auth": "^5.3.1",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-hot-toast": "^2.5.2",
    "react-icons": "^4.11.0",
    "react-modal": "^3.16.1",
    "react-query": "^3.39.4",
    "react-redux": "^8.2.1",
    "@reduxjs/toolkit": "^1.5.0",
    "redux-logger": "^3.0.6",
    "redux-persist": "^6.0.0",
    "react-spring": "^9.8.7",
    "react-toastify": "^9.3.2",
    "shadcn-ui": "^1.0.0",
    "swr": "^2.2.3",
    "tailwindcss": "^4.3.2",
    "@tailwindcss/aspect-ratio": "^1.0.1",
    "@tailwindcss/forms": "^0.5.3",
    "@tailwindcss/line-clamp": "^0.4.2",
    "@tailwindcss/typography": "^1.9.0",
    "uuid": "^9.0.0",
    "zod": "^3.25.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^14.0.0",
    "cypress": "^12.14.0",
    "eslint": "^8.48.0",
    "prettier": "^3.0.0"
  }
}


backend------------

{
  "name": "mern-backend",
  "version": "1.0.0",
  "description": "Production-ready Express + MongoDB backend",
  "main": "index.js",
  "type": "commonjs",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "lint": "eslint . --fix",
    "test": "jest"
  },
  "keywords": ["express", "mongodb", "mern", "backend"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "bcryptjs": "^2.5.0",
    "compression": "^1.7.4",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dayjs": "^1.12.8",
    "dotenv": "^16.1.4",
    "express": "^4.18.2",
    "express-mongo-sanitize": "^2.2.0",
    "express-rate-limit": "^7.0.0",
    "express-validator": "^7.0.1",
    "express-xss-sanitizer": "^0.1.1",
    "helmet": "^7.0.0",
    "hpp": "^0.2.3",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.5.0",
    "mongoose-unique-validator": "^3.1.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "uuid": "^9.0.0",
    "winston": "^3.12.0",
    "xss": "^1.0.14",
    "swagger-ui-express": "^5.1.1",
    "socket.io": "^4.7.2",
    "jsdom": "^22.1.0",
    "dompurify": "^3.0.7"
  },
  "devDependencies": {
    "cross-env": "^7.0.3",
    "concurrently": "^8.2.1",
    "eslint": "^8.48.0",
    "jest": "^29.7.0",
    "nodemon": "^3.0.1",
    "prettier": "^3.0.0",
    "supertest": "^6.3.3",
    "mongodb-memory-server": "^8.15.1"
  }
}


-->

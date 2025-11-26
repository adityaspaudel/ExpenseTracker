const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// ---- Rate Limiter ----
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

// ---- CORS for Next.js ----
const corsMiddleware = cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

// ---- Export all middlewares as array ----
const appMiddlewares = [
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  }),
  corsMiddleware,
  xss(),
  mongoSanitize(),
  hpp(),
  apiLimiter,
];

module.exports = appMiddlewares;

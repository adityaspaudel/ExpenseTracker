const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer"); 
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
const corsMiddleware = cors();

// ---- Middleware array ----
const appMiddlewares = [
	helmet(),
	corsMiddleware,
	xss(),
	hpp(),
	apiLimiter,
];

module.exports = appMiddlewares;

const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const hpp = require("hpp");
const cors = require("cors");
const express = require("express"); // 👈 import express

// ---- CORS for Next.js ----
const corsMiddleware = cors();

// ---- Middleware array ----
const appMiddlewares = [
	express.json(), // 👈 Parse JSON bodies
	helmet(),
	corsMiddleware,
	xss(),
	hpp(),
];

module.exports = appMiddlewares;

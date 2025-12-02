const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const { Server } = require("socket.io");

const dbConnect = require("./db/connection");
const userRoute = require("./routes/userRoute");

// Import all middlewares from one file
const appMiddlewares = require("./middlewares/appMiddleware");

const app = express();
const server = http.createServer(app);

// ---- Apply global middlewares ----
app.use(appMiddlewares); // helmet, cors, xss-clean, mongo-sanitize, hpp, rate-limiter

// ---- Connect to Database ----
dbConnect();

// ---- Routes ----
app.use(userRoute);

// ---- Socket.io Setup ----
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	},
});

io.on("connection", (socket) => {
	console.log("⚡ Socket connected:", socket.id);

	socket.on("join", (userId) => {
		socket.join(userId);
		console.log(`👤 User ${userId} joined room`);
	});

	socket.on("disconnect", () => {
		console.log("❌ Socket disconnected:", socket.id);
	});
});

// ---- Global Error Handling ----
app.use((err, req, res, next) => {
	console.error("🔥 Error:", err.stack);
	res.status(500).json({ success: false, message: err.message });
});

// ---- Handle Uncaught Exceptions & Rejections ----
process.on("uncaughtException", (err) => {
	console.error("❗ Uncaught Exception:", err);
});
process.on("unhandledRejection", (err) => {
	console.error("❗ Unhandled Rejection:", err);
});

// ---- Start Server ----
const PORT = process.env.PORT || 8000;

try {
	server.listen(PORT, () => {
		console.log(`🚀 Server running on http://localhost:${PORT}`);
	});
} catch (error) {
	console.error(error);
}

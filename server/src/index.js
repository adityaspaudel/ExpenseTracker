const express = require("express");
const app = express();
const dbConnect = require("./db/connection");
const dotenv = require("dotenv");
dotenv.config();

// importing middlewares
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");

// importing socket objects
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(cookieParser());

// connecting database
dbConnect();
// routing

// setting up socket
const io = new Server(server, {
  cors: { origin: "http://localhost:8000" },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credential: true,
});
// socket connection creation
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`user id ${userId} connected`);
  });
  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
  });
});

// exceptional handling
process.on("uncaughtException", (err) => {
  console.error("uncaught exception", err);
});
process.on("unhandledRejection", (err) => {
  console.log("unhandled rejection", err);
});
app.use((req, res, err) => {
  console.error(err);
});

// application
const PORT = process.env.PORT || 8000;

try {
  server.listen(PORT, () => {
    console.log(`application is running on port ${PORT}`);
  });
} catch (error) {
  console.error(error);
}

import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import cookieParser from "cookie-parser";
import short_url from "./src/routes/short_url.route.js";
import auth_routes from "./src/routes/auth.routes.js";
import user_routes from "./src/routes/user.route.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";

dotenv.config();

const app = express();

// CORS setup
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

// API routes
app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);

// Base route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running 🚀" });
});

// Short URL redirect
app.get("/:id", redirectFromShortUrl);

// Error handler
app.use(errorHandler);

// Dynamic port
const PORT = process.env.PORT || 3000;

// Connect DB first, then start server
const startServer = async () => {
  if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined! Set it in Railway environment variables.");
    process.exit(1);
  }

  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

startServer();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const booksRoutes = require("./routes/books.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Hardcode Mongo URI (localhost + same DB name used in seed.js)
const MONGO_URI = "mongodb://127.0.0.1:27017/booksDB";

mongoose.connect(MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static client
app.use(express.static(path.join(__dirname, "public")));

/**
 * IMPORTANT:
 * We mount at /api so books.routes.js can contain:
 *  - GET /books
 *  - GET /books/:id
 *  - GET /integrity-check42
 * This still produces the required paths:
 *  - /api/books
 *  - /api/books/:id
 *  - /api/integrity-check42
 */
app.use("/api", booksRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

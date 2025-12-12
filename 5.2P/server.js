const express = require("express");
const path = require("path");

const booksRoutes = require("./routes/books.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files (client)
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use("/api/books", booksRoutes);

// Optional: simple health check
app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

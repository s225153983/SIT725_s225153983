// server.js

const express = require("express");
const mongoose = require("mongoose");
const Plant = require("./models/Plant");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from ./public
app.use(express.static(__dirname + "/public"));

// Parse JSON and URL‑encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (local DB named plantDB)
mongoose
  .connect("mongodb://127.0.0.1:27017/plantDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

/**
 * GET /api/plants
 * Returns all plants from the database.
 */
app.get("/api/plants", async (req, res) => {
  try {
    const plants = await Plant.find({});
    res.json({ statusCode: 200, data: plants, message: "Success" });
  } catch (err) {
    console.error("Error retrieving plants:", err);
    res
      .status(500)
      .json({ statusCode: 500, message: "Error retrieving plants" });
  }
});

/**
 * POST /api/plants
 * Creates a new plant in the database.
 * Expected body fields: title, image, link, description
 */
app.post("/api/plants", async (req, res) => {
  try {
    const { title, image, link, description } = req.body;
    const plant = new Plant({ title, image, link, description });
    const saved = await plant.save();
    res.status(201).json({ statusCode: 201, data: saved, message: "Saved" });
  } catch (err) {
    console.error("Error saving plant:", err);
    res.status(500).json({ statusCode: 500, message: "Error saving plant" });
  }
});

// Start server
app.listen(port, () => {
  console.log("App listening on port " + port);
});

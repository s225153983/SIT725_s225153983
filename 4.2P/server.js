// server.js
const express = require("express");
const mongoose = require("mongoose");
const Plant = require("./models/Plant");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/plantDB")
  .then(() => console.log("Connected to MongoDB (plantDB)"))
  .catch((err) => console.error("MongoDB connection error:", err));

// GET all plants
app.get("/api/plants", async (req, res) => {
  try {
    const plants = await Plant.find({}).sort({ createdAt: -1 });
    res.json({ statusCode: 200, data: plants, message: "Success" });
  } catch (err) {
    console.error("GET /api/plants error:", err);
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
});

// POST create plant
app.post("/api/plants", async (req, res) => {
  try {
    const payload = {
      commonName: req.body.commonName,
      scientificName: req.body.scientificName,
      sunlight: req.body.sunlight,
      watering: req.body.watering,
      petSafe:
        req.body.petSafe === true ||
        req.body.petSafe === "true" ||
        req.body.petSafe === "on",
      imagePath: req.body.imagePath,
      careNotes: req.body.careNotes,
    };

    const created = await Plant.create(payload);
    res.status(201).json({ statusCode: 201, data: created, message: "Created" });
  } catch (err) {
    console.error("POST /api/plants error:", err);
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});

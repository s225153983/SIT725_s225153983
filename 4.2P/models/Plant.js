// models/Plant.js

const mongoose = require("mongoose");

// Define the schema for a plant card
const PlantSchema = new mongoose.Schema({
  title: { type: String, required: true },         // Plant name
  image: { type: String, required: false },        // Image path (e.g. "images/monstera.jpg")
  link: { type: String, required: false },         // Link text (e.g. "Care guide")
  description: { type: String, required: false },  // Care description / notes
});

// Export the Mongoose model
module.exports = mongoose.model("Plant", PlantSchema);

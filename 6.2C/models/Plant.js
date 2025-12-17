const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema(
  {
    commonName: { type: String, required: true },
    scientificName: { type: String, required: true },
    sunlight: { type: String, required: true },   // e.g. "Bright indirect"
    watering: { type: String, required: true },   // e.g. "Weekly"
    petSafe: { type: Boolean, required: true },   // true/false
    imagePath: { type: String, required: false }, // e.g. "images/monstera.jpg"
    careNotes: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plant", PlantSchema);
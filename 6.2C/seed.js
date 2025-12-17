// seed.js
const mongoose = require("mongoose");
const Plant = require("./models/Plant");

async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/plantDB");
  console.log("Connected to MongoDB for seeding.");

  // Clear existing data (so your screenshots are consistent)
  await Plant.deleteMany({});

  const samples = [
    {
      commonName: "Monstera",
      scientificName: "Monstera deliciosa",
      sunlight: "Bright indirect",
      watering: "Weekly",
      petSafe: false,
      imagePath: "images/monstera.jpg",
      careNotes: "Water when top 2–3 cm of soil is dry. Loves humidity.",
    },
    {
      commonName: "Peace Lily",
      scientificName: "Spathiphyllum wallisii",
      sunlight: "Low to medium",
      watering: "Weekly",
      petSafe: false,
      imagePath: "images/peace-lily.jpg",
      careNotes: "Leaves droop when thirsty; keep soil lightly moist.",
    },
    {
      commonName: "Snake Plant",
      scientificName: "Dracaena trifasciata",
      sunlight: "Low to bright",
      watering: "Fortnightly",
      petSafe: false,
      imagePath: "images/snake-plant.jpg",
      careNotes: "Hardy. Avoid overwatering; let soil dry out fully.",
    },
  ];

  await Plant.insertMany(samples);
  console.log("Seed complete. Inserted:", samples.length);

  await mongoose.disconnect();
  console.log("Disconnected.");
}

run().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});

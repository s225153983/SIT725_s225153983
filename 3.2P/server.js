const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple in-memory "database" of plants
const plants = [
  {
    title: "Monstera deliciosa",
    image: "images/monstera.jpg",
    link: "Care guide",
    description: "A popular indoor plant that likes bright, indirect light."
  },
  {
    title: "Snake Plant",
    image: "images/snake-plant.jpg",
    link: "Care guide",
    description: "Hardy, low-maintenance plant that tolerates low light."
  },
  {
    title: "Peace Lily",
    image: "images/peace-lily.jpg",
    link: "Care guide",
    description: "Flowering indoor plant that enjoys moist soil and shade."
  }
];

// GET REST endpoint
app.get("/api/plants", (req, res) => {
  res.json(plants);
});

// Start server
app.listen(port, () => {
  console.log("App listening to: " + port);
});

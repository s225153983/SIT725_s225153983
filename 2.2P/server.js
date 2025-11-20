const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

// Test endpoint
app.get("/hello", (req, res) => {
  res.send("Hello from the Express server!");
});

// Web service to add two numbers:
app.get("/add", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  // Validation
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "Both num1 and num2 must be numbers" });
  }

  const result = num1 + num2;
  res.json({ result });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
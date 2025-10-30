const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

// Load data
let data = JSON.parse(fs.readFileSync("data.json"));

// Get all products
app.get("/products", (req, res) => {
  res.json(data.products);
});

// Add new product
app.post("/products", (req, res) => {
  const newProduct = req.body;
  data.products.push(newProduct);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json({ message: "Product added successfully" });
});

// Update delivery status
app.post("/update-status", (req, res) => {
  const { id, status } = req.body;
  const product = data.products.find(p => p.id === id);
  if (product) {
    product.status = status;
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.json({ message: "Status updated" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(3000, () => console.log("Backend running on port 3000"));

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // get all products
    res.json(products); // return JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

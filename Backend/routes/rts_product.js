const express = require("express");
const router = express.Router();
const Product = require("../models/model_product");

// CREATE PRODUCT
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL PRODUCTS (with category)
router.get("/", async (req, res) => {
  const products = await Product.find().populate("category_id");
  res.json(products);
});

module.exports = router;
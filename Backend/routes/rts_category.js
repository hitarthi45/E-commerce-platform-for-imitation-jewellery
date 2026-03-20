const express = require('express')
const router = express.Router()
const Category = require('../models/model_category')

router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

module.exports = router;

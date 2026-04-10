const express = require("express");
const router = express.Router();
const Inventory = require("../models/model_inventory");

// CREATE / ADD INVENTORY
router.post("/", async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    let inventory = await Inventory.findOne({ product_id });

    if (inventory) {
      // update existing
      inventory.quantity += quantity;
      await inventory.save();
    } else {
      // create new
      inventory = await Inventory.create({ product_id, quantity });
    }

    res.json(inventory);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL INVENTORY
router.get("/", async (req, res) => {
  const data = await Inventory.find().populate("product_id");
  res.json(data);
});

module.exports = router;
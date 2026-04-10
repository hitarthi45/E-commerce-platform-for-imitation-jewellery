const express = require("express");
const router = express.Router();

const Order = require("../models/model_orders");
const Inventory = require("../models/model_inventory");

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { user_id, products } = req.body;

    let total = 0;

    // 🔥 Loop products
    for (let item of products) {

      // Find inventory
      let inventory = await Inventory.findOne({
        product_id: item.product_id
      });

      if (!inventory || inventory.quantity < item.quantity) {
        return res.status(400).json({
          message: "Insufficient stock"
        });
      }

      // Reduce stock
      inventory.quantity -= item.quantity;
      await inventory.save();

      total += item.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      user_id,
      products,
      total_amount: total
    });

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET ALL ORDERS
router.get("/", async (req, res) => {
  const orders = await Order.find()
    .populate("user_id")
    .populate("products.product_id");

  res.json(orders);
});

module.exports = router;
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true   // one inventory per product
  },
  quantity: {
    type: Number,
    default: 0
  },
  location: String
}, { timestamps: true });

module.exports = mongoose.model("Inventory", inventorySchema);
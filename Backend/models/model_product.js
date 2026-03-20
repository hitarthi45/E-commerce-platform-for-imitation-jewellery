const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  price: Number,
  stock: {
    type: Number,
    default: 0
  },
  description: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
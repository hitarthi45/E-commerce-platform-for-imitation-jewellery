const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
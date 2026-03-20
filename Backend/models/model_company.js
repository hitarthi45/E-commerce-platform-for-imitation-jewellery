const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["manufacturer", "Retailer"],
    required: true
  },
  contact_person: String,
  phone: String,
  email: String,
  address: String
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);
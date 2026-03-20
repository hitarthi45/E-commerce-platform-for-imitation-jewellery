const express = require("express");
const router = express.Router();
const Company = require("../models/model_company");

// CREATE COMPANY
router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const company = await Company.create(req.body);

    console.log("Saved:", company);

    res.json(company);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL COMPANIES
router.get("/", async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

module.exports = router;
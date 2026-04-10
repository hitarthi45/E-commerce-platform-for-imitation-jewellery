const express = require("express");
const router = express.Router();
const Feedback = require("../models/model_feedback");

// CREATE FEEDBACK
router.post("/", async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL FEEDBACK
router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find()
    .populate("product_id")

  res.json(feedbacks);
});

module.exports = router;
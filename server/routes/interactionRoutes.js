const express = require("express");
const router = express.Router();
const Interaction = require("../models/Interaction");

router.post("/", async (req, res) => {
  try {
    const { userId, productId, action } = req.body;

    if (!userId || !productId || !action) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newInteraction = new Interaction({ userId, productId, action });
    await newInteraction.save();

    res.status(201).json({ message: "Interaction logged" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

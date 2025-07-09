const express = require("express");
const router = express.Router();
const Interaction = require("../models/Interaction");

router.post("/", async (req, res) => {
  console.log("Incoming interaction:", req.body);

  const { userId, productId, action } = req.body;

  if (!userId || !productId || !action) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const interaction = new Interaction({
      userId,
      productId,
      action,
      timestamp: new Date(),
    });
    await interaction.save();
    res.status(201).json({ message: "Interaction logged" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

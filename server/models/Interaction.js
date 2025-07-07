const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },         // or mongoose.Schema.Types.ObjectId
  productId: { type: String, required: true },      // or mongoose.Schema.Types.ObjectId
  action: { type: String, required: true },         // 'view', 'add_to_cart', 'purchase'
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Interaction", interactionSchema);

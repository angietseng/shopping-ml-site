const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("API is running"));

const productRoutes = require("./routes/productRoutes.js");
app.use("/api/products", productRoutes);

app.listen(5050, () => {
  console.log("Server started on port 5050");
});
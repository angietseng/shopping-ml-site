const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product.js");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany({}); // clear old data

  await Product.insertMany([
    {
      name: "White T-Shirt",
      description: "100% organic cotton",
      price: 25,
      imageUrl: "https://media.sezane.com/image/upload/c_fill,d_placeholder_dark.png,fl_progressive:semi,h_816,q_auto:best,w_582/l94wbb9gi384vjhts6lv.jpg",
      tags: ["cotton", "tshirt"],
    },
    {
      name: "Blue Jeans",
      description: "Sustainable denim",
      price: 55,
      imageUrl: "https://media.sezane.com/image/upload/c_fill,d_placeholder_dark.png,fl_progressive:semi,h_816,q_auto:best,w_582/kjyxzs8lcgas6fbmywuv.jpg",
      tags: ["denim", "jeans"],
    },
    {
      name: "Black Belt",
      description: "Italian leather",
      price: 15,
      imageUrl: "https://media.sezane.com/image/upload/c_fill,d_placeholder_dark.png,fl_progressive:semi,h_816,q_auto:best,w_582/g7jprovxddwltxaaeqdn.jpg",
      tags: ["belt", "leather"],
    },
    {
      name: "Red Ballerinas",
      description: "Sacchetto style",
      price: 70,
      imageUrl: "https://media.sezane.com/image/upload/c_fill,d_placeholder_dark.png,fl_progressive:semi,h_816,q_auto:best,w_582/jrg1g12gvlfca3qm9f6r.jpg",
      tags: ["ballerinas", "red"],
    },
    {
      name: "Bamboo Basket Bag",
      description: "Carried on the Shoulder",
      price: 110,
      imageUrl: "https://media.sezane.com/image/upload/c_fill,d_placeholder_dark.png,fl_progressive:semi,h_816,q_auto:best,w_582/alhg1kim5pqql8tqsket.jpg",
      tags: ["bag", "shoulder bag"],
    },
  ]);

  console.log("Sample products added!");
  mongoose.disconnect();
});

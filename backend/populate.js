require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    console.log("Connected to database...");
    await Product.deleteMany(); // Clear existing products to avoid duplicates
    console.log("Existing products removed...");

    await Product.insertMany(jsonProducts);
    console.log("Database seeded successfully! ✅");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database ❌:", error);
    process.exit(1);
  }
};

start();

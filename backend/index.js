const express = require("express");
require("dotenv").config();
require("express-async-errors");
const app = express();
const cors = require("cors");
//const Product = require("./routes/product");
const Products = require("./models/product");
const connectDB = require("./db/connect");
// const notFound = require("./middleware/not-found");
// const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware

app.use(express.static("./public"));
app.use(express.json());
app.use(cors());

// routes
// app.use(notFound);
// app.use(errorHandlerMiddleware);
// app.use("/api/v1/products", Product);
app.get("/api/v1/products/getAllProducts", async (req, res) => {
  const product = await Products.find({});
  if (!product) {
    throw Error("Product not found");
  }
  res.status(200).json({ product });
});
app.get("/api/v1/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);
  if (!product) {
    throw Error(`Product  with id ${id}  not found`);
  }
  res.status(200).json({ product });
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log("Error seeding database ❌:", error);
  }
};

start();

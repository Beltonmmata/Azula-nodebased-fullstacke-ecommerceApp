const express = require("express");
require("dotenv").config();
require("express-async-errors");

const app = express();
const cors = require("cors");

//importing routes
const Product = require("./routes/products");
const Authentication = require("./routes/authentication");
const Users = require("./routes/user");
const Order = require("./routes/orderRouter");
const Reviews = require("./routes/reviewsRouter");
const Likes = require("./routes/likesRouter");

//import dbConnecting
const connectDB = require("./db/connect");
//importing middleware
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// using middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(cors());
//using routes
app.use("/api/v1/products", Product);
app.use("/api/v1/authentication", Authentication);
app.use("/api/v1/users", Users);
app.use("/api/v1/orders", Order);
app.use("/api/v1/reviews", Reviews);
app.use("/api/v1/likes", Likes);
//error
app.use(notFound);
app.use(errorHandlerMiddleware);
app.use((err, req, res, next) => {
  console.error("Error Stack:", err.stack);
  res.status(err.statusCode || 500).json({ message: err.message });
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

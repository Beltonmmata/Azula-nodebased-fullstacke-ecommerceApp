const express = require("express");
require("dotenv").config();
require("express-async-errors");
const app = express();
const cors = require("cors");
const Product = require("./routes/products");
const Authantication = require("./routes/authentication");
//const Product = require("./models/product");
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
app.use("/api/v1/products", Product);
app.use("/api/v1/authentication", Authantication);

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

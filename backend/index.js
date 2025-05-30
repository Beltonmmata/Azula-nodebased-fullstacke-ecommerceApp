const express = require("express");
require("dotenv").config();
require("express-async-errors");

const app = express();

// Importing middlewares
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const compression = require("compression");

// Swagger setup
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

// Importing routes
const Product = require("./routes/productsRouter");
const Authentication = require("./routes/authenticationRouter");
const Users = require("./routes/userRouter");
const DeliveryOption = require("./routes/deliveryOptionRouter");
const Order = require("./routes/orderRouter");
const Reviews = require("./routes/reviewsRouter");
const Likes = require("./routes/likesRouter");
const Payment = require("./routes/paymentRouter");
const ValidatePromoCode = require("./routes/promocodeRouter");
const Newsletter = require("./routes/newsletterRouter");
const Contact = require("./routes/contactRouter");

// Database connection
const connectDB = require("./db/connect");

// Error handlers
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Using middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(xss());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, try again later",
  })
);
app.use(morgan("dev"));
app.use(compression());

// Root route
app.get("/", (req, res) => {
  res.status(200).send(`
    <h1>Welcome to Azula E-commerce</h1>
    <p><a href="/api-docs" style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;border:none;border-radius:5px;text-decoration:none;font-weight:bold;">View API Documentation</a></p>
  `);
});

// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/api/v1/products", Product);
app.use("/api/v1/authentication", Authentication);
app.use("/api/v1/users", Users);
app.use("/api/v1/deliveryOption", DeliveryOption);
app.use("/api/v1/orders", Order);
app.use("/api/v1/reviews", Reviews);
app.use("/api/v1/likes", Likes);
app.use("/api/v1/orderpayment", Payment);
app.use("/api/v1/validate-promocode", ValidatePromoCode);
app.use("/api/v1/newsletter", Newsletter);
app.use("/api/v1/contact", Contact);

// Error handling
app.use(notFound);
app.use(errorHandlerMiddleware);
app.use((err, req, res, next) => {
  console.error("Error Stack:", err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    data: {},
  });
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log("Error seeding database:", error);
  }
};

start();

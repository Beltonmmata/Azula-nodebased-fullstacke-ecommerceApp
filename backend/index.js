const express = require("express");
require("dotenv").config();
require("express-async-errors");

const app = express();

// Core middlewares
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");

// Swagger setup
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

// Routes
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

// Error middlewares
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Serve static files
app.use(express.static("./public"));

// Body parser
app.use(express.json());

// Cookie parser (critical for reading cookies)
app.use(cookieParser(process.env.JWT_SECRET));

// CORS config (allow frontend to send cookies)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://azula-ecomerce.netlify.app"],
    credentials: true,
  })
);

// Security middlewares
app.use(helmet());
app.use(xss());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, try again later",
  })
);

// Dev and performance middlewares
app.use(morgan("dev"));
app.use(compression());

// Home route
app.get("/api/v1/", (req, res) => {
  res.status(200).send(`
    <h1>Welcome to Azula E-commerce</h1>
    <p><a href="/api/v1/api-docs" style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;border:none;border-radius:5px;text-decoration:none;font-weight:bold;">View API Documentation</a></p>
  `);
});

// Swagger docs
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

// Catch-all error logger
app.use((err, req, res, next) => {
  console.error("Error Stack:", err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    data: {},
  });
});

// Start server
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log("Error starting server:", error);
  }
};

start();

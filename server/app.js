require("dotenv").config();
const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");
const dbConnect = require("./config/database");
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// database connection
dbConnect();

// toodo routes
app.use("/", todoRoutes);

// custom error handler
app.use((error, req, res, next) => {
  const status = error.statusCode || 400;
  const message = error.message || "Internal Server Error";
  return res.status(400).json({ message, stack: error.stack });
});

module.exports = app;

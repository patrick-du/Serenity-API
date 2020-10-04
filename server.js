// Imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// Config
require("dotenv").config();

// Environment Variables
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Start Server
const app = express();

// CORS Middleware
app.use(cors());

// Logging Middleware
app.use(morgan("dev"));

// BodyParser MiddleWare
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Passport Middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

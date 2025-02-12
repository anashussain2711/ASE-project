const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/orders", orderRoutes);

module.exports = app;
// The app module creates an Express app, adds middleware for parsing JSON and enabling CORS, and mounts the orderRoutes router at the /orders endpoint. The app is exported to be used in other files.
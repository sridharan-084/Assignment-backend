const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
require("dotenv").config();
const routes = require("./Routes/routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => {
    console.log("DATABASE NOT CONNECTED");
    console.log(err);
  });

app.listen(4000, (req, res) => {
  console.log("Server is running");
});

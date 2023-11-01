require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const wishesRoutes = require("./routes/wishes.js");
const userRoutes = require("./routes/user.js");
const mongoose = require("mongoose");

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/wishList", wishesRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect("mongodb://localhost:27017/wishlist")
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port} and contected to db`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

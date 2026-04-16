require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

const url = process.env.MONGO_URI

mongoose.connect(url)
.then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
})
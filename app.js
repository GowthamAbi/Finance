const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const userRouters = require("./routes/userRoute");
require("dotenv").config();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

//Routes Start
app.use("/", userRouters);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;

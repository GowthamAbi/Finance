const express = require("express");
const UserController = require("../controllers/userControllers");
const userRoute = express.Router();

userRoute.get("/", UserController.dashboard);
userRoute.post("/register", UserController.register);
userRoute.post("/register", UserController.login);
userRoute.post("/logout", UserController.logout);
module.exports = userRoute;

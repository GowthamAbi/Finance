const express = require("express");
const UserController = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");
const userRoute = express.Router();

userRoute.get("/",authMiddleware, UserController.dashboard);
userRoute.post("/register", UserController.register);
userRoute.post("/login", UserController.login);
userRoute.get("/logout", UserController.logout);
module.exports = userRoute;

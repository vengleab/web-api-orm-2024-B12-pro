const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

userRoutes.get("/users", authMiddleware, userController.getAllUserController);

userRoutes.get("/users/:id", userController.getUserByIdController);

userRoutes.post("/users", userController.createNewUserController);

userRoutes.delete("/users/:id", userController.deleteUserByIdController)
module.exports = userRoutes;

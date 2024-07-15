const { login } = require("../controllers/authController");

const authRoutes = require("express").Router();

authRoutes.post("/login", login)

module.exports = authRoutes;
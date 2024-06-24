const articleController = require("../controllers/articleController");

const articleRoutes = require("express").Router();

articleRoutes.post("/articles", articleController.createNewArticle);


module.exports = articleRoutes;
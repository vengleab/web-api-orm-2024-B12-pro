const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const createNewArticle = async (req, res) => {
  const { title, contents } = req.body;
  await prisma.article.create({ data: {
    title,
    contents,
    createdByUserId: 1
  }})
  res.status(204).send({ message: "created success"})
}

module.exports = {
  createNewArticle,
}
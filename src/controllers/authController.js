const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../utils/jwtUtil");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await prisma.user.findFirst({ where: { username } });

  if (!foundUser) {
    return res.status(401).send({ message: "User does not exists" });
  }

  if (!bcrypt.compareSync(password, foundUser.password)) {
    return res.send({ message: "Wrong password" });
  }

  return res.send({
    message: "Login successful",
    token: generateToken({ userId: foundUser.id, role: "user" }),
  });
};

module.exports = {
  login,
};

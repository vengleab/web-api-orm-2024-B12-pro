const Response = require("../responseBody/Response");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllUserController = async (req, res) => {
  // let { limit = 10, offset = 0 } = req.query;
  // limit = parseInt(limit);
  // offset = parseInt(offset);
  // prisma.user.findMany().then(res => )
  const filteredUser = await prisma.user.findMany();
  res.send(filteredUser);
  // for(let i=offset; i<(offset+limit) && i<users.length; i++){
  //   console.log(i, offset+limit, i<(offset+limit) && i<users.length);
  //   filteredUser.push(users[i]);
  // }
  // const total_page = Math.ceil(users.length/limit);
  // const current_page = offset / limit + 1;

  // return res.send({
  //   data: filteredUser,
  //   pagination: {
  //     total_records: users.length,
  //     limit,
  //     offset,
  //     current_page,
  //     total_page,
  //     has_next: current_page < total_page,
  //   },
  // });
};

const createNewUserController = async (req, res) => {
  const body = req.body;
  const { username, password } = body;
  const newUser = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  // users.push(newUser);
  // const fs = require("fs");
  // fs.writeFileSync("src/models/users2.json", JSON.stringify(users));
  res.send(newUser);
};

const getUserByIdController = async (req, res) => {
  try {
    const { params } = req;
    console.log({ params });
    const { id } = params;
    // const foundUsers = users.filter((user) => {
    //   return user.id == id;
    // });
    // console.log({ foundUsers });
    const foundUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { articles: true} 
    });
    if (foundUser) {
      new Response(res).setResponse(foundUser).send();
    } else
      new Response(res).setStatusCode(404).setMessage("User not found").send();
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

const deleteUserByIdController = async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: parseInt(id) }});
  res.status(204).send({ message: "user is deleted" });
};

module.exports = {
  getAllUserController,
  createNewUserController,
  getUserByIdController,
  deleteUserByIdController
};
// export default userRoutes;

const users = require("../models/users") || [];
const Response = require("../responseBody/Response");

const getAllUserController = (req, res) => {
  let { limit, offset } = req.query;
  throw Error("Random Error");
  limit = parseInt(limit);
  offset = parseInt(limit);
  const filteredUser = [];
  for(let i=offset; i<(offset+limit) && i<users.length; i++){
    console.log(i, offset+limit, i<(offset+limit) && i<users.length);
    filteredUser.push(users[i]);
  }
  const total_page = Math.ceil(users.length/limit);
  const current_page = offset / limit + 1;

  return res.send({
    data: filteredUser,
    pagination: {
      total_records: users.length,
      limit,
      offset,
      current_page,
      total_page,
      has_next: current_page < total_page
    }
  });
};

const createNewUserController = (req, res) => {
  const body = req.body;
  const { username, password } = body;
  const newUser = {
    id: users.length + 1,
    username,
    password,
  };
  users.push(newUser);
  // const fs = require("fs");
  // fs.writeFileSync("src/models/users2.json", JSON.stringify(users));
  res.send(newUser);
};

const getUserByIdController = (req, res) => {
  try {
    const { params } = req;
    console.log({ params });
    const { id } = undefined;
    const foundUsers = users.filter((user) => {
      return user.id == id;
    });
    console.log({ foundUsers });
    new Response(res).setResponse(foundUsers[0]).send();
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

module.exports = {
  getAllUserController,
  createNewUserController,
  getUserByIdController,
};
// export default userRoutes;

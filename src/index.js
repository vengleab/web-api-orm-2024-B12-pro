const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/../.env"})

const webapp = express();
console.log()
webapp.use("/public", express.static("src/assets"));

webapp.get("/", (req, res) => {
  res.send(
    "<h1 style='color: red'>Hello world<img src='/public/img/logo.png' /></h1>"
  );
});

webapp.listen(process.env.PORT, () => {
  console.log(`Running on: http:/localhost:${process.env.PORT}`);
});

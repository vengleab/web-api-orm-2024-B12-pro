const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config({ path: __dirname + "/../.env" });

const webapp = express();
console.log();
webapp.use("/public", express.static("src/assets"));

webapp.use(express.json());

webapp.get("/", (req, res) => {
  res.send(
    "<h1 style='color: red'>Hello world<img src='/public/img/logo.png' /></h1>"
  );
});

webapp.use("/", userRoutes);

webapp.listen(process.env.PORT, () => {
  console.log(`Running on: http:/localhost:${process.env.PORT}`);
});

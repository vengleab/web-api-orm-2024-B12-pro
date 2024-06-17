const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const { pageNotFoundMiddleware, endPointNotFoundMiddleware } = require("./middlewares/notFoundMiddleWare");
const errorMiddleWare = require("./middlewares/errorMiddleWare");
const interceptMiddleWare = require("./middlewares/interceptMiddleWare")

// dotenv.config({ path: __dirname + "/../.env" });
dotenv.config();

const webapp = express();
webapp.use("/public", express.static("src/assets"));

webapp.use(express.json());

webapp.get("/", interceptMiddleWare, (req, res) => {
  console.log("Handling req");
  // for(let i =0; i< 5_000_000_000; i++);
  res.send(
    "<h1 style='color: red'>Hello world<img src='/public/img/logo.png' /></h1>"
  );
});

webapp.use("/api", userRoutes);

webapp.use("/api", endPointNotFoundMiddleware)
webapp.use("/api", errorMiddleWare)

webapp.use("/", pageNotFoundMiddleware)


webapp.listen(process.env.PORT, () => {
  console.log(`Running on: http:/localhost:${process.env.PORT}`);
});

const Express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const route = require("./Routes/route");

require("dotenv").config();

const App = Express();

App.use(cors());
App.use(helmet());
App.use(morgan("common"));

App.get("/", (req, res) => {
  res.json({ message: "home" });
});

App.use("/places", route);

App.listen(process.env.PORT, console.log(`server started `));

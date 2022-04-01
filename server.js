require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080; // importing PORT from .env file
const path = require("path");
const logger = require("morgan");
const connection = require("./database");

app.use(express.json()); // it allows the json data from body
app.use(express.urlencoded({ extended: false, limit: "50mb" })); //
// view engine // we are going to use different templates to send mails
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//logging
app.use(logger("dev"));
// use connection in app
app.use((req, res, next) => {
  req.connection = connection;
  next();
});

//routing
const routes = require("./routes");
app.use("/", routes.user);

app.get("/", (req, res) => {
  res.send("lee");
});

app.listen(port, () => {
  console.log(`Server available at ${port} `);
});

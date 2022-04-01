const mysql = require("mysql");
const config = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "mern-stack-database",
};

const connection = mysql.createConnection(config);

connection.connect((e) => {
  if (!e) {
    console.log("Database connected");
  } else {
    console.log("Database not connected", e);
  }
});

module.exports = connection;

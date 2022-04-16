require("dotenv").config();
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  let token = req.headers.authorization;
  if (token !== undefined) {
    let finaltoken = token.split(" ")[1];
    jwt.verify(finaltoken, process.env.SECRET_KEY, (err, user) => {
      if (user !== null) {
        req.user = user;
        next();
      } else {
        res.send({ success: false, message: "Unauthorized" });
      }
    });
  } else {
    res.send({ success: false, message: "Unauthorized" });
  }
};

module.exports = {
  authentication,
};

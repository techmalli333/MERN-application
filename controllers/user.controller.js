require("dotenv").config();
const {
  createUser,
  fetchUser,
  updateUser,
  deleteUserAccount,
  signinUserAccount,
} = require("../models/user.model");
const bcrypt = require("bcrypt");
const { commonResponse } = require("../common");
const { NULL } = require("mysql/lib/protocol/constants/types");
const { use } = require("bcrypt/promises");
const jwt = require("jsonwebtoken");

const signupUser = (req, res) => {
  bcrypt.hash(req.body.password, 12).then((hash) => {
    let user = { ...req.body, password: hash };
    createUser(req.connection, user, (err, result) => {
      commonResponse({
        res,
        success: err ? false : true,
        message: err ? "User Not Created" : "User Created Successfully",
        data: null,
      });
    });
  });
};

const getUser = (req, res) => {
  fetchUser(req.connection, req.params.email, (err, users) => {
    commonResponse({
      res,
      success: err ? false : true,
      message: err ? "User Not Found" : "User Fetched Successfully",
      data: users,
    });
  });
};

const editUser = (req, res) => {
  updateUser(req.connection, req.body, req.body.email, (err, users) => {
    commonResponse({
      res,
      success: users.affectedRows > 0 ? true : false, // in update query err=null so we are using user hear
      message:
        users.affectedRows > 0 ? "User Updated Successfully" : "User Not Found",
      data: null,
    });
  });
};

const deleteUser = (req, res) => {
  let user = { ...req.body, activestatus: 0 };
  updateUser(req.connection, user, req.body.email, (err, users) => {
    commonResponse({
      res,
      success: users.affectedRows > 0 ? true : false, // in update query err=null so we are using user hear
      message:
        users.affectedRows > 0 ? "User Deleted Successfully" : "User Not Found",
      data: null,
    });
  });
};

const hardDeleteUser = (req, res) => {
  let user = { ...req.body, activestatus: 0 };
  deleteUserAccount(req.connection, req.body.email, (err, users) => {
    commonResponse({
      res,
      success: users.affectedRows > 0 ? true : false,
      message:
        users.affectedRows > 0
          ? "User Deleted Permenently Successfully"
          : "User Not Found",
      data: null,
    });
  });
};

const signinUser = (req, res) => {
  signinUserAccount(req.connection, req.body.email, (err, user) => {
    if (user.length > 0) {
      bcrypt.compare(req.body.password, user[0].password).then((result) => {
        if (result) {
          const token = jwt.sign({ ...user[0] }, process.env.SECRET_KEY, {
            expiresIn: "1d",
          });
          commonResponse({
            res,
            success: true,
            message: "User Logged in Successfully",
            data: null,
            token,
          });
        } else {
          res.send({ success: false, message: "Invalid Password" });
        }
      });
    } else {
      res.send({ success: false, message: "User Not Found!" });
    }
  });
};

const verifyUser = (req, res) => {
  verifyUserAccount(req.connection, req.params.token, (err, result) => {
    if (result.length > 0) {
      updateUser(
        req.connection,
        { refreshtoken: null, expiretoken: null, verified: 1 },
        result[0].email,
        (err, users) => {
          if (users.affectedRows > 0) {
            res.send(
              "<h1>User Verified Successfully</h1><script>window.location.href='https://mern-stack-application.netlify.app/login'</script>"
            );
          } else {
            res.send("<h1>User Not Verified</h1>");
          }
        }
      );
    } else {
      res.send("<h1>User Not Verified</h1>");
    }
  });
};

const forgetpassword = (req, res) => {
  fetchUser(req.connection, req.body.email, (err, users) => {
    if (users.length > 0) {
      sendMail(
        "forgetpassword",
        req,
        res,
        "Reset Your Password",
        "Please check your email to reset password"
      );
    } else {
      res.send({ success: false, message: "User not found!" });
    }
  });
};
const resetPassword = (req, res) => {
  verifyUserAccount(req.connection, req.body.token, (err, result) => {
    if (result.length > 0) {
      bcrypt.hash(req.body.password, 12).then((hash) => {
        updateUser(
          req.connection,
          { password: hash, refreshtoken: null, expiretoken: null },
          result[0].email,
          (err, users) => {
            if (users.affectedRows > 0) {
              res.send({
                success: true,
                data: null,
                message: "Password reset successfully!",
              });
            } else {
              res.send("<h1>User Not Verified</h1>");
            }
          }
        );
      });
    } else {
      res.send({ success: false, message: "User not found!" });
    }
  });
};

const changepassword = (req, res) => {
  signinUserAccount(req.connection, req.body.email, (err, user) => {
    if (user.length > 0) {
      bcrypt.compare(req.body.oldpassword, user[0].password).then((result) => {
        if (result) {
          bcrypt.hash(req.body.password, 12).then((hash) => {
            let user = {
              password: hash,
            };
            updateUser(req.connection, user, req.body.email, (err, users) => {
              commonResponse({
                res,
                success: users.affectedRows > 0 ? true : false,
                message:
                  users.affectedRows > 0
                    ? "Password Changed Successfully"
                    : "User Not Found!",
                data: null,
                req,
              });
            });
          });
        } else {
          res.send({ success: false, message: "Invalid Old Password" });
        }
      });
    } else {
      res.send({ success: false, message: "User not found!" });
    }
  });
};

module.exports = {
  signupUser,
  getUser,
  editUser,
  deleteUser,
  hardDeleteUser,
  signinUser,
  verifyUser,
  forgetpassword,
  resetPassword,
  changepassword,
};

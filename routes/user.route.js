/* 
> Routes
  > /signup (POST)
  > /getUser/:id (GET)
  > /editUser/:id (PUT)
  > /deleteUser/:id (PUT)
*/

const express = require("express");
const {
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
} = require("../controllers/user.controller");
const { authentication } = require("../middleware/authentication");
const router = express.Router();

router.post("/signup", signupUser);
router.get("/getUser/:email", authentication, getUser);
router.put("/editUser", authentication, editUser);
router.put("/deleteUser", authentication, deleteUser);
router.delete("/hardDeleteUser", authentication, hardDeleteUser);

router.post("/signin", signinUser);

router.get("/verifyUser/:token", verifyUser);
router.post("/forgetPassword", forgetpassword);
router.put("/resetPassword", resetPassword);
router.put("/changepassword", authentication, changepassword);

module.exports = router;

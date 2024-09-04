const express = require("express");
const { check } = require("express-validator");
const passwordController = require("../controller/password_controller");

const router = express.Router();

router.post("/createpassword", [
  check("password").isLength({ min: 6 })
], passwordController.createPassword);

router.post("/authentication",[
check("password").isLength({ min: 6 })], passwordController.verify_password);

router.patch("/updateauthenticationpassword/:pid",[
  check("password").isLength({ min: 6 })], passwordController.updatePassword);
  
module.exports = router;

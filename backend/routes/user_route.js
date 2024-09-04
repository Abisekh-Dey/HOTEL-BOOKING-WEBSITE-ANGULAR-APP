const express = require("express");
const { check } = require("express-validator");
const userController = require("../controller/user_controller");

const router = express.Router();

router.post("/signup", [
  check("name").not().isEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("contact_no").notEmpty(),
  check("password").isLength({ min: 6 })
], userController.signup);

router.post("/login",[check("email").normalizeEmail().isEmail(),
check("password").isLength({ min: 6 })], userController.login);

router.post("/backuplogin",[check("email").normalizeEmail().isEmail(),
  check("contact_no").isLength({ min: 10 })], userController.backuplogin);


router.get('/users', userController.getAllUsers);

router.patch(
  '/users/update/:uid',
  [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check("contact_no").isLength({ min: 10 }),
    check('password').isLength({ min: 6 })
  ],
  userController.updateUser
);


module.exports = router;

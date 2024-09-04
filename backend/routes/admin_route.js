const express = require('express');
const { check } = require('express-validator');
const adminController = require('../controller/admin_controller');

const router = express.Router();

router.post(
  '/admin/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
    check('contact_no').isLength({ min: 10 }),
    check('authentication_password').isLength({ min: 6 })
  ],
  adminController.signup
);

router.post("/admin/login",[check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 6 })], adminController.login);

router.post("/admin/backuplogin",[check("email").normalizeEmail().isEmail(),
  check("contact_no").isLength({ min: 10 })], adminController.backuplogin);
  

router.get('/admin', adminController.getAdmin);

router.patch(
  '/admin/update/:aid',
  [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check("contact_no").isLength({ min: 10 }),
    check('password').isLength({ min: 6 })
  ],
  adminController.updateAdmin
);

router.delete('/admin/:adminId/delete/:toBeDeletedAdminId', adminController.deleteAdmin);

module.exports = router;

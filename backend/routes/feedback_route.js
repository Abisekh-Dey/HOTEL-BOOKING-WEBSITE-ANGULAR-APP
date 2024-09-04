const express = require('express');
const { check } = require('express-validator');
const feedbackController = require('../controller/feedback_controller');

const router = express.Router();

router.post(
  '/feedback',
  [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail().notEmpty(),
    check('subject').notEmpty(),
    check('message').notEmpty()
  ],
  feedbackController.CreateMessage
);

router.get("/allfeedbacks",feedbackController.getFeedback);
module.exports = router;
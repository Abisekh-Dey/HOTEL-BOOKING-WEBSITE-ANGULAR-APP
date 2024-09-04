const mongoose = require('mongoose');
const Feedback = require('../models/feedback');
const { validationResult } = require("express-validator");
const HttpError = require('../models/http-error');

// mongoose.connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch(() => {
//     console.log("Connection Failed!");
//   });

const CreateMessage = async (req, res, next) => {
  const { name, email, subject, message } = req.body;
//   console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based, so you need to add 1
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  const createdmessage = new Feedback({
    name,
    email,
    subject,
    message,
    dateofmessage:formattedDate
  });

  try {
    const result = await createdmessage.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err)
    return next(new HttpError('Sending Message failed, please try again.', 505));//
  }
};

const getFeedback = async (req, res) => {
    const feedbacks = await Feedback.find().exec();
    if (!feedbacks) {
      res.send("Not Found");
  
    } else {
      res.json(feedbacks);
    }
  };
  

exports.CreateMessage = CreateMessage;
exports.getFeedback = getFeedback;
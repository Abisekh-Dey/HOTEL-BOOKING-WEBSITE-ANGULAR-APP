const mongoose = require("mongoose");
const Password = require("../models/password");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

// mongoose.connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch(() => {
//     console.log("Connection Failed!");
//   });

const createPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { password } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError('Could not create password, please try again.', 501));//Changed the error status from 500 to 501
  }

  const createdPassword = new Password({
    password: hashedPassword,
  });

  try {
    const result = await createdPassword.save();
    res.status(201).json(result);
  } catch (err) {
    return next(new HttpError('Creating Password failed, please try again.', 502));//Changed the error status from 500 to 502
  }
};

const verify_password = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }
  
    const { password } = req.body;
  
    let existingPassword;
    try {
      existingPassword = await Password.findOne(); // Fetching the only password document.
    } catch (err) {
      return next(new HttpError('Authentication failed, please try again later.', 500));
    }
  
    if (!existingPassword) {
      return next(new HttpError('Password not found, could not log you in.', 403));// When the password not available in database
    }
  
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingPassword.password); // Compare the entered password with the hashed password.
    } catch (err) {
      return next(new HttpError('Could not log you in, please check your credentials and try again.', 501));
    }
  
    if (!isValidPassword) {
      return next(new HttpError('Invalid password, Authentication failed.', 502));
    }
  
    res.status(200).json({ message: 'Authentication successful!',id: existingPassword._id });
  };
  
  const updatePassword = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }
    const { password } = req.body;
    const passwordId = req.params.pid;
  
    let pass;
    try {
      pass = await Password.findById(passwordId);
    } catch (err) {
      const error = new HttpError('Fetching password failed, please try again later.', 500);
      return next(error);
    }
  
    if (!pass) {
      const error = new HttpError('Password not found.', 404);
      return next(error);
    }
  
    pass.password = await bcrypt.hash(password, 12);
  
    try {
      const result = await pass.save();
      res.status(201).json(result);
    } catch (err) {
      const error = new HttpError('Updating password failed, please try again later.', 500);
      return next(error);
    }
  };
  
const getHotelById = async (req, res) => {
  const id = req.params.pid;
  const hotel = await Hotel.findById(id).exec();
  if (!hotel) {
    res.send("Not Found");
  } else {
    res.json(hotel);
  }
};

const updateHotel = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return next(new HttpError("Invalid Input Passed, Please Check your data", 422));
    }
  
    const { name, location } = req.body;
    const hotelId = req.params.pid;
  
    let hotel;
    try {
      hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        const error = new HttpError("Could not find a hotel for the provided id.", 404);
        return next(error);
      }
    } catch (err) {
      const error = new HttpError("Something Went Wrong, Could not Update hotel", 500);
      return next(error);
    }
  
    hotel.name = name;
    hotel.location = location;
    try {
      await hotel.save();
    } catch (err) {
      const error = new HttpError("Something Went Wrong, Could not Update hotel", 500);
      return next(error);
    }
  
    res.status(200).json({ hotel: hotel.toObject({ getters: true }) });
  };
  
const deleteHotelById = async (req, res) => {
  const id = req.params.pid;
  const hotel = await Hotel.findByIdAndDelete(id).exec();

  if (!hotel) {
    res.send("Not Found");
  } else {
    res.send("Deleted");
  }
  res.json(hotel);
};

exports.createPassword = createPassword;
exports.verify_password = verify_password;
exports.updatePassword = updatePassword;
exports.getHotelById = getHotelById;
exports.updateHotel = updateHotel;
exports.deleteHotelById = deleteHotelById;

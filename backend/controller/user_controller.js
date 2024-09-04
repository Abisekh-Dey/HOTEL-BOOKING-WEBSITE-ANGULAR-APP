const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

// mongoose.connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch(() => {
//     console.log("Connection Failed!");
//   });

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { name, email, contact_no, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again later.', 500));
  }

  if (existingUser) {
    return next(new HttpError('User exists already, please login instead.', 420));//Changed the error status from 422 to 420
  }
  let contactofAdmin;
  try {
    contactofAdmin = await User.findOne({ contact_no: contact_no });
    // console.log("hello");
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later.', 503);//
    return next(error);
  }

  if (contactofAdmin) {
    const error = new HttpError('Admin exists already, please login instead.', 420);//
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError('Could not create user, please try again.', 501));//Changed the error status from 500 to 501
  }
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based, so you need to add 1
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const createdUser = new User({
    name,
    email,
    contact_no,
    dateofcreation: formattedDate,
    password: hashedPassword,
    bookings: []
  });

  try {
    const result = await createdUser.save();
    res.status(201).json(result);
  } catch (err) {
    return next(new HttpError('Creating user failed, please try again.', 502));//Changed the error status from 500 to 502
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { email, password, rememberMe } = req.body;
  console.log(req.body);
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    //console.log(existingUser);//This will print the entire mongoose object, in which object the email is found 
  } catch (err) {
    return next(new HttpError('Login failed, please try again later.', 500));
  }

  if (!existingUser) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError('Could not log you in, please check your credentials and try again.', 501));
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email, name: existingUser.name },
      'supersecret_dont_share', // Replace with a secure key
      { expiresIn: rememberMe ? '30d' : '1h' } // 30 days if "Remember Me" is checked, 1 hour otherwise
    );

    res.cookie('token', token, {
      httpOnly: true, // Secure, not accessible via JavaScript
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 1 * 60 * 60 * 1000, // 30 days or 1 hour
      //if i want to login for 30 days then i should do 30* 24 * 60 * 60 * 1000  
      secure: process.env.NODE_ENV === 'production', // Use secure flag in production
    });

    res.status(200).json({ message: 'Login successful!', token: token, name: existingUser.name, id: existingUser.id, contact_no: existingUser.contact_no, email: existingUser.email});
  } catch (err) {
    console.log(err);//
    return next(new HttpError('Logging in failed, please try again.', 502));
  }
};

//Login by contact number 
const backuplogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { email, contact_no, rememberMe } = req.body;
  // console.log(req.body);
  // let existingAdmin;
  try {
    existingUser = await User.findOne({ email: email });
    //console.log(existingAdmin);//This will print the entire mongoose object, in which object the email is found 
  } catch (err) {
    return next(new HttpError('Login failed, please try again later.', 500));
  }

  if (!existingUser) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  if (existingUser.contact_no !== contact_no) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email, name: existingUser.name },
      'supersecret_dont_share', // Replace with a secure key
      { expiresIn: rememberMe ? '30d' : '1h' } // 30 days if "Remember Me" is checked, 1 hour otherwise
    );

    res.cookie('token', token, {
      httpOnly: true, // Secure, not accessible via JavaScript
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 1 * 60 * 60 * 1000, // 30 days or 1 hour
      //if i want to login for 30 days then i should do 30* 24 * 60 * 60 * 1000  
      secure: process.env.NODE_ENV === 'production', // Use secure flag in production
    });

    res.status(200).json({ message: 'Login successful!', token: token, name: existingUser.name, id: existingUser.id, contact_no: existingUser.contact_no, email: existingUser.email });
  } catch (err) {
    console.log(err);//
    return next(new HttpError('Logging in failed, please try again.', 502));
  }
};


const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return next(new HttpError('Fetching users failed, please try again later.', 500));
  }

  res.status(200).json(users);
};

// Update User
const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const { name, email, contact_no, password } = req.body;
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError('Fetching User failed, please try again later.', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('User not found.', 404);
    return next(error);
  }

  user.name = name;
  user.email = email;
  user.contact_no = contact_no;
  user.password = await bcrypt.hash(password, 12);

  try {
    const result = await user.save();
    res.status(201).json(result);
  } catch (err) {
    const error = new HttpError('Updating user failed, please try again later.', 500);
    return next(error);
  }
};

exports.signup = signup;
exports.login = login;
exports.backuplogin = backuplogin;
exports.getAllUsers = getAllUsers;
exports.updateUser = updateUser;
const mongoose = require('mongoose');
const Admin = require('../models/admin');
const Password = require("../models/password");
const { validationResult } = require("express-validator");
const HttpError = require('../models/http-error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// mongoose.connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch(() => {
//     console.log("Connection Failed!");
//   });

// Admin Signup
const signup = async (req, res, next) => {
  const { name, email, contact_no, password, authentication_password } = req.body;
  // console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
    // console.log("hello");
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later.', 503);//
    return next(error);
  }

  if (existingAdmin) {
    const error = new HttpError('Admin exists already, please login instead.', 420);//
    return next(error);
  }
  let contactofAdmin;
  try {
    contactofAdmin = await Admin.findOne({ contact_no: contact_no });
    // console.log("hello");
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later.', 503);//
    return next(error);
  }

  if (contactofAdmin) {
    const error = new HttpError('Admin exists already, please login instead.', 420);//
    return next(error);
  }
  //console.log(existingAdmin);
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('Could not create admin, please try again.', 504);//
    return next(error);
  }
  let existingPassword;
    try {
      existingPassword = await Password.findOne(); // Fetching the only password document.
    } catch (err) {
      return next(new HttpError('Authentication failed, please try again later.', 500));
    }
  
    if (!existingPassword) {
      return next(new HttpError('Password not found, could not log you in.', 403));
    }
  
    let isValidPassword;
    try {
      isValidPassword = await bcrypt.compare(authentication_password, existingPassword.password);
    } catch (err) {
      // console.log(err);
      return next(new HttpError('Could not log you in, please check your credentials and try again.', 501)); // Ensure this error is properly handled
    }
  
    if (!isValidPassword) {
      return next(new HttpError('Invalid password, Authentication failed.', 502));
    }
  
  // res.status(200).json({ message: 'Authentication successful!' });
  // console.log(hashedPassword);
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based, so you need to add 1
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  const createdAdmin = new Admin({
    name,
    email,
    contact_no,
    dateofcreation:formattedDate,
    password: hashedPassword
  });

  try {
    const result = await createdAdmin.save();
    res.status(201).json(result);
  } catch (err) {
    return next(new HttpError('Creating Admin failed, please try again.', 505));//
  }
};

// Admin Login
const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { email, password, rememberMe } = req.body;
  // console.log(req.body);
  // let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
    //console.log(existingAdmin);//This will print the entire mongoose object, in which object the email is found 
  } catch (err) {
    return next(new HttpError('Login failed, please try again later.', 500));
  }

  if (!existingAdmin) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingAdmin.password);
  } catch (err) {
    return next(new HttpError('Could not log you in, please check your credentials and try again.', 501));
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  let token;
  try {
    token = jwt.sign(
      { adminId: existingAdmin.id, email: existingAdmin.email, name: existingAdmin.name },
      'supersecret_dont_share', // Replace with a secure key
      { expiresIn: rememberMe ? '30d' : '1h' } // 30 days if "Remember Me" is checked, 1 hour otherwise
    );

    res.cookie('token', token, {
      httpOnly: true, // Secure, not accessible via JavaScript
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 1 * 60 * 60 * 1000, // 30 days or 1 hour
      //if i want to login for 30 days then i should do 30* 24 * 60 * 60 * 1000  
      secure: process.env.NODE_ENV === 'production', // Use secure flag in production
    });

    res.status(200).json({ message: 'Login successful!', token: token, name: existingAdmin.name,id: existingAdmin._id,email: existingAdmin.email,contact_no: existingAdmin.contact_no });
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
    existingAdmin = await Admin.findOne({ email: email });
    //console.log(existingAdmin);//This will print the entire mongoose object, in which object the email is found 
  } catch (err) {
    return next(new HttpError('Login failed, please try again later.', 500));
  }

  if (!existingAdmin) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  if (existingAdmin.contact_no !== contact_no) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  let token;
  try {
    token = jwt.sign(
      { adminId: existingAdmin.id, email: existingAdmin.email, name: existingAdmin.name },
      'supersecret_dont_share', // Replace with a secure key
      { expiresIn: rememberMe ? '30d' : '1h' } // 30 days if "Remember Me" is checked, 1 hour otherwise
    );

    res.cookie('token', token, {
      httpOnly: true, // Secure, not accessible via JavaScript
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 1 * 60 * 60 * 1000, // 30 days or 1 hour
      //if i want to login for 30 days then i should do 30* 24 * 60 * 60 * 1000  
      secure: process.env.NODE_ENV === 'production', // Use secure flag in production
    });

    res.status(200).json({ message: 'Login successful!', token: token, name: existingAdmin.name,id: existingAdmin._id,contact_no: existingAdmin.contact_no });
  } catch (err) {
    console.log(err);//
    return next(new HttpError('Logging in failed, please try again.', 502));
  }
};

// Get Admin by ID
const getAdmin = async (req, res, next) => {
  const admin = await Admin.find().exec();
  if (!admin) {
    res.send("Admin Not Found");

  } else {
    res.json(admin);
  }
};

// Update Admin
const updateAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const { name, email, contact_no, password } = req.body;
  const adminId = req.params.aid;

  let admin;
  try {
    admin = await Admin.findById(adminId);
  } catch (err) {
    const error = new HttpError('Fetching admin failed, please try again later.', 500);
    return next(error);
  }

  if (!admin) {
    const error = new HttpError('Admin not found.', 404);
    return next(error);
  }

  admin.name = name;
  admin.email = email;
  admin.contact_no = contact_no;
  admin.password = await bcrypt.hash(password, 12);

  try {
    const result = await admin.save();
    res.status(201).json(result);
  } catch (err) {
    const error = new HttpError('Updating admin failed, please try again later.', 500);
    return next(error);
  }
};

// Delete Admin
// const deleteAdmin = async (req, res, next) => {
//   const adminId = req.params.aid;

//   try {
//     await Admin.findByIdAndDelete(adminId);
//   } catch (err) {
//     const error = new HttpError('Deleting admin failed, please try again later.', 500);
//     return next(error);
//   }

//   res.status(200).json({ message: 'Admin deleted.' });
// };
const deleteAdmin = async (req, res, next) => {
  const { adminId, toBeDeletedAdminId } = req.params;

  let deletingAdmin, toBeDeletedAdmin;

  try {
    // Find the admin performing the deletion
    deletingAdmin = await Admin.findById(adminId);

    if (!deletingAdmin) {
      return next(new HttpError('Admin performing the deletion not found.', 404));
    }

    // Find the admin to be deleted
    toBeDeletedAdmin = await Admin.findById(toBeDeletedAdminId);

    if (!toBeDeletedAdmin) {
      return next(new HttpError('Admin to be deleted not found.', 404));
    }

    // Delete the admin
    await Admin.findByIdAndDelete(toBeDeletedAdmin);
  
    res.status(200).json({ message: 'Admin deleted and action logged.' });
  } catch (err) {
    return next(new HttpError('Deleting admin failed, please try again later.', 500));
  }
};

exports.signup = signup;
exports.login = login;
exports.backuplogin = backuplogin;
exports.getAdmin = getAdmin;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;

const mongoose = require('mongoose');
const Booking = require('../models/booking');
const Room = require('../models/room');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

// mongoose.connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch(() => {
//     console.log("Connection Failed!");
//   });

const createBooking = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const { userId, roomId, checkInDate, checkOutDate,guests } = req.body;

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (checkIn >= checkOut) {
    return next(new HttpError('Check-out date must be after check-in date.', 400));
  }

  let room;
  try {
    room = await Room.findById(roomId);
  } catch (err) {
    return next(new HttpError('Fetching room failed, please try again later.', 500));
  }

  if (!room) {
    return next(new HttpError('Room not found.', 404));
  }

  try {
    const existingBooking = await Booking.findOne({
      room: roomId,
      $or: [
        { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } }
      ]
    }).exec();

    if (existingBooking) {
      return next(new HttpError('Room is already booked for these dates.', 401));
    }
  } catch (err) {
    return next(new HttpError('Checking room availability failed, please try again later.', 501));
  }

  const newBooking = new Booking({
    user: userId,
    room: roomId,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    guests: guests 
  });

  try {
    await newBooking.save();
    await Room.findByIdAndUpdate(roomId, { isBooked: true });
  } catch (err) {
    return next(new HttpError('Creating booking failed, please try again.', 502));
  }

  res.status(201).json({ booking: newBooking });
};

const getBookingsByUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const userId = req.params.userId;

  let bookings;
  try {
    bookings = await Booking.find({ user: userId }).populate('room');
  } catch (err) {
    return next(new HttpError('Fetching bookings failed, please try again later.', 500));
  }

  if (!bookings || bookings.length === 0) {
    return next(new HttpError('No bookings found for the provided user ID.', 404));
  }

  res.json({ bookings });
};

const getAllBookings = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  let bookings;
  try {
    bookings = await Booking.find(); // No population, only fetches the booking documents with user and room IDs
  } catch (err) {
    return next(new HttpError('Fetching bookings failed, please try again later.', 500));
  }
  
  res.status(200).json(bookings)
};

const updateBooking = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const checkInDate = req.body.in;
  const checkOutDate = req.body.out;
  const bookingId = req.params.bid;

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const today = new Date();

  if (checkIn >= checkOut) {
    return next(new HttpError('Check-out date must be after check-in date.', 400));
  }

  if (checkIn <= today) {
    return next(new HttpError('Check-in date must be in the future.', 401));
  }

  let booking;
  try {
    booking = await Booking.findById(bookingId);
  } catch (err) {
    return next(new HttpError('Fetching booking failed, please try again later.', 500));
  }

  if (!booking) {
    return next(new HttpError('Booking not found.', 404));
  }
  if (new Date(booking.checkInDate) <= today) {
    return next(new HttpError('Cannot update booking as the check-in date has already passed or is today.', 402));
  }
  try {
    const existingBooking = await Booking.findOne({
      room: booking.room,
      _id: { $ne: bookingId },
      $or: [
        { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } }
      ]
    }).exec();

    if (existingBooking) {
      return next(new HttpError('Room is already booked for these dates.', 403));
    }
  } catch (err) {
    return next(new HttpError('Checking room availability failed, please try again later.', 501));
  }

  booking.checkInDate = checkIn;
  booking.checkOutDate = checkOut;

  try {
    await booking.save();
  } catch (err) {
    return next(new HttpError('Updating booking failed, please try again.', 502));
  }

  res.status(200).json({ booking });
};

const deleteBooking = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
    const bookingId = req.params.bid;
  
    let booking;
    try {
      booking = await Booking.findById(bookingId).populate('room');
      if (!booking) {
        return next(new HttpError('Booking not found.', 404));
      }
    } catch (err) {
      console.error("Error fetching booking:", err);
      return next(new HttpError('Fetching booking failed, please try again later.', 500));
    }
  
    try {
      await Booking.deleteOne({ _id: bookingId });
      await Room.findByIdAndUpdate(booking.room._id, { isBooked: false });
    } catch (err) {
      console.error("Error deleting booking or updating room:", err);
      return next(new HttpError('Deleting booking failed, please try again later.', 500));
    }
  
    res.status(200).json({ message: 'Booking deleted.' });
  };  
exports.createBooking = createBooking;
exports.getBookingsByUser = getBookingsByUser;
exports.getAllBookings = getAllBookings;
exports.updateBooking = updateBooking;
exports.deleteBooking = deleteBooking;

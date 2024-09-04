const mongoose = require('mongoose');
const Review = require('../models/review');
const Hotel = require('../models/hotel');
const HttpError = require('../models/http-error');

// mongoose.connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch(() => {
//     console.log("Connection Failed!");
//   });


const createReview = async (req, res, next) => {
  const { userId, hotelId, rating, comment } = req.body;

  const newReview = new Review({
    user: userId,
    hotel: hotelId,
    rating,
    comment
  });

  try {
    await newReview.save();
  } catch (err) {
    return next(new HttpError('Creating review failed, please try again.', 500));
  }

  res.status(201).json({ review: newReview });
};

const getReviewsByHotel = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  let reviews;
  try {
    reviews = await Review.find({ hotel: hotelId }).populate('user');
  } catch (err) {
    return next(new HttpError('Fetching reviews failed, please try again later.', 500));
  }

  if (!reviews || reviews.length === 0) {
    return next(new HttpError('No reviews found for the provided hotel ID.', 404));
  }

  res.json({ reviews });
};

exports.createReview = createReview;
exports.getReviewsByHotel = getReviewsByHotel;

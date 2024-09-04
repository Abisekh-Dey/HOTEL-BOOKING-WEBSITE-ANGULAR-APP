// controllers/wishlist-controller.js
const mongoose = require('mongoose');
const Wishlist = require('../models/wishlist');
const HttpError = require('../models/http-error');

// mongoose.connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch(() => {
//     console.log("Connection Failed!");
//   });

// Add a hotel to the wishlist
const addHotelToWishlist = async (req, res, next) => {
  console.log(req.body);
  const { userId, hotelId, name, images, location } = req.body;

  // Check if the hotel is already in the user's wishlist
  let existingWishlistItem;
  try {
    existingWishlistItem = await Wishlist.findOne({ userId, hotelId });
  } catch (err) {
    return next(new HttpError('Checking wishlist failed, please try again later.', 500));
  }

  // If the hotel is already in the wishlist, return an error message
  if (existingWishlistItem) {
    return next(new HttpError('Hotel is already in the wishlist.', 409));
  }

  // If the hotel is not in the wishlist, proceed to add it
  const newWishlistItem = new Wishlist({
    userId,
    hotelId,
    name,
    images,
    location
  });

  try {
    await newWishlistItem.save();
  } catch (err) {
    return next(new HttpError('Adding hotel to wishlist failed, please try again.', 500));
  }

  res.status(201).json({ wishlistItem: newWishlistItem });
};


// Delete a hotel from the wishlist by wishlist ID
const deleteWishlistItem = async (req, res, next) => {
  const wishlistId = req.params.wId; // Correcting the variable name

  try {
    const wishlistItem = await Wishlist.findByIdAndDelete(wishlistId);

    if (!wishlistItem) {
      return next(new HttpError('Could not find wishlist item for this id.', 404));
    }

    res.status(200).json({ message: 'Wishlist item deleted.' });
  } catch (err) {
    return next(new HttpError('Could not delete wishlist item, please try again.', 500));
  }
};

// Get all wishlist items
const getWishlistByUserId = async (req, res, next) => {
  const userId = req.params.userId; // Assuming userId is passed as a route parameter
  let wishlist;

  try {
    wishlist = await Wishlist.find({ userId: userId });
  } catch (err) {
    return next(new HttpError('Fetching wishlist failed, please try again later.', 500));
  }

  res.status(200).json({ wishlist });
};

exports.addHotelToWishlist = addHotelToWishlist;
exports.deleteWishlistItem = deleteWishlistItem;
exports.getWishlistByUserId = getWishlistByUserId;
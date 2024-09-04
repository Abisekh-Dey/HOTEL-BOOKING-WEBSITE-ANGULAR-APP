// models/wishlist.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  hotelId: { type: mongoose.Types.ObjectId, required: true, ref: 'Hotel' },
  name: { type: String, required: true },
  images: {type: String,required: true},
  location: { type: String, required: true },
});

module.exports = mongoose.model('Wishlist', wishlistSchema);

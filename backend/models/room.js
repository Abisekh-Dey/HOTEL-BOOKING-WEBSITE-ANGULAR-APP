const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
  isAc: { type: String, required: true },
  images: [{ type: String }],
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true }
});

module.exports = mongoose.model('Room', roomSchema);

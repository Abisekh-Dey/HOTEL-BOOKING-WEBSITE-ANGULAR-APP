const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  password: { type: String, required: true }
});

module.exports = mongoose.model('Password', passwordSchema);

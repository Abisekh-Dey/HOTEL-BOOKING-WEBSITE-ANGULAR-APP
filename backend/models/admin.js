const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact_no: { type:String, required:true, unique: true},
  dateofcreation: { type:String, required:true},
  password: { type: String, required: true }
});

module.exports = mongoose.model('Admin', adminSchema);

const { Schema, default: mongoose } = require("mongoose");

const admin = new Schema({
  username: { require: true, type: String },
  password: { require: true, type: String },
  role: { require: true, type: String },
});

module.exports = mongoose.model('Admin',admin)
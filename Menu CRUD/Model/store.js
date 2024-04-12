const { Schema, default: mongoose } = require("mongoose");

const store = new Schema({
  username: { require: true, type: String },
  password: { require: true, type: String },
  gst: { require: true, type: String },
  // role: { require: true, type: String },
});

module.exports = mongoose.model("Store", store);
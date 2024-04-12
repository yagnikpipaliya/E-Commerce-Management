const { Schema, default: mongoose } = require("mongoose");

const item = new Schema({
  image: { require: true, type: String },
  productname: { require: true, type: String },
  price: { require: true, type: Number },
  stock: { require: true, type: Number },
  store:{  type: mongoose.Schema.Types.ObjectId, ref:'Store'},
});

module.exports = mongoose.model("Item", item);

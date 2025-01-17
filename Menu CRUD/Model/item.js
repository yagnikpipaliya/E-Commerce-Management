const { Schema, default: mongoose } = require("mongoose");

const item = new Schema({
  image: { require: true, type: [String] },
  productname: { require: true, type: String },
  price: { require: true, type: Number },
  stock: { require: true, type: Number },
  store:{  type: mongoose.Schema.Types.ObjectId, ref:'Store'},
  costprice: { require: true, type: Number },
  description: { require: true, type: String },
  category: { require: true, type: String },
});

module.exports = mongoose.model("Item", item);

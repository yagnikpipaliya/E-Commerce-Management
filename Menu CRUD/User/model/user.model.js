const { Schema } = require("mongoose");

const User = new Schema({
    name: { require: true, type: String },
    firstname: { require: true, type: String },
    lastname: { require: true, type: String },
    email: { require: true, type: String },
    profile : { require: true, type: String },
    role: { require: true, type: String },
})

module.exports = mongoose.model('User',User)
const { Schema, default: mongoose } = require("mongoose");

const User = new Schema({
    googleId: { required: true, type: String },
    name: { required: true, type: String },
    firstname: { required: true, type: String },
    lastname: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    picture : { required: true, type: String },
    role: { required: true, type: String },
})

module.exports = mongoose.model('User',User)
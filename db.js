const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  reserved: {type: Boolean, default: false},
  reserver_name: String,
  reserver_email: String,
  url: String,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Wish = mongoose.model('wish', wishSchema);
const User = mongoose.model('user', userSchema);

module.exports = { User, Wish };
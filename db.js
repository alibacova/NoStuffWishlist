const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/wishlist');

const wishSchema = new mongoose.Schema({
  username: String,
  title: String,
  description: String,
  reserved: Boolean,
  reserver_name: String,
  reserver_email: String,
  url: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const Wish = mongoose.model('wish', wishSchema);
const User = mongoose.model('user', userSchema);

module.exports = { User, Wish };
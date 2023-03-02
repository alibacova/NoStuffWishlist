const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');

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
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// static signup method
userSchema.statics.signup = async function(email, password) {

  if (!email || !password) {
    throw Error('Please fill out both email and password fields');
  };

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  };

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  };

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('A user with this email is already registered');
  };

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = this.create({ email, password: hash });
  return user;
};

const Wish = mongoose.model('wish', wishSchema);
const User = mongoose.model('user', userSchema);

module.exports = { User, Wish };
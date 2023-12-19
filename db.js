const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const wishSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  reserved: { type: Boolean, default: false },
  reserver_user_id: { type: String, default: null },
  reserver_email: String,
  reserver_name: String,
  url: String,
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// static signup methods
// TODO: customize error handling, maybe add the cause for better handling on client-side
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill out both email and password fields");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("A user with this email is already registered");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill out both email and password fields");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("The user does not exist. Please check the email entered");
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    throw Error("The password is incorrect. Please check the password entered");
  }
  return user;
};

const Wish = mongoose.model("wish", wishSchema);
const User = mongoose.model("user", userSchema);

module.exports = { User, Wish };

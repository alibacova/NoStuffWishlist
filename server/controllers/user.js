const mongoose = require("mongoose");
const { User } = require("../../db.js");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

const controllers = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.status(200).send({ email, token });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },

  signup: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.signup(email, password);
      const token = createToken(user._id);
      res.status(201).send({ email, token });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },
};

module.exports = controllers;

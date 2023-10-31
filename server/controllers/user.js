const mongoose = require("mongoose");
const { User } = require("../../db.js");

const controllers = {
  login: async (req, res) => {
    res.status(200).send("Success!");
  },
  signup: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.signup(email, password);
      res.status(201).send({ email, user }); //what do I want to return, just email for now?
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },
};

module.exports = controllers;

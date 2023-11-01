const mongoose = require("mongoose");
const { Wish } = require("../../db.js");

const controllers = {
  getWishList: async (req, res) => {
    // console.log('username is ', req.param.username);
    // const username = req.param.username;
    // const list = Wish.aggregate($match: { username });
    // .sort({createdAt: -1})
    const list = await Wish.find({});
    res.status(200).send(list);
  },

  getWish: async (req, res) => {
    const wid = req.params.wid;
    if (!mongoose.Types.ObjectId.isValid(wid)) {
      return res.status(404).json({ error: "The wish was not found" });
    }
    // const username = req.param.username;
    const wish = await Wish.findById(wid);
    if (!wish) {
      return res.status(404).json({ error: "The wish was not found" });
    }
    res.status(200).send(wish);
  },

  addWish: async (req, res) => {
    // console.log('username is ', req.param.username);
    // console.log('wish is ', req.body);
    // if (!req.param.username) {
    //   res.status(401).send('Unauthorized request');
    // }
    if (!req.body.title || !req.body.description) {
      res.status(400).send("Please fill in the title and the description");
    }
    // // const username = req.param.username;
    const { username, title, description, url } = req.body;
    try {
      const wish = await Wish.create({ username, title, description, url });
      res.status(201).send(wish);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateWish: async (req, res) => {
    const wid = req.params.wid;
    if (!mongoose.Types.ObjectId.isValid(wid)) {
      return res.status(404).json({ error: "The wish was not found" });
    }
    // const username = req.param.username;
    const wish = await Wish.findOneAndUpdate({ _id: wid }, req.body, {
      new: true,
    });
    if (!wish) {
      return res.status(400).json({ error: "The wish was not found" });
    }
    res.status(200).send(wish);
  },

  deleteWish: async (req, res) => {
    const wid = req.params.wid;
    if (!mongoose.Types.ObjectId.isValid(wid)) {
      return res.status(404).json({ error: "The wish was not found" });
    }
    // const username = req.param.username;
    const wish = await Wish.findOneAndDelete({ _id: wid });
    if (!wish) {
      return res.status(400).json({ error: "The wish was not found" });
    }
    res.status(200).send(wish);
  },
};

module.exports = controllers;

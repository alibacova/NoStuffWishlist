const mongoose = require("mongoose");
const { Wish } = require("../../db.js");

const controllers = {
  getWishList: async (req, res) => {
    const user_id = req.user_id.id;
    const list = await Wish.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).send(list);
  },

  getWish: async (req, res) => {
    const wid = req.params.wid;
    if (!mongoose.Types.ObjectId.isValid(wid)) {
      return res.status(404).json({ error: "The wish was not found" });
    }
    const wish = await Wish.findById(wid);
    if (!wish) {
      return res.status(404).json({ error: "The wish was not found" });
    }
    res.status(200).send(wish);
  },

  addWish: async (req, res) => {
    if (!req.body.title) {
      return res.status(400).json({ error: "Please fill in the title" });
    }

    const user_id = req.user_id._id;
    const { title, description, url } = req.body;

    try {
      const wish = await Wish.create({ user_id, title, description, url });
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
    const wish = await Wish.findOneAndDelete({ _id: wid });
    if (!wish) {
      return res.status(400).json({ error: "The wish was not found" });
    }
    res.status(200).send(wish);
  },
};

module.exports = controllers;

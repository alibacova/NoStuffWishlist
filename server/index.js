require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const { User, Wish } = require('../db.js');

const port = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello wishlist!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello wishlist!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
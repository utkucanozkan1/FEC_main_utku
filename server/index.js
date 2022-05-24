const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));
const port = process.env.PORT || 3000;
app.use(express.json());

app.all('/*', (req, res) => {
  console.log(`recieved ${req.method.toLowerCase()} request from ${req.url}`);
  var url = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe" + req.url;
  axios({
    url,
    method: req.method.toLowerCase(),
    headers: {
      Authorization: process.env.AUTH,
    },
    params: req.body,
    data: req.body,
  })
    .then((data) => {
      console.log('data');
      res.status(data.status).send(data.data);
    })
    .catch((err) => {
      console.log('server error fetching from api', err);
      res.sendStatus(500);
    });
});

console.log(`listening on  http://localhost:${port}`);
app.listen(process.env.PORT, () => {
});

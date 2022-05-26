/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const axios = require('axios');
const express = require('express');
const path = require('path');
const config = require('../config');

const app = express();
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// Request variables
const port = process.env.PORT || 3000;
const apiUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const headers = {
  headers: {
    Authorization: config.TOKEN,
  },
};

// request counter middleware
let counter = 0;
app.use((req, res, next) => {
  counter += 1;
  let counterMsg = `Request count: >=${counter} `;
  if (counter === 20) {
    counterMsg += '😀';
    console.log(counterMsg);
  } else if (counter === 60) {
    counterMsg += '🙂';
    console.log(counterMsg);
  } else if (counter === 95) {
    counterMsg += '😐';
    console.log(counterMsg);
  } else if (counter === 120) {
    counterMsg += '😠';
    console.log(counterMsg);
  } else if (counter === 150) {
    counterMsg += '😠🤬';
    console.log(counterMsg);
  } else if (counter === 200) {
    counterMsg += '🪦';
    console.log(counterMsg);
  }
  next();
});

// GET item overview
app.get('/products/:id', (req, res) => {
  axios.get(`${apiUrl}products/${req.params.id}`, headers)
    .then((products) => {
      res.send(products.data);
    })
    .catch((err) => {
      console.log('Error getting products:', err.response.status);
      res.sendStatus(err.response.status);
    });
});

// GET item styles
app.get('/products/:id/styles', (req, res) => {
  axios.get(`${apiUrl}products/${req.params.id}/styles`, headers)
    .then((styles) => {
      res.send(styles.data);
    })
    .catch((err) => {
      console.log('Error getting products:', err.response.status);
      res.sendStatus(err.response.status);
    });
});

// GET item reviews meta data
app.get('/reviews/:id/reviewsMeta', (req, res) => {
  axios.get(`${apiUrl}reviews/meta?product_id=${req.params.id}`, headers)
    .then((meta) => {
      res.send(meta.data);
    })
    .catch((err) => {
      console.log('Error getting products:', err.response.status);
      res.sendStatus(err.response.status);
    });
});

// GET item reviews
app.get('/reviews/:id', (req, res) => {
  axios.get(`${apiUrl}reviews/?product_id=${req.params.id}`, headers)
    .then((reviews) => {
      res.send(reviews.data);
    })
    .catch((err) => {
      console.log('Error getting reviews:', err.response.status);
      res.sendStatus(err.response.status);
    });
});

// GET item reviews with params
app.get('/reviews/', (req, res) => {
  axios({
    url: `${apiUrl}reviews`,
    method: 'GET',
    params: {
      page: req.query.page,
      count: req.query.count,
      sort: req.query.sort,
      product_id: req.query.product_id,
    },
    headers: {
      Authorization: config.TOKEN,
    },
  })
    .then((reviews) => {
      res.send(reviews.data);
    })
    .catch((err) => {
      console.log('Error getting reviews:', err.response.status);
      res.sendStatus(err.response.status);
    });
});

// GET questions by product ID
app.get('/questions/:id', (req, res) => {
  axios.get(`${apiUrl}qa/questions?product_id=${req.params.id}&count=100`, headers)
    .then((questions) => {
      res.send(questions.data);
    })
    .catch((err) => {
      console.log('Error getting questions:', err.response.status);
      res.sendStatus(err.response.status);
    });
});

// GET answers by question ID
app.get('/answers/:Qid', (req, res) => {
  // console.log(req.params.Qid);
  axios.get(`${apiUrl}qa/questions/${req.params.Qid}/answers`, headers)
    .then((answers) => {
      res.send(answers.data);
    })
    .catch((err) => {
      console.log('Error getting answers:', err.response.status);
      res.sendStatus(err.response.status);
    });
});

// POST questions
app.post('/questions', (req, res) => {
  axios({
    url: `${apiUrl}qa/questions`,
    method: 'post',
    data: {
      product_id: req.body.product_id,
      name: req.body.name,
      email: req.body.email,
      body: req.body.body,
    },
    headers: {
      Authorization: config.TOKEN,
      contentType: 'application/json',
    },
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('post question error:', err.response.status);
      res.sendStatus(err.response.status);
    });
});

// POST answers
app.post('/answers/:Qid', (req, res) => {
  console.log(req.params.Qid);
  axios({
    url: `${apiUrl}qa/questions/${req.params.Qid}/answers`,
    method: 'post',
    data: {
      photos: [],
      name: req.body.name,
      email: req.body.email,
      body: req.body.body,
    },
    headers: {
      Authorization: config.TOKEN,
      contentType: 'application/json',
    },
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('post answer error:', err.response.status);
      res.sendStatus(err.response.status);
    });
});
// PUT questions Helpful
app.put('/question/helpful/:Qid', (req, res) => {
  axios({
    url: `${apiUrl}qa/questions/${req.params.Qid}/helpful`,
    method: 'put',
    headers: {
      Authorization: config.TOKEN,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err.response.status);
      res.sendStatus(err.response.status);
    });
});
// PUT answers Helpful
app.put('/answer/helpful/:Aid', (req, res) => {
  axios({
    url: `${apiUrl}qa/answers/${req.params.Aid}/helpful`,
    method: 'put',
    headers: {
      Authorization: config.TOKEN,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err.response.status);
      res.sendStatus(err.response.status);
    });
});
// PUT answer Report
app.put('/answer/report/:Aid', (req, res) => {
  axios({
    url: `${apiUrl}qa/answers/${req.params.Aid}/report`,
    method: 'put',
    headers: {
      Authorization: config.TOKEN,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err.response.status);
      res.sendStatus(err.response.status);
    });
});

// GET related item IDs
app.get('/related/:id', (req, res) => {
  axios.get(`${apiUrl}products/${req.params.id}/related`, headers)
    .then((relatedIds) => {
      res.send(relatedIds.data);
    })
    .catch((err) => {
      console.log('Error getting reviews:', err.response.status);
      res.sendStatus(err.response.status);
    });
});

// Post client made review
app.post('/reviews', (req, res) => {
  axios({
    url: `${apiUrl}reviews`,
    method: 'post',
    data: {
      product_id: req.body.product_id,
      rating: req.body.rating,
      summary: req.body.summary,
      recommend: req.body.recommend,
      name: req.body.name,
      email: req.body.email,
      photos: [],
      body: req.body.body,
      characteristics: req.body.characteristics,
    },
    headers: {
      Authorization: config.TOKEN,
      contentType: 'application/json',
    },
  })
    .then(() => {
      console.log('success');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('post review error:', err.response.status);
      res.sendStatus(err.response.status);
    });
});

// Make post request to toggle review to helpful
app.put('/reviews/:review_id/helpful', (req, res) => {
  axios({
    url: `${apiUrl}reviews/${req.params.review_id}/helpful`,
    method: 'put',
    headers: {
      Authorization: config.TOKEN,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('review toggle helpful failed', err.response.status);
      res.sendStatus(err.response.status);
    });
});

//  Make post request to report review
app.put('/reviews/:review_id/report', (req, res) => {
  axios({
    url: `${apiUrl}reviews/${req.params.review_id}/report`,
    method: 'put',
    headers: {
      Authorization: config.TOKEN,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('review toggle report failed', err.response.status);
      res.sendStatus(err.response.status);
    });
});

// Outfitter requests
// POST new item to outfitter.json
app.post('/outfitter', (req, res) => {
  const item = req.body;
  fs.readFile(path.join(__dirname, 'data/outfitter.json'), (readErr, data) => {
    const items = JSON.parse(data);
    // TODO: leaving space for more meaningfull comparison
    if (JSON.stringify(items).includes(JSON.stringify(item))) {
      console.error('\n🚫Err: Outfit already exists in outfitter.json!\nI 💛 My Little Pony 🥺\n');
      res.status(400).send({ message: 'duplicate entry!' });
    } else {
      items.push(item);
      fs.writeFile(path.join(__dirname, 'data/outfitter.json'), JSON.stringify(items, null, '\t'), (writeErr) => {
        if (writeErr) {
          console.log(writeErr);
        }
        res.end();
      });
    }
  });
});

app.listen(port, () => {
  console.log(`listening on  http://localhost:${port}`);
});

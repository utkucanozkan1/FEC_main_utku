// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const axios = require('axios');
const express = require('express');
const path = require('path');
const config = require('../config');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
const port = process.env.PORT || 3000;

const apiUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const headers = {
  headers: {
    Authorization: config.TOKEN,
  },
};

// Get page with a specified id
// app.get('/:id', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/product.html'));
// });

// GET item overview
app.get('/products/:id', (req, res) => {
  axios.get(`${apiUrl}products/${req.params.id}`, headers)
    .then((products) => {
      res.send(products.data);
    })
    .catch((err) => {
      console.log('Error getting products:', err);
    });
});

// GET item styles
app.get('/products/:id/styles', (req, res) => {
  axios.get(`${apiUrl}products/${req.params.id}/styles`, headers)
    .then((styles) => {
      res.send(styles.data);
    })
    .catch((err) => {
      console.log('Error getting products:', err);
    });
});

// GET item reviews meta data
app.get('/reviews/:id/reviewsMeta', (req, res) => {
  axios.get(`${apiUrl}reviews/meta?product_id=${req.params.id}`, headers)
    .then((meta) => {
      res.send(meta.data);
    })
    .catch((err) => {
      console.log('Error getting products:', err);
    });
});

// GET item reviews
app.get('/reviews/:id', (req, res) => {
  axios.get(`${apiUrl}reviews/?product_id=${req.params.id}`, headers)
    .then((reviews) => {
      res.send(reviews.data);
    })
    .catch((err) => {
      console.log('Error getting reviews:', err);
    });
});

// GET questions by product ID
app.get('/questions/:id', (req, res) => {
  axios.get(`${apiUrl}qa/questions?product_id=${req.params.id}&count=100`, headers)
    .then((questions) => {
      res.send(questions.data);
    })
    .catch((err) => {
      console.log('Error getting questions:', err);
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
      console.log('Error getting answers:', err);
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
      console.log('post question error:', err);
      res.sendStatus(404);
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
      console.log('post answer error:', err);
      res.sendStatus(404);
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
      console.log(err);
      res.sendStatus(404);
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
      console.log(err);
      res.sendStatus(404);
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
      console.log(err);
      res.sendStatus(404);
    });
});

// GET related item IDs
app.get('/related/:id', (req, res) => {
  axios.get(`${apiUrl}products/${req.params.id}/related`, headers)
    .then((relatedIds) => {
      res.send(relatedIds.data);
    })
    .catch((err) => {
      console.log('Error getting reviews:', err);
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
      console.log('post review error:', err);
      res.sendStatus(404);
    });
});

// Make post request to toggle review to helpful
app.put('/reviews/:review_id/helpful', (req, res) => {
  axios({
    url: `${apiUrl}/reviews/${req.params.review_id}/helpful`,
    method: 'put',
    headers: {
      Authorization: config.TOKEN,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('review toggle helpful failed', err);
      res.sendStatus(404);
    });
});

//  Make post request to report review
app.put('/reviews/:review_id/report', (req, res) => {
  axios({
    url: `${apiUrl}/reviews/${req.params.review_id}/report`,
    method: 'put',
    headers: {
      Authorization: config.TOKEN,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('review toggle report failed', err);
      res.sendStatus(404);
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

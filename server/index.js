/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
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
  console.log(counter);
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

// Cookie parser middleware (Practice Apps: Part2 reuse)
// session_id cookie is now accessible in every route -> req.session_id
app.use((req, res, next) => {
  const cookieString = req.get('Cookie') || '';

  const parsedCookies = cookieString.split('; ').reduce((cookies, cookie) => {
    if (cookie.length) {
      const index = cookie.indexOf('=');
      const key = cookie.slice(0, index);
      const token = cookie.slice(index + 1);
      // eslint-disable-next-line no-param-reassign
      cookies[key] = token;
    }
    return cookies;
  }, {});

  if (parsedCookies.s_id) {
    req.session_id = parsedCookies.s_id;
  } else {
    req.session_id = uuidv4();
    res.cookie('s_id', req.session_id);
  }

  next();
});

app.get('/test', (req, res) => {
  res.end();
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
      photos: req.body.photos,
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
      photos: req.body.photos,
      body: req.body.body,
      characteristics: req.body.subChar,
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
// GET all outfits in shoppingData.json
app.get('/outfitter', (req, res) => {
  fs.readFile(path.join(__dirname, 'data/shoppingData.json'), (readErr, data) => {
    const entries = JSON.parse(data);
    let sessionIdFound = false;
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i].session_id === req.session_id) {
        sessionIdFound = true;
        res.status(200).send(entries[i].outfitter);
      }
    }
    if (!sessionIdFound) {
      res.send([]);
    }
  });
});
// DELETE an item from shoppingData.json
app.delete('/outfitter', (req, res) => {
  // req.body.productId is productId for card
  // req.body.cards is all card data for all cards
  const { cards, productId } = req.body;
  for (let i = 0; i < cards.length; i += 1) {
    if (cards[i].productId === productId) {
      cards.splice(i, 1);
      break;
    }
  }

  fs.readFile(path.join(__dirname, 'data/shoppingData.json'), (readErr, data) => {
    const entries = JSON.parse(data);
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i].session_id === req.session_id) {
        entries[i].outfitter = cards;
      }
    }
    fs.writeFile(path.join(__dirname, 'data/shoppingData.json'), JSON.stringify(entries, null, '\t'), (writeErr) => {
      if (writeErr) {
        console.log(writeErr);
      }
      res.end();
    });
  });
});
// POST new item to shoppingData.json
app.post('/outfitter', (req, res) => {
  const item = req.body;
  fs.readFile(path.join(__dirname, 'data/shoppingData.json'), (readErr, data) => {
    const entries = JSON.parse(data);
    let sessionIdFound = false;
    // res.end(), res.sendStatus(), etc... don't stop
    // your chunk of code from running fully, it seems,
    // hence the MVP variable
    let errorEncountered = false;
    // Check if session_id already exists
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i].session_id === req.session_id) {
        // TODO: leaving space for more meaningfull comparison
        if (JSON.stringify(entries[i]).includes(JSON.stringify(item))) {
          console.error('\n🚫Err: Outfit already exists in shoppingData.json!\nI 💛 My Little Pony 🥺\n');
          res.status(400).send({ message: 'duplicate entry!' });
          errorEncountered = true;
        } else {
          entries[i].outfitter.push(item);
          sessionIdFound = true;
        }
        break;
      }
    }
    // Don't carry on if error was encountered
    if (!errorEncountered) {
    // If sessionId was not found, add new entry
      if (!sessionIdFound) {
        entries.push({ session_id: req.session_id, outfitter: [item], cart: {} });
      }
      // Write new outfitter
      fs.writeFile(path.join(__dirname, 'data/shoppingData.json'), JSON.stringify(entries, null, '\t'), (writeErr) => {
        if (writeErr) {
          console.log(writeErr);
        }
        res.end();
      });
    }
  });
});

// ShoppingCart requests
app.post('/cart', (req, res) => {
  // TODO: find better way to store thumbnail_url
  const {
    name, size, quantity, thumbnail,
  } = req.body;

  fs.readFile(path.join(__dirname, 'data/shoppingData.json'), (readErr, data) => {
    const entries = JSON.parse(data);
    let sessionIdFound = false;
    // Check if session_id already exists
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i].session_id === req.session_id) {
        sessionIdFound = true;
        // If users shopping card includes the item name...
        if (name in entries[i].cart) {
          const productMeta = entries[i].cart[name];
          // If given size is already in cart...
          if (size.toString() in productMeta) {
            // Add to quantity
            productMeta[size.toString()] += parseInt(quantity, 10);
          } else {
            productMeta[size.toString()] = parseInt(quantity, 10);
          }
        } else {
          // Add new product to cart, if doesn't exist
          const newProduct = {};
          newProduct[size] = quantity;
          entries[i].cart[name] = { ...newProduct, thumbnail };
        }
        break;
      }
    }
    // If sessionId was not found, add new entry
    if (!sessionIdFound) {
      const newSize = {};
      newSize[size] = quantity;
      const newCartEntry = {};
      newCartEntry[name] = { ...newSize, thumbnail };
      entries.push({ session_id: req.session_id, outfitter: [], cart: newCartEntry });
    }
    // Write new outfitter
    fs.writeFile(path.join(__dirname, 'data/shoppingData.json'), JSON.stringify(entries, null, '\t'), (writeErr) => {
      if (writeErr) {
        console.log(writeErr);
      }
      res.end();
    });
  });
});

app.get('/cart', (req, res) => {
  fs.readFile(path.join(__dirname, 'data/shoppingData.json'), (readErr, data) => {
    const entries = JSON.parse(data);
    let sessionIdFound = false;
    // Check if session_id already exists
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i].session_id === req.session_id) {
        const { cart } = entries[i];
        res.json(cart);
        sessionIdFound = true;
        break;
      }
    }
    if (!sessionIdFound) {
      res.send([]);
    }
  });
});

app.delete('/cart', (req, res) => {
  const { name } = req.body;
  fs.readFile(path.join(__dirname, 'data/shoppingData.json'), (readErr, data) => {
    const entries = JSON.parse(data);
    // Look for shopping cart associated with session_id
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i].session_id === req.session_id) {
        // Remove product when found
        delete entries[i].cart[name];
        fs.writeFile(path.join(__dirname, 'data/shoppingData.json'), JSON.stringify(entries, null, '\t'), (writeErr) => {
          if (writeErr) {
            console.log(writeErr);
          }
          res.end();
        });
        break;
      }
    }
    res.end();
  });
});

app.listen(port, () => {
  console.log(`listening on  http://localhost:${port}`);
});

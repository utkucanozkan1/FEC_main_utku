const axios = require('axios');

const retrieve2Reviews = (productId, page, count, sort) => (
  axios.get('/reviews/', {
    params: {
      page,
      count,
      sort,
      product_id: productId,
    },
  })
    .catch((err) => {
      console.log('failed to retrieve 2 reviews', err);
    })
);

const retrieveMeta = (productId) => {
  axios.get(`/reviews/${productId}/reviewsMeta`);
};

const putIsHelpful = (reviewId) => (
  axios.put(`/reviews/${reviewId}/helpful`)
    .catch((err) => {
      console.log('Error setting helpful:', err);
    })
);

const putReported = (reviewId) => (
  axios.put(`/reviews/${reviewId}/report`)
    .catch((err) => {
      console.log('Error setting report:', err);
    })
);

module.exports = {
  retrieve2Reviews,
  putIsHelpful,
  putReported,
  retrieveMeta,
};

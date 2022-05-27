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
);

const retrieveMeta = (productId) => {
  axios.get(`/reviews/${productId}/reviewsMeta`);
};

const setIsHelpful = (reviewId) => (
  axios.put(`/reviews/${reviewId}/helpful`)
    .catch((err) => {
      console.log('Error setting helpful:', err);
    })
);

const setReported = (reviewId) => (
  axios.put(`/reviews/${reviewId}/report`)
    .catch((err) => {
      console.log('Error setting report:', err);
    })
);

// const retrieveAllReviews = (productId) => (
//   axios.get(`/reviews/${productId}`)
//     .catch((err) => {
//       console.log('Error retrieving all reviews', err);
//     })
// );

module.exports = {
  retrieve2Reviews,
  setIsHelpful,
  setReported,
  retrieveMeta,
  // retrieveAllReviews,
};

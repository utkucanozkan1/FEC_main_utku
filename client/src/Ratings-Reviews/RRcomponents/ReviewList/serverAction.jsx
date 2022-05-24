const axios = require('axios');

const retrieve2Reviews = (productId, page) => (
  axios.get(`/reviews/${productId}`)
);

const setIsHelpful = (reviewId) => (
  axios.put(`/reviews/${reviewId}/helpful`)
);

const setReported = (reviewId) => (
  axios.put(`/reviews/${reviewId}/report`)
);

module.exports = {
  retrieve2Reviews,
  setIsHelpful,
  setReported,
};

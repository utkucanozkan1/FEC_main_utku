const axios = require('axios');

const retrieve2Reviews = (productId, page, count, sort) => (
  axios.get(`/reviews/${productId}`, {
    // params: {
    //   product_id: productId,
    //   page,
    //   count,
    //   sort,
    // },
  })
);

const retrieveMeta = (productId) => {
  axios.get(`/reviews/${productId}/reviewsMeta`);
};

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
  retrieveMeta
};
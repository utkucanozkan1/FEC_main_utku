import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewListContainer from '../../RR-styled-components/ReviewListContainer';
import ReviewEntry from './ReviewEntry.jsx';

export default function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);

  function retrieveReviews() {
    return axios.get('/reviews', {
      params: {
        product_id: producId,
        page:1,
        count: 2,
      },
    })
      .then((res) => {
        setReviews([...res.data.results]);
      })
      .catch((err) => {
        console.log('Error, could not retrieve reviews, retrieve', err);
      });
  }

  useEffect(() => {
    axios.get('/reviews', {
      params: {
        product_id: productId,
        page: 1,
        count: 2,
      },
    })
      .then((res) => {
        setReviews([...res.data.results])
      })
      .catch((err) => {
        console.log('Error, could not retrieve reviews, useEffect', err)
      });
  }, []);

  return (
    <ReviewListContainer>
      Reviews
      {/* {reviews.map((review) => (
        <ReviewEntry retrieveReviews={retrieveReviews} key={review.review_id} review={review} />
      ))} */}
    </ReviewListContainer>
  );
}

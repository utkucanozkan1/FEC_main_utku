import React, { useState, useEffect } from 'react';
import ReviewListContainer from '../../RR-styled-components/ReviewListContainer';
import ReviewCard from './ReviewCard';
import { retrieve2Reviews } from './serverAction';

// require('dotenv').config();

export default function ReviewList({ productId = 37313 }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);

  function retrieveReviews() {
    console.log('testing retrieveReviews', productId, page);
    return retrieve2Reviews(productId, page)
      .then((res) => {
        setReviews([...res.data.results]);
      })
      .catch((err) => {
        console.log('Error, could not retrieve reviews, retrieve', err);
      });
  }

  function clickMoreReviews() {
    return retrieve2Reviews(productId, page + 1)
      .then((res) => {
        setReviews([...reviews, ...res.data.results]);
      })
      .then(() => {
        setPage(page + 1);
      })
      .catch((err) => {
        console.log('Error, could not retrieve reviews, clickMore', err);
      });
  }

  useEffect(() => {
    console.log('testing useEffect');
    retrieveReviews();
  }, []);

  return (
    <ReviewListContainer>
      <form>Filter</form>
      {reviews.map((review) => (
        <ReviewCard retrieveReviews={retrieveReviews} key={review.review_id} review={review} />
      ))}
      <button onClick={clickMoreReviews}>MoreReviews</button><button>Add Review</button>
    </ReviewListContainer>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewListContainer from '../../RR-styled-components/ReviewListContainer';
import ReviewEntry from './ReviewEntry';
import config from '../../../../../config';

// require('dotenv').config();

export default function ReviewList({ product_id }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);

  function retrieveReviews() {
    console.log('testing retrieveReviews');
    return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews', {
      headers: {
        Authorization: config.TOKEN,
      },
      params: {
        product_id: 2,
        page: 1,
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
    console.log('testing useEffect');
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/reviews', {
      headers: {
        Authorization: config.TOKEN,
      },
      params: {
        product_id: 2,
        page: 1,
        count: 2,
      },
    })
      .then((res) => {
        setReviews([...res.data.results]);
      })
      .catch((err) => {
        console.log('Error, could not retrieve reviews, useEffect', err);
      });
  }, []);

  return (
    <ReviewListContainer>
      {reviews.map((review) => (
        <ReviewEntry retrieveReviews={retrieveReviews} key={review.review_id} review={review} />
      ))}
    </ReviewListContainer>
  );
}

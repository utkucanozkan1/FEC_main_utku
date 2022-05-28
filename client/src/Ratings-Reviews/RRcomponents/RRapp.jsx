import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ProductIdContext } from '../../index';
import { RatingReviewContainer } from '../RR-styled-components/RRsectionContainerStyle';
import RatingSummary from './RatingSummary/RatingSummary';
import ReviewList from './ReviewList/ReviewList';
import { retrieve2Reviews, retrieveMeta } from './ReviewList/serverAction';

export default function RatingReviews() {
  const { itemId } = useContext(ProductIdContext);
  const [meta, setMeta] = useState({});
  const [ratingFilter, setRatingFilter] = useState('');

  function filterByRating(event) {
    event.preventDefault();
    console.log('still working on this filter');
  }

  // useEffect(() => {
  //   axios.get(`/reviews/${itemId}/reviewsMeta`)
  //     .then((res) => {
  //       setMeta(res.data);
  //     })
  //     .catch((err) => {
  //       console.log('Error, could not retrieve meta', err);
  //     });
  // }, [itemId]);

  return (
    // <RatingsReviewsOuterContainer>
    <RatingReviewContainer>
      <RatingSummary setRatingFilter={filterByRating} />
      <ReviewList ratingFilter={ratingFilter} />
    </RatingReviewContainer>
    // {/* </RatingsReviewsOuterContainer> */}
  );
}

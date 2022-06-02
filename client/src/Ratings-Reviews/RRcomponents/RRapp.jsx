import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ProductIdContext } from '../../index';
import { RatingReviewContainer } from '../RR-styled-components/RRsectionContainerStyle';
import RatingSummary from './RatingSummary/RatingSummary';
import ReviewList from './ReviewList/ReviewList';
import { retrieve2Reviews, retrieveMeta } from './ReviewList/serverAction';

export default function RatingReviews() {
  const [ratingFilter, setRatingFilter] = useState('');

  function filterByRating(event) {
    event.preventDefault();
    console.log('still working on this filter');
  }

  return (
    <>
      <div className="outer-review">
        <section id="reviews" className="reviews-section">
          <RatingSummary setRatingFilter={filterByRating} />
          <ReviewList ratingFilter={ratingFilter} />
        </section>
      </div>
      <br />
    </>
  );
}

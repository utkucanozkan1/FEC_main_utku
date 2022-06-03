import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RatingBreakdownMain from './RatingBreakdown/ratingBreakdownMain';
import { ProductIdContext } from '../../../index';
import AverageStarRating from '../../../../../server/utils/helpers';
import StarRating from '../../../shared/StarRating';

export default function RatingSummary({ setRatingFilter }) {
  const data = useContext(ProductIdContext);
  const [productRatings, setRatings] = useState([]);

  useEffect(() => {
    const ratingCounts = Object.entries(data.ratings);
    const averageRating = (Math.round(AverageStarRating(ratingCounts) * 10) / 10).toFixed(1);
    setRatings(averageRating);
  });

  return (
    <div className="summary-left">
      <h3 className="header-reviews">Ratings and Reviews</h3>
      <br />
      <div className="RatingSummary">
        {productRatings}
        <StarRating rating={productRatings} className="average-star" />
      </div>
      <RatingBreakdownMain data={data} setRatingFilter={setRatingFilter} />
    </div>
  );
}

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SummaryLeft, RatingsSummaryTop } from '../../RR-styled-components/RRsectionContainerStyle';
import RatingBreakdownMain from './RatingBreakdown/ratingBreakdownMain';
import { ProductIdContext } from '../../../index';
import AverageStarRating from '../../../../../server/utils/helpers';
import StarRating from '../../../shared/StarRating';

export default function RatingSummary({ setRatingFilter }) {
  const data = useContext(ProductIdContext);
  const [meta, setMeta] = useState({});
  const [productRatings, setRatings] = useState([]);

  useEffect(() => {
    const ratingCounts = Object.entries(data.ratings);
    const averageRating = Math.round(AverageStarRating(ratingCounts) * 10) / 10;
    setRatings(averageRating);
  });
  // useEffect(() => {
  //   axios.get(`/reviews/${itemId}/reviewsMeta`)
  //     .then((res) => {
  //       setMeta(res.data);
  //       const ratingCounts = Object.entries(res.data.ratings);
  //       const averageRating = Math.round(AverageStarRating(ratingCounts) * 10) / 10;
  //       setRatings(averageRating);
  //     })
  //     .catch((err) => {
  //       console.log('Error, could not retrieve meta', err);
  //     });
  // }, [itemId]);

  return (
    <SummaryLeft>
      <h3>Ratings and Reviews</h3>
      <br />
      <RatingsSummaryTop >
        {productRatings}
        <StarRating rating={productRatings} />
      </RatingsSummaryTop>
      <RatingBreakdownMain data={data} setRatingFilter={setRatingFilter} />
    </SummaryLeft>
  );
}

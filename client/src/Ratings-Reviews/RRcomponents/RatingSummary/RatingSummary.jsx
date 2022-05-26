import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SummaryLeft } from '../../RR-styled-components/RRsectionContainerStyle';
import RatingBreakdownMain from './RatingBreakdown/ratingBreakdownMain';
import { ProductIdContext } from '../../../index';
import AverageStarRating from '../../../../../server/utils/helpers';
import StarRating from '../../../shared/StarRating';

export default function RatingSummary() {
  const [meta, setMeta] = useState({});
  const [productRatings, setRatings] = useState([]);
  const { itemId } = useContext(ProductIdContext);

  useEffect(() => {
    axios.get(`/reviews/${itemId}/reviewsMeta`)
      .then((res) => {
        setMeta(res.data);
        const ratingCounts = Object.entries(res.data.ratings);
        const averageRating = Math.round(AverageStarRating(ratingCounts) * 10) / 10;
        setRatings(averageRating);
      })
      .catch((err) => {
        console.log('Error, could not retrieve meta', err);
      });
  }, [itemId]);

  return (
    <SummaryLeft>
      Ratings summary
      <br />
      <span>
        {productRatings}
        <StarRating rating={productRatings} />
      </span>
      <RatingBreakdownMain meta={meta} />
    </SummaryLeft>
  );
}

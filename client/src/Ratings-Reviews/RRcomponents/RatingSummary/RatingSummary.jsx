import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SummaryLeft } from '../../RR-styled-components/RRsectionContainerStyle';
import RatingBreakdownMain from './RatingBreakdown/ratingBreakdownMain';
import PercentageOfRecs from './PercentageOfRecs';
import AverageStarRating from '../../../../../server/utils/helpers';
import StarRating from '../../../shared/StarRating';

export default function RatingSummary({ productId }) {
  const [meta, setMeta] = useState({});
  const [productRatings, setRatings] = useState([]);

  useEffect(() => {
    axios.get(`/reviews/${productId}/reviewsMeta`)
      .then((res) => {
        setMeta(res.data);
        const ratingCounts = Object.entries(res.data.ratings);
        const averageRating = Math.round(AverageStarRating(ratingCounts) * 10) / 10;
        setRatings(averageRating);
      })
      .catch((err) => {
        console.log('Error, could not retrieve meta', err);
      });
  }, [productId]);

  return (
    <SummaryLeft>
      Ratings summary
      <br />
      <span>
        {productRatings}
        <StarRating rating={productRatings} />
      </span>
      <PercentageOfRecs meta={meta} />
      <RatingBreakdownMain meta={meta} />
    </SummaryLeft>
  );
}


// useEffect(() => {
//   const ratingsPromises = products.map((product) => (
//     axios.get(`/reviews/${product.id}/reviewsMeta`)
//   ));
//   Promise.all(ratingsPromises)
//     .then((allProducts) => {
//       setRatings(allProducts.map((ratedProduct) => {
//         const ratingCounts = Object.entries(ratedProduct.data.ratings);
//         return getAverageRating(ratingCounts);
//       }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, [products]);
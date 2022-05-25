
import React, { useState, useEffect } from 'react';
import { SummaryLeft } from '../../RR-styled-components/RRsectionContainerStyle';
import RatingBreakdownMain from './RatingBreakdown/ratingBreakdownMain';
import PercentageOfRecs from './PercentageOfRecs';
import AverageStarRating from '../../../../../server/utils/helpers';
import StarRating from '../../../shared/StarRating';

export default function RatingSummary({ meta }) {
  let ratings = {};
  if (Object.keys(meta).length !== 0) {
    ratings = Object.entries(meta.ratings);
  }
  return (
    <SummaryLeft>
      Ratings summary
      <span>
        <AverageStarRating ratings={ratings} />
        <StarRating props={meta} />
      </span>
      <PercentageOfRecs meta={meta} />
      <RatingBreakdownMain meta={meta} />
    </SummaryLeft>
  );
}

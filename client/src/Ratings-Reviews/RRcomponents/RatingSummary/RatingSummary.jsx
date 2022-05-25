import React from 'react';
import { SummaryLeft } from '../../RR-styled-components/RRsectionContainerStyle';
import RatingBreakdownMain from './RatingBreakdown/ratingBreakdownMain';
import PercentageOfRecs from './PercentageOfRecs';
import ProductBreakdown from '../ProductBreakdown/ProductBreakdown';
import AverageStarRating from '../AverageRating/AverageRating';

export default function RatingSummary() {
  return (
    <SummaryLeft>
      Ratings summary
      <AverageStarRating />
      <PercentageOfRecs />
      <RatingBreakdownMain />
      <ProductBreakdown />
    </SummaryLeft>
  );
}

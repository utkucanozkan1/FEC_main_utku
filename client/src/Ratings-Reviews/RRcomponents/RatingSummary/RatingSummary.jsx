import React from 'react';
import SummaryLeft from '../../RR-styled-components/RatingSummary';
import RatingBreakdownMain from './RatingBreakdown/ratingBreakdownMain';

export default function RatingSummary() {
  return (
    <SummaryLeft>
      Ratings summary
      <RatingBreakdownMain />
    </SummaryLeft>
  );
}

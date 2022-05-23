import React from 'react';
import RatingsBreakdown from '../../../RR-styled-components/RatingsBreakdown';
import BarChart from './barChart';
import RatingCount from './ratingCount';
import StarLabels from './starLabels';

export default function RatingBreakdownMain() {
  return (
    <RatingsBreakdown>
      <h4>ratingsbreakdown</h4>
      <StarLabels />
      <BarChart />
      <RatingCount />
    </RatingsBreakdown>
  );
}

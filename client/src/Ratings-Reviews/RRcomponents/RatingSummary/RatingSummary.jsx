import React from 'react';
import styled from 'styled-components';
import RatingBreakdownMain from './RatingBreakdown/ratingBreakdownMain.jsx'

const SummaryLeft = styled.div`
display: flex;
flex-flow: column wrap;
align-self: flex-end;
`;

export default function RatingSummary() {
  return (
    <SummaryLeft>
      Ratings summary
      <RatingBreakdownMain />
    </SummaryLeft>
  );
}

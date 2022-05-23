import React from 'react';
import styled from 'styled-components';
import BarChart from './barChart.jsx';
import RatingCount from './ratingCount.jsx';
import StarLabels from './starLabels.jsx';

const Breakdown = styled.div`
display: flex;
flex-flow: column wrap;
align-self: flex-start;
`;

export default function RatingBreakdownMain() {
  return (
    <Breakdown className="ratingsbreakdown main">
      ratingsbreakdown
      <BarChart />
      <RatingCount />
      <StarLabels />
    </Breakdown>
  );
}

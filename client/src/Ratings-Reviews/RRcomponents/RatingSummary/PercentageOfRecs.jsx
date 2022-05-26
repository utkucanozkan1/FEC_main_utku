import React from 'react';
import { Percentage } from '../../RR-styled-components/RRsectionContainerStyle';

export default function PercentageOfRecs({ meta }) {
  // const recommendedArray = Object.values(meta.recommended)
  // const average = recommendedArray.reduce((a, b) => a + b) / recommendedArray.length;
  return (
    <Percentage>
      PercentageRecs
      {/* {average} */}
    </Percentage>
  );
}

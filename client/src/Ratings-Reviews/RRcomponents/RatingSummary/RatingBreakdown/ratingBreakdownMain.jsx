import React, { useState, useEffect } from 'react';
import { RatingsBreakdown } from '../../../RR-styled-components/RRsectionContainerStyle';
import BarChart from './barChart';

export default function RatingBreakdownMain({ meta }) {
  const characteristics = {
    Size: ['Too small', 'Perfect', 'Too wide'],
    Width: ['Too narrow', 'Perfect', 'Too wide'],
    Comfort: ['Uncomfortable', 'Ok', 'Perfect'],
    Quality: ['Poor', 'Perfect'],
    Length: ['Runs Short', 'Perfect', 'Runs long'],
    Fit: ['Runs tight', 'Perfect', 'Runs long'],
  };
  const starRatings = [5, 4, 3, 2, 1];
  let totalReview = 0;
  let recommend = 100;

  if (Object.keys(meta).length !== 0) {
    for (const star in meta.ratings) {
      totalReview += 1
      recommend = Number(meta.recommended.true) / (Number(meta.recommended.true) + Number(meta.recommended.false)) * 100;
    }
  }

  recommend = recommend.toFixed(0);

  return (
    <RatingsBreakdown>
      {
      Object.keys(meta).length !== 0 ? (
        <div>
          <span>{recommend}% of reveiws recommend this product</span>
          <div>
            <span>1-Star {meta.ratings['1']}</span>
            <br />
            <span>2-Star {meta.ratings['2']}</span>
            <br />
            <span>3-Star {meta.ratings['3']}</span>
            <br />
            <span>4-Star {meta.ratings['4']}</span>
            <br />
            <span>5-Star {meta.ratings['5']}</span>
          </div>
          <div>
            <h4>characteristic breakdown</h4>
            {
         meta.characteristics ? Object.keys(meta.characteristics).map((char, i) => (
           <div key={i}>
             <span>
               {char}
               {Math.round(meta.characteristics[char].value)}
             </span>
           </div>
         )) : (null)
          }
          </div>
        </div>
      ) : null
      }
    </RatingsBreakdown>
  );
}

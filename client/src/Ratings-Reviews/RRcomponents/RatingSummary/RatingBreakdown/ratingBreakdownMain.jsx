import React, { useState, useEffect } from 'react';
import { RatingsBreakdown, OuterBarGraph, InnerBarGraph } from '../../../RR-styled-components/RRsectionContainerStyle';
import BarChart from './barChart';
import styled from 'styled-components';


export default function RatingBreakdownMain({ meta, setRatingFilter }) {
  const characteristics = {
    Size: ['Runs small', 'Perfect', 'Runs wide'],
    Width: ['Runs narrow', 'Perfect', 'Runs wide'],
    Comfort: ['Uncomfortable', 'Ok', 'Perfect'],
    Quality: ['Poor', 'Ok', 'Perfect'],
    Length: ['Runs Short', 'Perfect', 'Runs long'],
    Fit: ['Runs tight', 'Perfect', 'Runs long'],
  };
  const starRatings = [5, 4, 3, 2, 1];
  let totalReview = 0;
  let sumRating = 0;
  let recommend = 100;

  if (Object.keys(meta).length !== 0) {
    for (const star in meta.ratings) {
      totalReview += 1
      sumRating += Number(meta.ratings[star]);
      recommend = Number(meta.recommended.true) / (Number(meta.recommended.true) + Number(meta.recommended.false)) * 100;
    }
  }

  recommend = recommend.toFixed(0);

  return (
    <RatingsBreakdown>
      {
      Object.keys(meta).length !== 0
        ? (
          <div>
            <span>{recommend}% of reviews recommend this product</span>
            {starRatings.map((rating, i) => (
              <OuterBarGraph key={i} onClick={() => setRatingFilter(rating)}>
                <InnerBarGraph>{rating}</InnerBarGraph>
                <InnerBarGraph>star</InnerBarGraph>
                <BarChart length={meta.ratings[rating] / sumRating * 100} />
                <InnerBarGraph>{meta.ratings[rating]}</InnerBarGraph>
              </OuterBarGraph>
            ))}
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

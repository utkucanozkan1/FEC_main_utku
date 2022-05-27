import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  RatingsBreakdown, OuterBarGraph, InnerBarGraph, ProductBreakdownContainer, Recommend,
  Character, CharacterGraph,
} from '../../../RR-styled-components/RRsectionContainerStyle';
import BarChart from './barChart';
import Arrow from './arrow';

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
  let totalReviews = 0;
  let sumRating = 0;
  let recommend = 100;

  if (Object.keys(meta).length !== 0) {
    for (const star in meta.ratings) {
      totalReviews += Number(meta.ratings)
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
            <Recommend>
              {recommend}% of reviews recommend this product
              <br />
             {sumRating} reviews
            </Recommend>
            {starRatings.map((rating, i) => (
              <OuterBarGraph key={i} onClick={setRatingFilter}>
                <InnerBarGraph>{rating}</InnerBarGraph>
                <InnerBarGraph>star</InnerBarGraph>
                <BarChart length={meta.ratings[rating] / sumRating * 100} />
                <InnerBarGraph>{meta.ratings[rating]}</InnerBarGraph>
              </OuterBarGraph>
            ))}
            <ProductBreakdownContainer>
              <h4>characteristic breakdown</h4>
              {
          meta.characteristics ? Object.keys(meta.characteristics).map((char, i) => (
            <CharacterGraph key={i}>
              <span>{char}</span>
              <Arrow
                average={((meta.characteristics[char].value / 5) * 100).toFixed(0)}
              />
              <Character>
                {characteristics[char].map((element, index) => (<span key={index}>{element}</span>))}
              </Character>
            </CharacterGraph>
          )) : (null)
          }
            </ProductBreakdownContainer>
          </div>
        ) : null
      }
    </RatingsBreakdown>
  );
}

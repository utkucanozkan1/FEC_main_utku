import React, { useState, useEffect } from 'react';
import {
  OuterBarGraph, InnerBarGraph, ProductBreakdownContainer, Recommend,
  Character, CharacterGraph,
} from '../../../RR-styled-components/RRsectionContainerStyle';
import BarChart from './barChart';
import Arrow from './arrow';

export default function RatingBreakdownMain({ data, setRatingFilter }) {
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

  if (Object.keys(data).length !== 0) {
    for (const star in data.ratings) {
      totalReviews += Number(data.ratings)
      sumRating += Number(data.ratings[star]);
      recommend = Number(data.recommended.true) / (Number(data.recommended.true) + Number(data.recommended.false)) * 100;
    }
  }

  recommend = recommend.toFixed(0);

  return (
    <div className= "ratings-breakdown">
      {
      Object.keys(data).length !== 0
        ? (
          <div>
            <Recommend>
              {recommend}
              % of reviews recommend this product
            </Recommend>
            {starRatings.map((rating, i) => (
              <OuterBarGraph key={i} onClick={setRatingFilter}>
                <InnerBarGraph>{rating}</InnerBarGraph>
                <InnerBarGraph>star</InnerBarGraph>
                <BarChart length={data.ratings[rating] > 0
                  ? data.ratings[rating] / sumRating * 100 : 0} />
                <InnerBarGraph>{data.ratings[rating] > 0 ? data.ratings[rating] : 0}</InnerBarGraph>
              </OuterBarGraph>
            ))}
            <ProductBreakdownContainer>
              {
          data.characteristics ? Object.keys(data.characteristics).map((char, i) => (
            <CharacterGraph key={i}>
              <span>{char}</span>
              <Arrow
                average={((data.characteristics[char].value / 5) * 100).toFixed(0)}
              />
              <Character>
                {characteristics[char].map((element, i) =>
                  (<span className="characteristic" key={i}>{element}</span>))}
              </Character>
            </CharacterGraph>
          )) : (null)
          }
            </ProductBreakdownContainer>
          </div>
        ) : null
      }
    </div>
  );
}

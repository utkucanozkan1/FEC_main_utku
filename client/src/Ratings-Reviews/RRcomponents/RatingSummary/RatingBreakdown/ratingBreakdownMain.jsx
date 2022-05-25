import React from 'react';
import { RatingsBreakdown } from '../../../RR-styled-components/RRsectionContainerStyle';
import BarChart from './barChart';

export default function RatingBreakdownMain({ meta }) {
  return (
    <RatingsBreakdown>
      <h4>ratingsbreakdown</h4>
      {
      Object.keys(meta).length !== 0 ? (
      <div>
        {/* <> */}
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
        {/* </> */}
      <div>
      <h4>characteristic breakdown</h4>
        {
        meta.characteristics ? Object.keys(meta.characteristics).map((char, i) =>(
          <div key={i}>
            <span>{char}</span>
            <span>{meta.characteristics[char].value}</span>
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

import React from 'react';
import CardDiv from './RIOC-styled-components/CardDiv';

function RelatedCard({ cardNum }) {
  return (
    <CardDiv onClick={() => { console.log('Should go to product page'); }}>
      <p>Card</p>
      <p>{cardNum}</p>
    </CardDiv>
  );
}

export default RelatedCard;

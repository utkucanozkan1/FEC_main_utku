import React from 'react';
import CardDiv from './RIOC-styled-components/CardDiv';

function OutfitCard({ cardNum }) {
  return (
    <CardDiv onClick={() => { console.log('Should go to product page'); }}>
      <p>Outfit Card</p>
      <p>{cardNum}</p>
    </CardDiv>
  );
}

export default OutfitCard;

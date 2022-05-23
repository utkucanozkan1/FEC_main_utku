import axios from 'axios';
import React from 'react';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import OutfitCard from './OutfitCard';
import CardContainer from './RIOC-styled-components/CardContainer';

const fakeArray = [1, 2, 3, 4];

function OutfitView() {
  return (
    <div>
      <h6>YOUR OUTFITS</h6>
      <CardContainer>
        <LeftArrow />
        {fakeArray.map((card) => (
          <OutfitCard key={card} cardNum={card} />
        ))}
        <RightArrow />
      </CardContainer>
    </div>
  );
}

export default OutfitView;

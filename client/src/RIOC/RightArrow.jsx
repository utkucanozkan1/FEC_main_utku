import React from 'react';
import CarouselButton from './RIOC-styled-components/CarouselButtons';

function RightArrow() {
  return (
    <CarouselButton onClick={() => { console.log('Click'); }}>
      <p> &#62; </p>
    </CarouselButton>
  );
}

export default RightArrow;

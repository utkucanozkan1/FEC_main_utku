import React from 'react';
import CarouselButton from './RIOC-styled-components/CarouselButtons';

function RightArrow() {
  return (
    <CarouselButton onClick={() => { console.log('Click'); }}>
      &#62;
    </CarouselButton>
  );
}

export default RightArrow;

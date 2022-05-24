import React from 'react';
import CarouselButton from './RIOC-styled-components/CarouselButtons';

function LeftArrow() {
  return (
    <CarouselButton onClick={() => { console.log('scroll left'); }}>
      &#60;
    </CarouselButton>
  );
}

export default LeftArrow;

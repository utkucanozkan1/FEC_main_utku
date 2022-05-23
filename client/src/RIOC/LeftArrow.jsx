import React from 'react';
import CarouselButton from './RIOC-styled-components/CarouselButtons';

function LeftArrow() {
  return (
    <CarouselButton onClick={() => { console.log('Click'); }}>
      <p> &#60; </p>
    </CarouselButton>
  );
}

export default LeftArrow;

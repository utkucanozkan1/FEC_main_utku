import React, { useContext } from 'react';
import CarouselButton from './RIOC-styled-components/CarouselButtons';
import { ViewableContext } from './RelatedView'
import { CardProductContext } from './RelatedView';
function RightArrow() {
  const { products, viewable, setViewable } = useContext(ViewableContext);
  console.log('Products:', products, 'Viewable:', viewable, 'setView:', setViewable);
  function scrollRight() {
    const start = products.indexOf(viewable[0]);
    console.log('Scroll right');
    if (products.length > start + 4) {
      setViewable(products.slice(start + 1, start + 5));
    } else {
      //hide right arrow
    }
  }
  return (
    <CarouselButton onClick={scrollRight}>
      &#62;
    </CarouselButton>
  );
}

export default RightArrow;

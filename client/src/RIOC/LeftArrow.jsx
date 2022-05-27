import React, { useContext } from 'react';
import CarouselButton from './RIOC-styled-components/CarouselButtons';
import { ViewableContext } from './RelatedView';

function LeftArrow() {
  const { viewable, setViewable, position, setPosition, related, end, setEnd } = useContext(ViewableContext);

  function scrollLeft() {
    setPosition((prevPosition) => prevPosition - 1);
    setEnd(false);
  }

  return (
    <CarouselButton onClick={scrollLeft}>
      { position === 0 ? '' : '<' }
    </CarouselButton>
  );
}

export default LeftArrow;

import React, { useContext } from 'react';
import CarouselButton from './RIOC-styled-components/CarouselButtons';
import { ViewableContext } from './RelatedView';
import { OutfitContext } from './OutfitView';

function LeftArrow({outfitAttr}) {
  const { viewable, setViewable, position, setPosition, related, end, setEnd } = useContext(ViewableContext);
  const { outfit, oPosition, setOPosition, oEnd, setOEnd } = useContext(OutfitContext);

  function scrollLeft() {
    if (outfitAttr === 'outfit') {
      setOPosition((prevPosition) => prevPosition - 1);
      setOEnd(false);
    } else {
      setPosition((prevPosition) => prevPosition - 1);
      setEnd(false);
    }
    if (position === 0) {

    }
  }

  return (
    <CarouselButton>
      { position === 0 ? '' : <img src="../../assets/Images/arrow-black.svg" alt="carousel-next" className="arrow-black left" onClick={scrollLeft} /> }
    </CarouselButton>
  );
}

export default LeftArrow;

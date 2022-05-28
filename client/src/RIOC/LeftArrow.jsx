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
    } else {
      setPosition((prevPosition) => prevPosition - 1);
      setEnd(false);
    }
  }

  return (
    <CarouselButton onClick={scrollLeft}>
      { position === 0 ? '' : '<' }
    </CarouselButton>
  );
}

export default LeftArrow;

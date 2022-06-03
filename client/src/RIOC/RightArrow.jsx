import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import CarouselButton from './RIOC-styled-components/CarouselButtons';
import { ViewableContext } from './RelatedView';
import { OutfitContext } from './OutfitView';

function RightArrow({ outfitAttr }) {
  const {
    viewable, setViewable, position, setPosition,
    related, end, setEnd,
  } = useContext(ViewableContext);
  const { outfit, oPosition, setOPosition, oEnd, setOEnd } = useContext(OutfitContext);

  function getNextItem() {
    const nextId = related[position + 3];
    axios.get(`/products/${nextId}`)
      .then((nextProduct) => {
        axios.get(`/products/${nextProduct.data.id}/styles`)
          .then((nextStyle) => {
            setViewable((prevViewable) => (
              [...prevViewable, Object.assign(nextProduct.data, nextStyle.data)]
            ));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function scrollRight() {
    // I guess React turns classNames into abstract letters. That className refers to
    // an outfit arrow being clicked rather than a related items arrow
    if (outfitAttr === 'outfit') {
      setOPosition((prevPosition) => (prevPosition + 1));
      if (oPosition + 4 >= outfit.length) {
        setOEnd(true);
      }
    } else {
      setPosition((prevPosition) => (prevPosition + 1));
    }
  }

  useEffect(() => {
    if (related) {
      if (position + 4 >= related.length && related.length > 0) {
        setEnd(true);
      }
      if (related.length > viewable.length && position + 3 === viewable.length) {
        getNextItem();
      }
    }
  }, [position]);

  return (
    <div className="carouselButton">
      { end ? '' : <img src="../../assets/Images/arrow-black.svg" alt="carousel-next" className="arrow-black right" onClick={scrollRight} /> }
    </div>
  );
}

export default RightArrow;

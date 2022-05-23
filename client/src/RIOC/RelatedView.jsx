import React from 'react';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import RelatedCard from './RelatedCard';
import CardContainer from './RIOC-styled-components/CardContainer';

const fakeArray = [1, 2, 3, 4];

function RelatedView() {
  return (
    <div>
      <h6>RELATED PRODUCTS</h6>
      <LeftArrow />
      <CardContainer>
        {fakeArray.map((card) => (
          <RelatedCard cardNum={card} />
        ))}
      </CardContainer>
      <RightArrow />
    </div>
  );
}

export default RelatedView;

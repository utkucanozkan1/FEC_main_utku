import React, { useState, useContext } from 'react';
import CardDiv from './RIOC-styled-components/CardDiv';
import '../../dist/styles/styles-val.css';
import { CardProductContext } from './RelatedView';

function AddToOutfitCard() {
  function clickHanlder() {

  }

  return (
    <CardDiv onClick={clickHanlder}>
      <div className="addCard">+</div>
      <h3 style={{ whiteSpace: 'normal', textAlign: 'center' }}>ADD TO OUTFIT</h3>
    </CardDiv>
  );
}

export default AddToOutfitCard;

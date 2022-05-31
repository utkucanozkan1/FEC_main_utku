import React, { useState, useContext } from 'react';
import CardDiv from './RIOC-styled-components/CardDiv';
import '../../dist/styles/styles-val.css';
import { OutfitContext } from './OutfitView';
import { ProductIdContext } from '../index';

function AddToOutfitCard() {
  const { outfit, setOutfit } = useContext(OutfitContext);
  const { addToOutfitter } = useContext(ProductIdContext);

  return (
    <div className="card" onClick={addToOutfitter}>
      <div className="addCard">+</div>
      <h6 style={{ whiteSpace: 'normal', textAlign: 'center' }}>ADD TO OUTFIT</h6>
    </div>
  );
}

export default AddToOutfitCard;

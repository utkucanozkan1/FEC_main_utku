import React, { useState, useContext } from 'react';
import CardDiv from './RIOC-styled-components/CardDiv';
import '../../dist/styles/styles-val.css';
import { OutfitContext } from './OutfitView';

function AddToOutfitCard() {
  const { outfit, setOutfit } = useContext(OutfitContext);
  function addToOutfit() {
    console.log('should add featured product to outfit');
    // PENDING
    // axios.post('/outfitter', starred)
    //   .then()
    //   .catch((err) => {
    //     console.error(`--> 🚫 ${err.response.data.message}`);
    //   });
  }

  return (
    <CardDiv onClick={addToOutfit}>
      <div className="addCard">+</div>
      <h3 style={{ whiteSpace: 'normal', textAlign: 'center' }}>ADD TO OUTFIT</h3>
    </CardDiv>
  );
}

export default AddToOutfitCard;

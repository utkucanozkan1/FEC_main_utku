import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import OutfitCard from './OutfitCard';
import AddToOutfitCard from './AddToOutfit';
import CardContainer from './RIOC-styled-components/CardContainer';

export const OutfitContext = React.createContext();

function OutfitView() {
  const [outfit, setOutfit] = useState([]);

  useEffect(() => {
    axios.get('/outfitter')
      .then((outfitItems) => {
        setOutfit(outfitItems.data);
      });
  }, []);

  return (
    <div>
      <h6>YOUR OUTFITS</h6>
      <CardContainer>
        <OutfitContext.Provider value={{ outfit, setOutfit }}>
          <LeftArrow />
          <AddToOutfitCard />
          {outfit.map((card, i) => (
            <OutfitCard key={i} card={card} />
          ))}
          <RightArrow />
        </OutfitContext.Provider>
      </CardContainer>
    </div>
  );
}

export default OutfitView;

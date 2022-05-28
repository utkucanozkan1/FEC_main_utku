import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import OutfitCard from './OutfitCard';
import AddToOutfitCard from './AddToOutfit';
import CardContainer from './RIOC-styled-components/CardContainer';

export const OutfitContext = React.createContext('default');

function OutfitView() {
  const [outfit, setOutfit] = useState([]);
  const [oPosition, setOPosition] = useState(0);
  const [oEnd, setOEnd] = useState(false);
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
        <OutfitContext.Provider value={{ outfit, setOutfit, oPosition, setOPosition, oEnd, setOEnd }}>
          { oPosition === 0 ? <> </> : <LeftArrow outfitAttr="outfit" /> }
          <AddToOutfitCard />
          {outfit.slice(oPosition, oPosition + 4).map((card, i) => (
            <OutfitCard key={i} card={card} />
          ))}
          { oEnd ? <> </> : <RightArrow outfitAttr="outfit" /> }
        </OutfitContext.Provider>
      </CardContainer>
    </div>
  );
}

export default OutfitView;

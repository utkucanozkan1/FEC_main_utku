import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import OutfitCard from './OutfitCard';
import AddToOutfitCard from './AddToOutfit';
import CardContainer from './RIOC-styled-components/CardContainer';
import { ProductIdContext } from '../index';
export const OutfitContext = React.createContext('default');

function OutfitView() {
  const data = useContext(ProductIdContext);
  const [outfit, setOutfit] = useState([]);
  const [oPosition, setOPosition] = useState(0);
  const [oEnd, setOEnd] = useState(false);

  useEffect(() => {
    axios.get('/outfitter')
      .then((outfitItems) => {
        setOutfit(outfitItems.data);
      });
  }, [data.outfitterListener]);

  useEffect(() => {
    if (outfit.length <= 3) {
      setOEnd(true);
    } else {
      setOEnd(false);
    }
  }, [outfit]);

  return (
    <div>
      <h6>YOUR OUTFITS</h6>
      <CardContainer>
        <OutfitContext.Provider value={{ outfit, setOutfit, oPosition, setOPosition, oEnd, setOEnd }}>
          {oPosition === 0 ? <> </> : <LeftArrow outfitAttr="outfit" />}
          <AddToOutfitCard />
          {outfit.slice(oPosition, oPosition + 3).map((card, i) => (
            <OutfitCard key={i} card={card} />
          ))}
          {oEnd ? <> </> : <RightArrow outfitAttr="outfit" />}
        </OutfitContext.Provider>
      </CardContainer>
    </div>
  );
}

export default OutfitView;

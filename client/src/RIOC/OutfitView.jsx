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
  const [loading, toogleLoading] = useState(true);
  useEffect(() => {
    axios.get('/outfitter')
      .then((outfitItems) => {
        setOutfit(outfitItems.data);
        if (outfit.length <= 2) {
          console.log('Not long enough, outfit length is', outfit.length);
          setOEnd(true);
        } else {
          setOEnd(false);
        }
        if (outfit.length !== 0) {
          toogleLoading(false);
        }
      });
  }, [data.outfitterListener, data.itemId]);

  if (!loading) {
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
  } else {
    return (
      <section className="item-overview-section">
        <div>Loading...</div>
      </section>
    );
  }
}

export default OutfitView;

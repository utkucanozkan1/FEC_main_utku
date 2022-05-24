import React, { useContext } from 'react';
import {
  Modal, Chart, CompareContainer, RowContainer,
} from './RIOC-styled-components/ModalStyles';
import ModalContext from './RelatedCard';

function CompareModal() {
  //const { modal, setModal } = useContext(ModalContext);
  return (
    <Modal>
      <Chart>
        <h5>Comparing</h5>
        <button type="button" onClick={() => { /*setModal(!modal);*/ }}>X</button>
        <CompareContainer>
          <RowContainer>
            <h6>Cur Product Name</h6>
            <p> </p>
            <h6>Comp Product Name</h6>
          </RowContainer>
          <RowContainer>
            <p>Current Char</p>
            <p>Characteristic</p>
            <p>Compare Char</p>
          </RowContainer>
        </CompareContainer>
      </Chart>
    </Modal>
  );
}

export default CompareModal;

import React from 'react';
import { Modal, CloseButton } from '../../RR-styled-components/RRsectionContainerStyle';
import Form from './Form';

export default function ModalPopup({ show, handleExit, data }) {
  return (
    <Modal show={show}>
      <div>
        <CloseButton>
          <button type="button" onClick={handleExit}>close</button>
        </CloseButton>
        <Form data={data} />
      </div>
    </Modal>
  );
}

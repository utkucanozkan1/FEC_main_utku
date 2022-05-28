import React, { useState } from 'react';
import { Modal, CloseButton } from './q&a-styled-components/q&aSectionContainerStyle';
import Form from './Form.jsx';

export default function ModalPopup({ show, handleExit, questionId }) {
  return (
    <Modal show={show}>
      <div>
        <CloseButton>
          <button className="close-btn" type="button" onClick={handleExit}>X</button>
        </CloseButton>
        <Form questionId={questionId} />
      </div>
    </Modal>
  );
}
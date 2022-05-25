import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.6);
  z-index: 1000;
`;

const Chart = styled.div`
  position: fixed;
  background: white;
  width: 65%;
  max-width: 300px;
  height: 70%;
  top: 55%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 5%;
  border-style: solid;
  text-align: center;
`;

const CompareContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-style: solid;
`;

export {
  Modal, Chart, CompareContainer, RowContainer,
};

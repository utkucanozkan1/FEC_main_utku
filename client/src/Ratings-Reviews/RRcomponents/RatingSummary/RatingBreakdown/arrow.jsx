import React from 'react';
import styled from 'styled-components';

const TriangleMarker = styled.div`
  position: absolute;
  margin: 10px
  width: 90%;
  height: 100%;
  top: 0;
  left: ${({ average }) => (average)}%;
  background-color: transparent;
  border-style: solid;
  border-left-width: 10px;
  border-right-width: 10px;
  border-top-width: 20px;
  border-bottom-width: 0px;
  border-top-color: slategray;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
`;

const TriangleContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: space-between;
  flex-direction: row nowrap;
`;

const Top = styled.div`
  position: relative;
  background-color: lightgray;
`;

const InnerContainer = styled.div`
  height: 10 px;
  width: 18%;
`;

const OtherInnerContainer = styled.div`
  height: 10 px;
  width: 18%;
`;

export default function Arrow({ average }) {
  return (
      <Top>
        <TriangleContainer>
          <InnerContainer />
          <OtherInnerContainer />
          <InnerContainer />
          <OtherInnerContainer />
          <InnerContainer />
          <TriangleMarker average={average} />
        </TriangleContainer>
      </Top>
  );
}

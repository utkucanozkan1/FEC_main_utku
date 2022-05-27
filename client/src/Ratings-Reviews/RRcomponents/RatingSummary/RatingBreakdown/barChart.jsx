import React from 'react';
import styled from 'styled-components';

const OuterBar = styled.div`
  height: 10px;
  width: 60%;
  background-color: lightgray;
  margin: 10px;
  &:hover {
    border: 2px solid gray;
    background-color: darkgray;
  }
`;

const Bars = styled.div`
  height: 100%;
  width: ${({ length }) => (length)}%;
  background-color: green;
  text-align: right;
`;

export default function BarChart({ length }) {
  return (
    <OuterBar>
      <Bars length={length} />
    </OuterBar>
  );
}

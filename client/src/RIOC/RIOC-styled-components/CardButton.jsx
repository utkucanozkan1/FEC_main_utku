import styled from 'styled-components';

const CardButton = styled.button`
background-color: rgba(0, 0, 0, 0.0);
font-size: 5px;
border-radius: 50%;
height: 15px;
width: 15px;
&:hover {
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
color: white;
`;

export default CardButton;

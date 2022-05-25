import styled from 'styled-components';

const RatingReviewContainer = styled.section`
display: flex;
flex-flow: row nowrap;
border-style: solid;
border-color: brown;
`;

const ReviewListContainer = styled.div`
align-self: flex-end;
justify-self: end;
width: 70%;
flex-flow: column wrap;
border-style: solid;
border-color: cyan;
`;

const ReviewEntryStyle = styled.div`
align-self: flex-start;
flex-flow: column wrap;
border-style: solid;
`;

const SummaryLeft = styled.div`
align-self: flex-start;
width: 30%;
flex-flow: column wrap;
border-style: solid;
border-color: red;
`;

const RatingsBreakdown = styled.div`
align-self: flex-start;
flex-flow: row wrap;
border-style: solid;
border-color: red;
`;

const ProductBreakdownContainer = styled.div`
align-self: flex-start;
flex-flow: column wrap;
border-style: solid;
border-color: pink;
`;

const Percentage = styled.div`
align-self: flex-start;
flex-flow: column wrap;
border-style: solid;
border-color: gray;
`;

const BarChartStyle = styled.div`
align-self: center;
width:30%;
flex-flow: column wrap;
border-style: solid;
border-color: green;
`;

const AverageRating = styled.canvas`
align-self: center;
flex-flow: column wrap;
border-style: solid;
border-color: green;
`;

const BottomButtons = styled.div`
align-self: flex-end;

`;

const FormContainer = styled.div`
width: 90%;
  margin: 10px auto;
  top: 10;
  left: 10;
`;

const FormStyle = styled.div`
  width: 90%;
  background: red;
  margin: 10px auto;
  top: 10;
  left: 10;
`;

const FormElement = styled.div`
width: 25%;
`;

const Header = styled.div`
width: 25%;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${({ show }) => (show === 'true' ? 'block' : 'none')};
`;

const CloseButton = styled.div`
  top:3%;
  left:90%;
  position: absolute;
`;

export {
  RatingReviewContainer, ReviewListContainer, ReviewEntryStyle,
  SummaryLeft, RatingsBreakdown, ProductBreakdownContainer,
  Percentage, BarChartStyle, AverageRating, BottomButtons, FormStyle,
  FormElement, Header, FormContainer, CloseButton, Modal,
};

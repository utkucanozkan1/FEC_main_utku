import styled from 'styled-components';

// Main view container
const RatingReviewContainer = styled.section`
display: grid;
grid-template-columns: 5fr 4fr 8fr 2fr;
justify-items: stretch;
`;
/*-------------------*/
// container for review list
const ReviewListContainer = styled.div`
grid-column-start: 3;
display: flex;
flex-flow: column wrap;
align-items: center;
justify-content: flex-start;
`;

/*-------------------*/
// Review entry settings.
// main container for each review
const ReviewEntryStyle = styled.div`
display: flex;
align-self: flex-start;
flex-flow: column wrap;
border-top: 2px solid;
`;

// used for add filter drop-down on review list
const Button = styled.div`
width: 50%;
flex-flow: row nowrap;
align-self: center;
`;

const BottomButtons = styled.div`
align-self: center;
`;

/*-------------------*/
// main container for the ratings summary
const SummaryLeft = styled.div`
grid-column-start: 2;
display: flex;
flex-flow: column wrap;
justify-content: flex-start;
width: 100%;
`;

// container for star and characteristic breakdown
const RatingsBreakdown = styled.div`
display: flex;
align-self: flex-start;
flex-flow: row wrap;
`;
/*-----------------*/
//  product characterstic breakdown format

// Container for characteristic breakdown
const ProductBreakdownContainer = styled.div`
  display: grid;
  /* width: 100%;
  padding-top: 30px;
  gap: 20px; */
`;

// Top portion of ratings and summary with the average rating
const RatingsSummaryTop = styled.div`
display: flex;
flex-flow: row nowrap;
width: 100%
justify-content: flex-start;
font-size: 40px;
`;

// formatting for characteristic breakdown graph
const CharacterGraph = styled.div`
  display: grid;
  grid-template-rows: 30px 20px 20px;
`;

// formatting for each characteristic breakdown
const Character = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 15px;
`;

// used for % of recommend and total reviews in ratings summary
const Recommend = styled.div`
display: flex;
flex-flow: column wrap;
font-size: 15px;
`;


/*--------------------*/
// Form and modal settings
const FormContainer = styled.div`
width: 75%;
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
color: white;
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
/*-------------------*/
// Star rating breakdown settings.

const OuterBarGraph = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const InnerBarGraph = styled.label`
margin: 5px;
&:hover {
  color: red;
}
`;

const TopOfReview = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`;

const SmallSum = styled.span`
  align-self: flex-start;
  font-size: 20px;
  border-bottom: 3px solid;
`;

const Date = styled.span`
align-self: flex-end;
`;

const Paragraph = styled.p`
  font-size: 17px;
`;

export {
  RatingReviewContainer, ReviewListContainer, ReviewEntryStyle,
  SummaryLeft, RatingsBreakdown, ProductBreakdownContainer,
  Recommend, BottomButtons, FormStyle,
  FormElement, Header, FormContainer, CloseButton, Modal, Button,
  OuterBarGraph, InnerBarGraph, RatingsSummaryTop, SmallSum, Date,
  Paragraph, TopOfReview, Character, CharacterGraph,
};

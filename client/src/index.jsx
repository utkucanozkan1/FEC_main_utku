// Bring React in to build a component.
import React from 'react';
import { createRoot } from 'react-dom/client';
import ItemOverview from './Item-Overview/ItemOverview';
import RelatedOutfitView from './RIOC/RelatedOutfitView';
import QuestionsAndAnswers from './q-a/QuestionAndAnswers';
import RatingReviews from './Ratings-Reviews/RRcomponents/RRapp';
// Import from react-dom the ability to create a root render

// Major component imports
// create the root of the app by selection where the app should be mounted in the dom
const root = createRoot(document.getElementById('root'));

// creates component in js syntax (hence, no <> allowed, js doesn't know what it means)
// const App = React.createElement("h1",null,"Hello World");
// root.render(<App />); -> will NOT render!! root.render(App); -> will

function App() {
  return (
    <div>
      <ItemOverview />
      <RelatedOutfitView />
      <QuestionsAndAnswers />
      <RatingReviews />
    </div>
  );
}

// render the root element with the provided component
root.render(<App />);

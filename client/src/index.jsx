import React, { useEffect } from 'react';
import axios from 'axios';

// Major component imports
import { createRoot } from 'react-dom/client';
import ItemOverview from './Item-Overview/ItemOverview';
import RelatedOutfitView from './RIOC/RelatedOutfitView';
import QuestionsAndAnswers from './q-a/QuestionAndAnswers';
import RatingReviews from './Ratings-Reviews/RRcomponents/RRapp';

// create the root of the app by selection where the app should be mounted in the dom
const root = createRoot(document.getElementById('root'));

axios.get(`/products/${37313}`)
  .then((products) => {
    console.log('Received products:');
    console.log(products.data);
  })
  .catch();

axios.get(`/products/${37313}/styles`)
  .then((styles) => {
    console.log('Styles:');
    console.log(styles.data);
  })
  .catch();

axios.get(`/reviews/${37313}/reviewsMeta`)
  .then((reviews) => {
    console.log('reviews:');
    console.log(reviews.data);
  })
  .catch();

axios.get(`/reviews/${37313}`)
  .then((reviews) => {
    console.log('item reviews:');
    console.log(reviews.data);
  })
  .catch();

axios.get(`/questions/${37311}`)
  .then((questions) => {
    console.log('questions:');
    console.log(questions.data);
  })
  .catch();

axios.get(`/answers/${573742}`)
  .then((answers) => {
    console.log('answers:');
    console.log(answers.data);
  })
  .catch();
// Answer Post
// axios.post(`/answers/${573260}`,{photos:[],name:'Hello',email:'maybe@maybe.com',body:'this is good'})
//   .then((res)=>{
//     console.log(res.data);
//   })
//   .catch((err) =>{
//     console.log(err);
//   });
// axios.get(`/related/${37311}`)
//   .then((relatedIds) => {
//     console.log('Related Item IDs:');
//     console.log(relatedIds.data);
//   })
//   .catch();

// axios.post('/reviews', {
//   product_id: 37315,
//   rating: 1,
//   summary: 'This is test review',
//   recommend: false,
//   name: 'Ben',
//   email: 'Ben@notiscool.com',
//   photos: [],
//   body: 'This product not working',
//   characteristics: {},
// })
//   .then((res) => {
//     console.log('review post succsesful', res.data);
//   })
//   .catch((err) => {
//     console.log('review posted fail');
//     console.log(err);
//   });

axios.get(`/related/${37311}`)
  .then((relatedIds) => {
    console.log('Related Item IDs:');
    console.log(relatedIds.data);
  })
  .catch();

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

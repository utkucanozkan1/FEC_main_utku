import React, {useState} from 'react';
import moment from 'moment';
import ImageComponent from './ImageComponent.jsx';

const QuestionList = function(props) {
  const answerArray = [];
  // answerArray = Object.keys(props.question.answers)
  for(let key in props.question.answers){
    answerArray.push(props.question.answers[key])
    }
  console.log(answerArray)
  console.log(props.question)

 return (
  <div>
    <br>
    </br>
    <div>
    <b>
      Q: {props.question.question_body}
      </b>
      <div style={{display:'inline-flex', float:'right', marginRight:500 +'px'}}>
        <button>Helpful? Yes ({props.question.question_helpfulness})</button>
        <button >Add Answer</button>
      </div>
    </div>
    <br>
    </br>
    <div>
    <b>
      A:
    </b>
    {answerArray[0].body}
    </div>
    <div>
      {answerArray[0].photos.map((photo,i) => {
        return <ImageComponent key={i} photo={photo}></ImageComponent>
      })}
    </div>
    <b>
      ----
    </b>
      <div >
        by {answerArray[0].answerer_name}, {moment(answerArray[0].date.slice(0,10)).format("MMM Do YY")}
        <div style={{display:'inline-flex', float:'right', marginRight:800 +'px'}}>
        <button>Helpful? Yes ({answerArray[0].helpfulness})</button>
        <button>Report</button>
        </div>
      </div>

  </div>
 )
};
export default QuestionList;




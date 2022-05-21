import React, {useState} from 'react';
import moment from 'moment';

const QuestionList = (props) => {
  let answerArray = [];
  //answerArray = Object.keys(props.question.answers)
  for(let key in props.question.answers){
      answerArray.push(props.question.answers[key])
    }
    console.log(answerArray)
 return (
  <div>
    <br>
    </br>
    <div>
    <b>
      Q: {props.question.question_body}
    </b>
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
        by {answerArray[0].answerer_name}, {moment(answerArray[0].date.slice(0,10)).format("MMM Do YY")}
      </div>

      <div>
        <button style={{display:'inline-block'}}>Helpful? Yes ({answerArray[0].helpfulness})</button>
        <br>
        </br>
        <button>Report</button>
      </div>

    </div>
 )
};
export default QuestionList;




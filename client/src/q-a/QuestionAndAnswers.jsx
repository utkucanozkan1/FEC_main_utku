import React ,{useState ,useEffect} from 'react';
import axios from 'axios';
import questionArray from './dummydata';
import QuestionList from './QuestionList.jsx';
import Search from './Search.jsx';
const questionsArray = [];
function QuestionsAndAnswers() {
  // need live data
  const [loading, toogleLoading] = useState(true);
  const [productId, setProductId] = useState();
  useEffect(() => {
    // let's just use 37311 for now
    axios.get(`/questions/${37313}`)
      .then((questions) => {
        questionsArray.push(questions.data.results.slice(0, 2));
        console.log(questionsArray);
        toogleLoading(false);
      });
  }, []);

  if (!loading) {
    return (
      <>
        <div>
          Questions & Answers
        </div>
        <div>
          <Search />
        </div>
        <div className="main-div">
          {questionsArray[0].map((question, i) => (
            <QuestionList question={question} key={i} />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <section>
        <div> Questions Loading...</div>
      </section>
    );
  }
}
export default QuestionsAndAnswers;

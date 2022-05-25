import React ,{useState ,useEffect , useContext} from 'react';
import axios from 'axios';
import questionArray from './dummydata';
import QuestionList from './QuestionList.jsx';
import { ProductIdContext } from '../index.jsx';
const questionsArray = [];
function QuestionsAndAnswers() {
  // need live data
  const { itemId } = useContext(ProductIdContext);
  const [loading, toogleLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState({ search: '' });
  const [productId, setProductId] = useState(itemId);

  useEffect(() => {
    // let's just use 37311 for now
    axios.get(`/questions/${itemId}`)
      .then((questions) => {
        questions.data.results.forEach((question) => {
          if (Object.keys(question.answers).length) {
            questionsArray.push(question)
          }
        });
        console.log(questionsArray);
        toogleLoading(false);
      });
  }, []);

  const handleChange = function (e) {
    // if (e.target.value.length > 3) {

    // }
    setSearchTerm({ ...searchTerm, search: e.target.value });
    console.log(searchTerm.search);
  };

  if (!loading) {
    return (
      <section className="question-section">
        <div>
          Questions & Answers
        </div>
        <div>
          <form>
            <input
              type="text"
              id="header-search"
              placeholder="Have a question? Search for answers..."
              name="search"
              value={searchTerm.search}
              onChange={(e) => handleChange(e)}
             />
          </form>
        </div>
        <div className="main-div">
          {questionsArray.slice(0, 2).map((question, i) => (
            <QuestionList question={question} key={i} />
          ))}
        </div>
      </section>
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

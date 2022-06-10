import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../../styles/games/showResults.css";
import { zeroingAction } from '../../store/answersReducer';

const ShowResults = () => {

  const results = useSelector(store => store.answersReducer);
  const dispatch = useDispatch();

  return (
    <div className="main-container">
      <div className="results">
        <h2>результаты</h2>
        {
          results.userAnswer.map((item, index) => 
            <div key={index} className='res_answers'>
              <div>вопрос: {item.question.toLowerCase()}</div>
              <div>правильный ответ: {item.trueAnswer.toLowerCase()}</div>
              <div>вы ответили: {item.userAnswer.toLowerCase()}</div>
              <div className="answer-marker" style={{backgroundColor: item.isTrueAnswer ? "#00b894" : "#d63031"}}></div>
              {item.isTrueAnswer ? <div className='res-true_answer'>&#10003;</div> : <div className='res-false_answer'>&#10007;</div>}
            </div>
          )
        }
        <div className="counter-answers">
          <div>правильных ответов: {results.correctAnswerCounter}</div>
          <div>неправильных ответов: {results.incorrectAnswerCounter}</div>
        </div>
        <Link 
        onClick={() => dispatch(zeroingAction())} 
        className="button-link main-button" 
        to="/"
        >
          на главную
        </Link>
      </div>
    </div>
  )
}

export default ShowResults;

import { Button } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../../styles/games/showResults.css";
import { zeroingAction } from '../../store/answersReducer';

const ShowResults = () => {

  const results = useSelector(store => store.answersReducer);
  const dispatch = useDispatch();

  return (
    <div className="results">
      <h2>результаты</h2>
      <div className="results-answers">
        <div className="right-answers">
          <div>верные ответы</div>
          {
            results.userAnswer.map((item, index) => 
              item.isTrueAnswer ? <div key={index} className="true-answer">{item.trueAnswer}</div> : null
            )
          }
        </div>
        <div className="wrong-answers">
        <div>неверные ответы</div>
          {
            results.userAnswer.map((item, index) => 
              item.isTrueAnswer ? null : 
              <div key={index} className="false-answer">
                <div className="user-false-answer">{item.userAnswer}</div>
                <div className="true-answer">{item.trueAnswer}</div>
              </div>
            )
          }
        </div>
      </div>
      <div className="counter-answers">
        <div>правильных ответов: {results.correctAnswerCounter}</div>
        <div>неправильных ответов: {results.incorrectAnswerCounter}</div>
      </div>
      <Button onClick={() => dispatch(zeroingAction())}><Link className="button-link" to="/">сьебаться на глауную</Link></Button>
    </div>
    
  )
}

export default ShowResults;

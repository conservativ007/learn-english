import { Button } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../../styles/games/showResults.css";

const ShowResults = () => {

  const results = useSelector(store => store.answersReducer);

  return (
    <div className="results">
      <h2>результаты нах</h2>
      <div className="results-answers">
        {
          results.userAnswer.map((item, index) => 
            item.isTrueAnswer ? 
            <div key={index} className="true-answer">{item.trueAnswer}</div> : 
            <div key={index} className="false-answer">
              <div className="user-false-answer">{item.userAnswer}</div>
              <div>{item.trueAnswer}</div>
            </div>
          )
        }
      </div>
      <div className="counter-answers">
        <div>правильных ответов: {results.correctAnswerCounter}</div>
        <div>неправильных ответов: {results.incorrectAnswerCounter}</div>
      </div>
      <Button><Link className="button-link" to="/">сьебаться на глауную</Link></Button>
    </div>
    
  )
}

export default ShowResults;

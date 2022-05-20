import React, { useRef, useState} from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { userAnswerAction, correctAction, incorrectAction } from '../../store/answersReducer';
import ShowResults from './ShowResults';

import "../../styles/games/spelling.css"

const Spelling = () => {

  const params = useParams();
  const setName = params.card_name;

  let dispatch = useDispatch();

  const [cards] = useState(JSON.parse(localStorage.getItem(setName)));
  let [counter, setCounter] = useState(0);
  const [inputAnswer, setInputAnswer] = useState("");
  let [endGame, setEndGame] = useState(false);

  const marker = useRef(null);

  function checkAnswer() {
    let trueAnswer = cards[counter].word;

    // добавление классов 
    if(inputAnswer === trueAnswer) {
      marker.current.classList.add("green");
      dispatch(correctAction());
    } else {
      marker.current.classList.add("red");
      dispatch(incorrectAction());
    }

    dispatch(userAnswerAction({
      isTrueAnswer: inputAnswer === trueAnswer, // true or false
      userAnswer: inputAnswer,
      trueAnswer: trueAnswer,
    }));

    let timer = setTimeout(() => {
      
      setCounter(counter += 1);
      if(counter >= cards.length) {
        setCounter(0);
        setEndGame(true);
      } 
      marker.current.className = "marker";
      setInputAnswer("");
    }, 1000);

    return () => clearTimeout(timer);
  }

  if(endGame === true) return <ShowResults />
  
  return (
    <div className="game-container">
      <div className="word-translate">{cards[counter].wordTranslate.join(", ")}</div>
      <div className="user-answer">
        <FormControl
          placeholder="введите перевод на английском"
          value={inputAnswer}
          onChange={e => setInputAnswer(e.target.value)}
        />
        <div ref={marker} className="marker"></div>
      </div>
      <div className="check-answer">
        <Button className="answer-button" onClick={() => checkAnswer()}>Ответ</Button>
        <Button>да хуй его знает</Button>
      </div>
      
    </div>
  );
}

export default Spelling;

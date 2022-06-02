import React, { useRef, useState } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ShowResults from './ShowResults';

import "../../styles/games/spelling.css"
import { checkUserAnswer } from '../../hooks/checkUserAnswer';

const Spelling = () => {

  const params = useParams();
  const setName = params.card_name;

  let dispatch = useDispatch();

  const [cards] = useState(JSON.parse(localStorage.getItem(setName)));
  let [counter, setCounter] = useState(0);
  const [inputAnswer, setInputAnswer] = useState("");
  let [endGame, setEndGame] = useState(false);

  const marker = useRef(null);
  const DOMElemTrueAnswer = useRef(null);

  function testCheckAnswer(bool = false) {
    checkUserAnswer(
      cards[counter].word, 
      cards[counter].wordTranslate,
      inputAnswer, 
      marker, 
      DOMElemTrueAnswer,
      dispatch,
      setInputAnswer,
      bool,
      setCounter
    );

    setTimeout(() => {
      if(counter >= cards.length - 1) {
        setCounter(0);
        setEndGame(true);
      } 
    }, 1000);
  }

  if(endGame === true) return <ShowResults />
  
  return (
    <div className="game-container">
      <div className="word-translate">{cards[counter].wordTranslate}</div>
      <div className="user-answer">
        <FormControl
          placeholder="введите перевод на английском"
          value={inputAnswer}
          onChange={e => setInputAnswer(e.target.value)}
        />
        <div ref={marker} className="marker"></div>
        <div ref={DOMElemTrueAnswer} className="spelling-true-answer"></div>
      </div>
      <div className="check-answer">
        <Button className="answer-button" onClick={() => testCheckAnswer(true)}>Ответ</Button>
        <Button onClick={() => testCheckAnswer(false)} >не знаю</Button>
      </div>
    </div>
  );
}

export default Spelling;

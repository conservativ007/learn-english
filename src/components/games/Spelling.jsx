import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ShowResults from './ShowResults';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import "../../styles/games/spelling.css"
import { checkUserAnswer } from '../../functions/checkUserAnswer';

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
  const focus = useRef(null);

  function testCheckAnswer(bool = false) {
    checkUserAnswer(
      cards[counter].word, 
      cards[counter].translate,
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

  useEffect(() => {
    if(endGame === true) return;
    focus.current.querySelector("input").focus();
  });

  if(endGame === true) return <ShowResults />
  
  return (
    <div className="container">
      <div className="game-container">
        <div className="word-translate">{cards[counter].translate}</div>
        <div className="user-answer">
          <TextField
            ref={focus}
            style={{width: "100%"}}
            variant="standard" 
            placeholder="введите перевод на английском"
            value={inputAnswer}
            onChange={e => setInputAnswer(e.target.value)}
          />
          <div ref={marker} className="marker"></div>
          <div ref={DOMElemTrueAnswer} className="spelling-true-answer"></div>
        </div>
        <div className="check-answer">
          <Button variant="contained" onClick={() => testCheckAnswer(true)}>Ответ</Button>
          <Button style={{marginLeft: "20px"}} variant="contained" onClick={() => testCheckAnswer(false)} >не знаю</Button>
        </div>
        </div>
      </div>
  );
}

export default Spelling;

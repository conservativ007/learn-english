import React, { useRef, useEffect } from 'react';
import {useParams} from "react-router";
import { useState } from 'react';
import { useDispatch } from "react-redux";

import { AiFillSound } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { speech } from '../../functions/speech';
import { checkUserAnswer } from "../../functions/checkUserAnswer";
import ShowResults from './ShowResults';

import "../../styles/games/listening.css";

const Listening = () => {

  const params = useParams();
  const [cards] = useState(JSON.parse(localStorage.getItem(params.card_name)));
  let [counter, setCounter] = useState(0);
  let [endGame, setEndGame] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  let dispatch = useDispatch();

  const marker = useRef(null);
  const DOMElemTrueAnswer = useRef(null);
  const ref = useRef(null);

  function testFuncCheckAnswer(bool = false) {
    checkUserAnswer(
      cards[counter].word, 
      cards[counter].word, 
      userAnswer, 
      marker, 
      DOMElemTrueAnswer,
      dispatch,
      setUserAnswer,
      bool,
      setCounter
    );
  }

  useEffect(() => {
    if(counter === 0) return;
    speech(cards[counter].word, 1);
    ref.current.querySelector("input").focus();
  }, [cards, counter]);


  if(counter >= cards.length) {
    setCounter(0);
    setEndGame(true);
  } 

  if(endGame === true) return <ShowResults />

  return (
    <div className="container">
      <div className="game-container"> 
        <div className="listening_sound-container">
          <div className="listening_sound-content">
            <AiFillSound style={{cursor: "grab"}} className="listening-sound" onClick={() => speech(cards[counter].word)} />
            {
              counter === 0 ? 
              <div className="container-marker-hint">
                <AiOutlineArrowLeft className="marker-hint" />
                <div className="hint">нажмите здесь для воспроизведения</div>
              </div> 
              :
              null
            }
          </div>
          
          <div className="user-answer">
            <TextField
              ref={ref}
              variant="standard" 
              style={{width: "100%"}}
              placeholder="введите что слышите"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
            />
            <div ref={marker} className="marker"></div>
            <div ref={DOMElemTrueAnswer} className="spelling-true-answer"></div>
          </div>
          <div className="check-answer">
            <Button variant="contained" className="answer-button" onClick={() => testFuncCheckAnswer(true)}>Ответ</Button>
            <Button style={{marginLeft: "20px"}} variant="contained" onClick={() => testFuncCheckAnswer(false)}>не знаю</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listening;

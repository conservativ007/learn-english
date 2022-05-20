import React, { useRef, useEffect } from 'react';
import {useParams} from "react-router";
import { useState } from 'react';
import { useDispatch } from "react-redux";

import "../../styles/games/listening.css";

import { AiFillSound } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Button, FormControl } from 'react-bootstrap';
import { speech } from '../../hooks/speech';
import { checkUserAnswer } from '../../hooks/checkUserAnswer';
import ShowResults from './ShowResults';

const Listening = () => {

  const params = useParams();
  const [cards] = useState(JSON.parse(localStorage.getItem(params.card_name)));
  let [counter, setCounter] = useState(0);
  let [endGame, setEndGame] = useState(false);
  const [inputAnswer, setInputAnswer] = useState("");

  let dispatch = useDispatch();

  const marker = useRef(null);

  function testFuncCheckAnswer() {
    checkUserAnswer(
      cards[counter].word, 
      inputAnswer, 
      marker, 
      dispatch,
      setInputAnswer,
    );
    setCounter(counter + 1)
  }

  useEffect(() => {
    if(counter === 0) return;
    console.log(counter)
    speech(cards[counter].word, 1);
  }, [cards, counter]);

  if(counter >= cards.length) {
    setCounter(0);
    setEndGame(true);
  } 

  if(endGame === true) return <ShowResults />

  return (
    <div className="game-container"> 
      <h2>this is listening</h2>
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
          <FormControl
            placeholder="введите что слышите"
            value={inputAnswer}
            onChange={e => setInputAnswer(e.target.value)}
          />
          <div ref={marker} className="marker"></div>
        </div>
        <div className="check-answer">
          <Button className="answer-button" onClick={() => testFuncCheckAnswer()}>Ответ</Button>
          <Button>да хуй его знает</Button>
        </div>
      </div>
    </div>
  );
}

export default Listening;

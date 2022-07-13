import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AiFillSound } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { speech } from '../../../functions/speech';
import "../../../styles/games/test-components/listening-component.css";

const ListeningComponent = ({ card, lastCard = false }) => {

  const [userAnswer, setUserAnswer] = useState("");
  const refContainer = useRef(null);
  const refAnswerHelp = useRef(null);

  function playQuestion() {
    speech(card.word);
  }

  function checkUserAnswer(e) {
    let isUserAnswerTrue = false;
    let testOne = String(userAnswer.trim()).toLowerCase();
    let testTwo = String(card.translate).toLowerCase();

    if(testOne === testTwo) {
      isUserAnswerTrue = true;
    }

    e.target.classList.add("active");
    e.target.setAttribute("data-user-trueID", card.id);
    e.target.setAttribute("data-user-answerID", isUserAnswerTrue === true ? card.id : 0);
  }

  // highlight the correct answer
  useEffect(() => {
    if(userAnswer.length < 4) return;
    let tryAnswer = String(card.translate);
    let test = tryAnswer.length * 0.60;
    if(tryAnswer.includes(userAnswer.toLowerCase()) && userAnswer.length >= test) {
      refAnswerHelp.current.style.visibility = "visible";
      refAnswerHelp.current.style.opacity = 0.5;
    } 
  }, [userAnswer, card]);

  return (
    <div ref={refContainer} className="choice-container">
      <div className="choice-question_word">
        <AiFillSound onClick={playQuestion} className="play-question" />
        <BiArrowBack className="arrow-play-question" />
      </div>
      <div className="choice-explain">Введите ваш ответ</div> 
      <div className="answer-container">
      <TextField
          variant="standard" 
          style={{width: "100%"}}
          placeholder="введите перевод на русском"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
        />
        <Button variant="contained" className="answers" onClick={e => checkUserAnswer(e)} >{lastCard ? "подтвердить" : "далее"}</Button>
        <div ref={refAnswerHelp} className="answer-help">{card.translate}</div>
      </div>
      
    </div>
  );
}

export default ListeningComponent;

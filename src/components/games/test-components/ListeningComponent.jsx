import React, { useState, useRef, useEffect } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { AiFillSound } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { speech } from '../../../hooks/speech';
import "../../../styles/games/test-components/listening-component.css";

const ListeningComponent = ({ card }) => {

  const [userAnswer, setUserAnswer] = useState("");
  const refContainer = useRef(null);
  const refAnswerHelp = useRef(null);

  function playQuestion() {
    speech(card.word);
  }

  function checkUserAnswer(e) {
    let isUserAnswerTrue = false;
    let testOne = String(userAnswer.trim()).toLowerCase();
    let testTwo = String(card.wordTranslate).toLowerCase();

    if(testOne === testTwo) {
      isUserAnswerTrue = true;
    }

    e.target.classList.add("active");
    e.target.setAttribute("data-user-trueID", card.id);
    e.target.setAttribute("data-user-answerID", isUserAnswerTrue === true ? card.id : 0);
  }

  // подсветить правильный ответ
  useEffect(() => {
    if(userAnswer.length < 4) return;
    let tryAnswer = String(card.wordTranslate);
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
        <FormControl
          placeholder="введите перевод на русском"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
        />
        <Button className="answers" onClick={e => checkUserAnswer(e)} >далее</Button>
        <div ref={refAnswerHelp} className="answer-help">{card.wordTranslate}</div>
      </div>
      
    </div>
  );
}

export default ListeningComponent;

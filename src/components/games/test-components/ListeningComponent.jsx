import React, { useState, useRef, useEffect } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { AiFillSound } from 'react-icons/ai';
import { speech } from '../../../hooks/speech';
import "../../../styles/games/test-components/listening-component.css";

const ListeningComponent = ({ card, lastCard = false }) => {

  const [userAnswer, setUserAnswer] = useState("");
  const refContainer = useRef(null);

  function playQuestion() {
    speech(card.word);
  }

  function checkUserAnswer(e) {
    let isUserAnswerTrue = false;

    if(userAnswer.trim() === card.wordTranslate.join(",")) {
      isUserAnswerTrue = true;
    }

    e.target.classList.add("active");
    e.target.setAttribute("data-user-trueID", card.id);
    e.target.setAttribute("data-user-answerID", isUserAnswerTrue === true ? card.id : 0);
    
    if(lastCard === false) {
      window.scrollTo(0, refContainer.current.dataset.ofsety);
    }
  }

  return (
    <div ref={refContainer} className="choice-container">
      <div className="choice-question_word">
        {card.word}
        <AiFillSound onClick={playQuestion} className="play-question" />
      </div>
      <div className="choice-explain">Введите ваш ответ</div> 
      <div className="answer-container">
        <FormControl
          placeholder="введите перевод на английском"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
        />
        <Button onClick={e => checkUserAnswer(e)} >далее</Button>
      </div>
      
    </div>
  );
}

export default ListeningComponent;

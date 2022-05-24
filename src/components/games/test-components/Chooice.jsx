import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { getCards } from '../../../hooks/getCards';
import "../../../styles/games/test-components/choice.css";


const Chooice = ({ card }) => {

  const refAnswerContainer = useRef(null);
  const params = useParams();
  const [cards] = useState(getCards(params));

  function prepareToDomElem(e, card) {
    let elems = refAnswerContainer.current.querySelectorAll('.same-choice-answer');
    addClassActive(e, elems);
    addData(e, card, elems);
  }

  function addClassActive(e, elems) {
    [...elems].map(i => i.className = "same-choice-answer");
    e.target.classList.add("active");
  }

  function addData(e, card) {
    let userAnswer = e.target.innerHTML;
    e.target.setAttribute("data-user-answer", userAnswer);
    e.target.setAttribute("data-user-answer-trueID", card.id);
  }


  return (
    <div className="choice-container">
      <div className="choice-question_word">{card.wordTranslate}</div>
      <div className="choice-explain">Выберите правильный термин</div>
      <div ref={refAnswerContainer} className="answer-container">
        {
          cards.map((item, index) => {
            if(index >= 4) return null;
            return (
            <div 
              key={index} 
              className="same-choice-answer"
              onClick={(e) => prepareToDomElem(e, item)}
            >
              {item.word}
            </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Chooice;

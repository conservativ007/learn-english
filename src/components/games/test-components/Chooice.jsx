import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { addCustomClass } from '../../../hooks/addCustomClass';
import { getCards } from '../../../hooks/getCards';
import "../../../styles/games/test-components/choice.css";


const Chooice = ({ card, lastCard = false}) => {

  const refAnswerContainer = useRef(null);
  const params = useParams();
  const [cards] = useState(getCards(params, card));

  function prepareToDomElem(e, userAnswerId, trueId) {
    addCustomClass(e, refAnswerContainer, "same-choice-answer", "active");
    addData(e, userAnswerId, trueId);

    // if(lastCard === false) {
    //   window.scrollTo(0, refAnswerContainer.current.dataset.ofsety);
    // }
  }

  function addData(e, userAnswerId, trueId) {
    e.target.setAttribute("data-user-trueID", trueId);
    e.target.setAttribute("data-user-answerID", userAnswerId);
  }


  return (
    <div ref={refAnswerContainer} className="choice-container">
      <div className="choice-question_word">{card.wordTranslate}</div>
      <div className="choice-explain">Выберите правильный термин</div>
      <div  className="choice-answer-container">
        {
          cards.map((item, index) => {
            if(index >= 4) return null;
            return (
            <div 
              key={index} 
              className="same-choice-answer"
              onClick={(e) => prepareToDomElem(e, item.id, card.id)}
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

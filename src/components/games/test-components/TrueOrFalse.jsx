import React, {useRef, useState} from 'react';
import { useParams } from 'react-router';
import { getCards } from '../../../hooks/getCards';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import "../../../styles/games/test-components/true-or-false.css";

const TrueOrFalse = ({ card, index }) => {

  const params = useParams();
  const [cards] = useState(getCards(params));
  const refContainer = useRef(null);

  function prepare(e, cardId, userAnswerId, bool) {
    let testOne = false;
    let elems = refContainer.current.querySelectorAll(".user-chosen");
    [...elems].map(i => i.className = "user-chosen");
    e.target.classList.add("active");

    if(bool === true && cardId === userAnswerId) {
      testOne = true;
    }
    
    if(bool === false && cardId !== userAnswerId) {
      testOne = true;
    }



    console.log(testOne);
    
    // addData(e.target, cardId, userAnswerId);
  }

  // function addData(target, cardId, userAnswerId) {
  //   target.setAttribute("data-user-answer", userAnswerId);
  //   target.setAttribute("data-user-answer-trueID", cardId);
  // }

  


  return (
    <div ref={refContainer} className="choice-container">
      <div className="chouse-question">
        <div className="choice-question_word">{card.wordTranslate}</div> 
        <HiOutlineArrowNarrowRight className="divider" />
        <div className="choice-question_word">
              {
                cards[index].word
              }
        </div>
      </div>
      <div className="choice-explain">Правда или ложь ?</div>
      <div className="user-choice">
        <div onClick={(e) => prepare(e, card.id, cards[index].id, true)} className="user-chosen">true</div>
        <div onClick={(e) => prepare(e, card.id, cards[index].id, false)} className="user-chosen">false</div>
      </div>
    </div>
  );
}

export default TrueOrFalse;

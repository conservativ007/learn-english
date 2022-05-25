import React, {useRef, useState} from 'react';
import { useParams } from 'react-router';
import { getCards } from '../../../hooks/getCards';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import "../../../styles/games/test-components/true-or-false.css";
import { addCustomClass } from '../../../hooks/addCustomClass';

const TrueOrFalse = ({ card, index }) => {

  const params = useParams();
  const [cards] = useState(getCards(params));
  const refContainer = useRef(null);

  function prepare(e, userAnswerId, trueId, bool) {

    addCustomClass(e, refContainer, "user-chosen", "active");
    let isUserAnswerTrue = getIsUserAnswerTrue(bool, trueId, userAnswerId);

    e.target.setAttribute("data-user-trueID", trueId);
    e.target.setAttribute("data-user-answerID", isUserAnswerTrue === true ? trueId : 0);

    window.scrollTo(0, refContainer.current.dataset.ofsety);
  }

  function getIsUserAnswerTrue(bool, trueId, userAnswerId) {
    let isUserAnswerTrue = false;
    if(bool === true && trueId === userAnswerId) {
      isUserAnswerTrue = true;
    }
    
    if(bool === false && trueId !== userAnswerId) {
      isUserAnswerTrue = true;
    }
    return isUserAnswerTrue;
  }


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

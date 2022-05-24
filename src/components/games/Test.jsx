import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import Chooice from './test-components/Chooice';
import { getCards } from '../../hooks/getCards';
import TrueOrFalse from './test-components/TrueOrFalse';

const Test = () => {
  const params = useParams();
  const [cards] = useState(getCards(params));

  const questionsDom = useRef(null);

  function getUserAnswers() {
    let domElems = questionsDom.current;
    let foundElems = domElems.querySelectorAll(".active");

    [...foundElems].map(item => {
      return console.log(item);
    })
  }
  
  return (
    <div className="game-container">
      <div ref={questionsDom} className="questions">
        {
          cards.map((card, index) => {
            if(index % 2 === 0) {
              return <Chooice key={card.id} card={card} />
            } 
            return <TrueOrFalse key={card.id} card={card} index={index} />
          })
        }
      </div>
      
      <Button 
        onClick={() => getUserAnswers()} 
        style={{marginBottom: "50px"}}
      >посмотреть результаты
      </Button>
    </div>
  );
}

export default Test;

import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Chooice from './test-components/Chooice';
import { getCards } from '../../hooks/getCards';
import TrueOrFalse from './test-components/TrueOrFalse';
import ListeningComponent from './test-components/ListeningComponent';
import Header from '../Header';

const Test = () => {
  const params = useParams();
  const [cards] = useState(getCards(params));
  const questionsDom = useRef(null);

  const [endGame, setEndGame] = useState(false);

  function getUserAnswers() {
    let domElems = questionsDom.current;
    let foundElems = domElems.querySelectorAll(".active");

    let userAnswers = [...foundElems].map(item => {
      if(item.dataset.userTrueid === item.dataset.userAnswerid) return true;
      return false;
    })

    let elems = [...questionsDom.current.querySelectorAll(".choice-container")];
    elems.forEach((item, index) => {
      let div = document.createElement("div");
      
      if(userAnswers[index] === true) {
        div.className = "user-answer_true";
        div.innerHTML = "true";
        return item.appendChild(div);
      }
      div.className = "user-answer_false";
      div.innerHTML = "false";
      return item.appendChild(div);
    });

    window.scrollTo(0, 0);
    questionsDom.current.style.pointerEvents = "none";

    setEndGame(true);
  }

  useEffect(() => {
    let elems = [...questionsDom.current.querySelectorAll(".choice-container")];

    for(let i = 0; i < elems.length - 1; i += 1) {
      elems[i].setAttribute("data-ofsety", elems[i + 1].getBoundingClientRect().y);
    }
  }, []);
  
  return (
    <>
      <Header />
      <div className="game-container">
        <div ref={questionsDom} className="questions">
          {
            cards.map((card, index) => {
              if(index % 3 === 0) {
                return <ListeningComponent key={card.id} card={card} lastCard={cards.length - 1 === index ? true : false} />
              } 
              if(index % 2 === 0) {
                return <Chooice key={card.id} card={card} lastCard={cards.length - 1 === index ? true : false} />
              } 
              return <TrueOrFalse key={card.id} card={card} index={index} lastCard={cards.length - 1 === index ? true : false} />
            })
          }
        </div>
        {
          endGame === false ? 
          <Button 
            onClick={() => getUserAnswers()} 
            style={{marginBottom: "50px"}}
          >
            посмотреть результаты
          </Button> :
          <Link 
            style={{marginBottom: "50px"}}
            className="main-button" 
            to="/"
          >
            вернуться на главную
          </Link>
        }
        
      </div>
    </>
  );
}

export default Test;
